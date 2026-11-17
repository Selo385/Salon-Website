# Entwicklungsstatus

Stand: 17.11.2026 · Phase 1 (Fundament): **Code vorhanden, Stabilisierung teilweise. Abnahme offen.**

Die Entwicklungsumgebung dieser Stabilisierung hatte **kein Netzwerk** (DNS-Auflösung für registry.npmjs.org schlägt fehl). Alles, was Pakete aus dem Internet braucht, konnte nicht ausgeführt werden und ist unten als solches gekennzeichnet.

## Prüfungen: tatsächlich ausgeführt
| Prüfung | Ergebnis |
|---|---|
| `npm test` (6 Dateien, 39 Tests, Node-Runner) | **39/39 bestanden** |
| Mutationsprüfung der Sicherheits- und Migrationstests (9 absichtlich eingebaute Fehler in einer Kopie) | **9/9 erkannt**, Tests sind wirksam |
| Statische Analyse der Migration: 43 Tabellen, Policy-Abdeckung, Tippfehler in Schleifen, doppelte Policy-Namen, nur Rolle `authenticated`, kein `using (true)` bei Schreibrechten, `search_path` bei allen `security definer`, nur `health_check()` für `anon` | **bestanden** (als Test eingecheckt: `tests/migration.test.ts`) |
| Lexikalische SQL-Prüfung (Klammern, Quotes, `$$`) | **bestanden** (nur Skript-Artefakt am Dateiende) |
| Querprüfung Migration: Fremdschlüssel-Reihenfolge, Index-Spalten, Funktionen vor Verwendung, Seed gegen Schema | **bestanden** |
| Teil-Typecheck mit TypeScript 6.0.3 und Stubs für nicht installierte Pakete (kein Ersatz für den echten Typecheck) | 14 Meldungen, **alle durch Stubs/Umgebung verursacht** (React-Namespace, Cookie-Callback-Typen, `tailwindcss`-Auflösung), keine in Tests oder `lib/` |

## Prüfungen: nicht ausführbar / nicht bestanden
| Prüfung | Ergebnis |
|---|---|
| `package-lock.json` erzeugen | **fehlgeschlagen** (`ENOTCACHED`, kein Netzwerk). Datei existiert nicht. Eine handgeschriebene Lock-Datei wäre erfunden und wurde nicht erstellt. |
| `npm ci` | **fehlgeschlagen**, weil Lock-Datei fehlt und kein Netzwerk |
| `npm run typecheck` (echt) | **fehlgeschlagen** (Pakete nicht installiert, 156 Fehler durch fehlende Module) |
| `npm run lint` | **nicht ausführbar** (`next: not found`) |
| `npm run build` | **nicht ausführbar** (`next: not found`) |
| Migration gegen Postgres/Supabase ausführen, `rls_check.sql` | **nicht ausgeführt** (kein Postgres, kein Supabase-Projekt) |
| Lokaler Start, Login, Dashboard, `/api/health`, Vercel-Deployment | **nicht ausgeführt** |

## Änderungen dieser Stabilisierung
- `tests/security.test.ts`: Allowlist um `README.md` ergänzt (die Datei erwähnt den Variablennamen nur in der Dokumentation). Fünf zusätzliche, strengere Prüfungen: Service-Key im Code nur in `lib/supabase/admin.ts`, `admin.ts` mit `server-only` und von keiner Client-Datei importiert, keine `NEXT_PUBLIC_`-Variable mit SERVICE/SECRET/PRIVATE, `.env`-Varianten werden von git tatsächlich ignoriert, `.env.example` ohne Werte. Keine bestehende Prüfung wurde entfernt oder abgeschwächt.
- `tests/migration.test.ts` neu (15 Tests, siehe oben).
- Migration: Trigger `sync_leave_block` liest `OLD` nur noch im UPDATE-Zweig (vorher von der Auswertungsreihenfolge in `AND`/`OR` abhängig). Verhalten unverändert, **nicht gegen eine Datenbank getestet**.
- Umgebungsvariablen und `.gitignore` geprüft: drei Variablen, `.env*` ignoriert (außer `.env.example`), `package-lock.json` nicht ignoriert, keine Schlüssel im Repository.

## Ursache des gemeldeten Testfehlers
Ich hatte nach dem Anlegen der `README.md` den Testlauf nicht wiederholt. Die README erwähnt den Namen des Service-Role-Schlüssels (nur als Dokumentation), die Datei stand aber nicht in der Allowlist des Tests. Der frühere Stand „19/19“ war zum Zeitpunkt der Meldung nicht mehr korrekt.

## Offene Aufgaben (Reihenfolge)
1. In einer Umgebung mit Netzwerk: `npm install`, **`package-lock.json` committen**, danach `npm ci`, `npm run typecheck`, `npm run lint`, `npm run build` und Fehler beheben. Bisher ist kein dieser Schritte nachweislich erfolgreich.
2. Supabase-Projekt anlegen, Migration einspielen (Fehlerstellen siehe unten), `supabase/tests/rls_check.sql` ausführen, Owner anlegen, Login/Dashboard/`/api/health` prüfen, Vercel-Deployment.
3. RLS-Verhaltenstests je Rolle gegen echte Datenbank.

## Bekannte Probleme und Risiken
- **Sicherheitslücke im Schema (nicht behoben, bewusst nicht Teil dieser Stabilisierung):** Personal kann `sales` und `sale_items` auch nach Zahlung ändern. Gesperrt sind nur Löschen sowie Änderungen an `payments` und `refunds`. Die Härtung ist ein eigenes, zu testendes Arbeitspaket.
- **Wahrscheinliche Fehlerstellen beim ersten Migrationslauf:** Trigger auf `auth.users` und Policies auf `storage.objects` (Rechte der Migrationsrolle), Exclusion Constraint mit Enum-Prädikat, `create extension btree_gist` im Schema `public`.
- Weitere Hinweise: `employees` (inkl. `user_id`) sind für alle Angemeldeten lesbar; Nutzer dürfen eigene `consents`-Zeilen vollständig ändern.
- Paketversionen in `package.json` sind nicht gegen die Registry geprüft; Next-Lint/ESLint-Konfiguration ungetestet.
- Rechnungsnummer (`identity`) kann Lücken haben, steuerlich klären. Kasse: keine GoBD-/TSE-Konformität.
- Kein CSP-Header, keine Kundenregistrierung, keine Reporting-Views, keine DB-Typen (`npm run db:types`).
- Bestehende Termine werden bei nachträglich genehmigtem Urlaub nicht umgebucht.

## Funktionsstand
Funktionsmodule (Termine, Kunden, Mitarbeiter, Leistungen, Kasse, Auswertungen, Kommunikation) sind weiterhin **Platzhalterseiten**. Implementiert (als Code) sind nur Login/Logout, Zugriffsschutz, Dashboard-Kennzahlen, Navigation und `/api/health`; keine davon wurde bisher ausgeführt.
