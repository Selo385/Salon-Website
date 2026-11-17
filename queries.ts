# Projektkontext

Salon-Management-Plattform für **einen** Salon mit mehreren Mitarbeitern. Cloud-Betrieb, modularer Monolith.

**Stack:** Next.js (App Router, TypeScript) · Tailwind CSS · shadcn/ui-Muster · Supabase (Postgres, Auth, Storage) · Vercel · GitHub

## Struktur
- `app/` Routen. `(app)/` = geschützter Personalbereich, `login/`, `no-access/`, `api/health`
- `modules/<modul>/` fachliche Logik je Modul (queries, actions, components). Bisher nur `dashboard` befüllt.
- `components/` UI (`ui/` = Basiskomponenten, `layout/` = Navigation)
- `lib/` Querschnitt: `supabase/` (Clients), `auth.ts`, `roles.ts`, `navigation.ts`, `time.ts`, `env.ts`
- `supabase/migrations/` Schema inkl. RLS · `seed.sql` Startdaten · `tests/rls_check.sql` Sicherheitscheck
- `tests/` Unit-Tests (`npm test`, Node-Runner, keine Zusatzabhängigkeit)

## Rollen
`owner` > `manager` > `staff` > `customer`. Rolle steht in `salon_members`, Durchsetzung per RLS (Funktionen `is_staff()`, `is_manager()`, `is_owner()`).
Neue Registrierungen erhalten automatisch `customer`. Höhere Rollen vergibt nur der Owner.

## Einrichtung
1. Supabase-Projekt anlegen, `.env.example` nach `.env.local` kopieren, drei Werte eintragen.
2. `npm install`
3. Schema einspielen: `npx supabase link --project-ref <ref>` dann `npx supabase db push` (oder Migration im SQL Editor ausführen), optional `supabase/seed.sql`.
4. `supabase/tests/rls_check.sql` ausführen (muss „RLS-Check bestanden“ melden).
5. Ersten Nutzer in Supabase (Authentication → Users) anlegen, dann im SQL Editor zum Owner machen:
   `update public.salon_members set role = 'owner' where user_id = '<user-uuid>';`
6. `npm run dev`, Login, Dashboard prüfen, `GET /api/health` muss `{"ok":true,"db":true}` liefern.
7. Deployment: GitHub-Repo mit Vercel verbinden, die drei Variablen in Vercel setzen. `SUPABASE_SERVICE_ROLE_KEY` nur als Server-Variable.
