# Salon-Plattform

Management-Software für einen Salon mit mehreren Mitarbeitern: Next.js (App Router, TypeScript), Tailwind CSS, Supabase (Postgres, Auth, Storage), Hosting auf Vercel.

**Stand:** Phase 1 (Fundament) als Code vorhanden. Bisher **nachweislich ausgeführt** sind nur die Unit- und Migrations-Prüfungen (`npm test`, 39 Tests). **Noch nie ausgeführt:** `npm ci`, Typecheck, Lint, Build, lokaler Start, Migration gegen eine Datenbank, Deployment (die bisherige Umgebung hatte kein Netzwerk). Details und offene Punkte: `docs/DEVELOPMENT_STATUS.md`. Entscheidungen: `docs/TECHNICAL_DECISIONS.md`.

## Voraussetzungen
- Node.js 20 oder neuer, npm
- Supabase-Konto und -Projekt (kostenloser Plan genügt für die Entwicklung)
- Optional: Supabase CLI (`npx supabase` genügt), GitHub- und Vercel-Konto fürs Deployment

## Umgebungsvariablen
Vorlage: `.env.example` kopieren nach `.env.local` und Werte aus Supabase (Project Settings → API) eintragen.

| Variable | Zweck | Sichtbarkeit |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Projekt-URL | öffentlich (Browser) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon-Key, durch RLS begrenzt | öffentlich (Browser) |
| `SUPABASE_SERVICE_ROLE_KEY` | umgeht RLS, nur serverseitig (`lib/supabase/admin.ts`); aktuell noch ungenutzt | **geheim**, nie mit `NEXT_PUBLIC_`, nie committen |

`.env*` ist in `.gitignore` (außer `.env.example`).

## Installation und Start
```bash
npm install            # erster Lauf: erzeugt package-lock.json (fehlt noch) -> bitte committen
# danach reproduzierbar: npm ci
cp .env.example .env.local   # Werte eintragen
npm run dev            # http://localhost:3000
```

## Datenbank einrichten
Eine Migration: `supabase/migrations/20260101000000_initial_schema.sql` (Tabellen, Indizes, Trigger, RLS, Storage-Bucket).

Variante A, CLI:
```bash
npx supabase login
npx supabase link --project-ref <PROJECT_REF>
npx supabase db push
```
Variante B: Inhalt der Migrationsdatei im Supabase SQL Editor ausführen.

Danach:
1. Optional `supabase/seed.sql` ausführen (Beispielleistungen, Platzhalter-Mitarbeiter).
2. `supabase/tests/rls_check.sql` ausführen. Erwartet wird die Meldung „RLS-Check bestanden“, andernfalls eine Exception mit Details.
3. Ersten Nutzer unter Authentication → Users anlegen und zum Owner machen:
   ```sql
   update public.salon_members set role = 'owner' where user_id = '<USER-UUID>';
   ```
   Neue Nutzer erhalten automatisch die Rolle `customer`. Höhere Rollen vergibt nur der Owner.

## Prüfen
```bash
npm test               # 39 Tests (Node-Runner, ohne Zusatzpakete): Logik, Sicherheit, Migrations-Analyse
npm run typecheck
npm run lint
npm run build
```
Im laufenden System: Login unter `/login`, danach Dashboard unter `/`. `GET /api/health` muss `{"ok":true,"db":true}` liefern.

Optional DB-Typen erzeugen (lokale Supabase-Instanz nötig): `npm run db:types`.

## Deployment (Vercel)
1. Repository auf GitHub pushen, in Vercel importieren (Framework: Next.js, wird erkannt).
2. Die drei Variablen unter Settings → Environment Variables setzen. `SUPABASE_SERVICE_ROLE_KEY` nur für Server-Umgebungen.
3. Deployen, dann `/api/health` der Produktions-URL prüfen.
4. In Supabase unter Authentication → URL Configuration die Produktions-URL als Site URL eintragen.

Hinweis: Der Vercel-Hobby-Plan ist nicht für kommerzielle Nutzung vorgesehen.

## Projektstruktur
```
app/            Routen: (app)/ geschützter Personalbereich, login/, no-access/, api/health
components/     ui/ (Button, Card, Input, Label), layout/ (Navigation), Seitenbausteine
modules/        fachliche Module; bisher nur dashboard/ befüllt
lib/            Supabase-Clients, Auth, Rollen, Navigation, Zeit, Env
supabase/       migrations/, seed.sql, tests/rls_check.sql
tests/          Unit-Tests
docs/           PROJECT_CONTEXT, DEVELOPMENT_STATUS, TECHNICAL_DECISIONS
```

## Bekannte offene Punkte (Kurzfassung)
- `package-lock.json` fehlt; Install/Typecheck/Lint/Build sind noch nicht verifiziert.
- Die Migration wurde nur statisch geprüft, nie gegen Postgres/Supabase ausgeführt.
- Schema-Lücke: Personal kann bezahlte `sales`/`sale_items` noch ändern (Härtung offen).

## Wichtige Hinweise
- **Kasse:** Das Schema bereitet Kassenführung vor, bietet aber **keine** GoBD-/KassenSichV-Konformität. Dafür sind eine zertifizierte externe TSE-Lösung und steuerliche Prüfung nötig.
- **Kundenfotos:** privater Bucket, nur Personal, Einwilligung wird von der Datenbank erzwungen.
- **Platzhalter:** Termine, Kunden, Mitarbeiter, Leistungen, Kasse, Auswertungen und Kommunikation sind Seiten mit dem Hinweis „Noch nicht implementiert“.
