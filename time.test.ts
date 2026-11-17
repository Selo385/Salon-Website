const TZ = "Europe/Berlin";

function offsetMinutes(at: Date): number {
  const label =
    new Intl.DateTimeFormat("en-US", { timeZone: TZ, timeZoneName: "longOffset" })
      .formatToParts(at)
      .find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  const m = /GMT([+-])(\d{2}):(\d{2})/.exec(label);
  if (!m) return 0;
  return (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3]));
}

function localMidnightUtc(y: number, mo: number, d: number): Date {
  const guess = Date.UTC(y, mo - 1, d);
  const first = offsetMinutes(new Date(guess));
  let t = guess - first * 60_000;
  const second = offsetMinutes(new Date(t));
  if (second !== first) t = guess - second * 60_000;
  return new Date(t);
}

/** Beginn (inklusive) und Ende (exklusive) des aktuellen Kalendertags in Europe/Berlin, als UTC-Zeitpunkte. */
export function berlinDayBounds(now: Date = new Date()): { start: Date; end: Date } {
  const [y, m, d] = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(now)
    .split("-")
    .map(Number);
  const next = new Date(Date.UTC(y, m - 1, d + 1));
  return {
    start: localMidnightUtc(y, m, d),
    end: localMidnightUtc(next.getUTCFullYear(), next.getUTCMonth() + 1, next.getUTCDate()),
  };
}
