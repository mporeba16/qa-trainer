// Format czas (sekundy) -> kompaktowy human readable.
// 35  -> "35s"
// 125 -> "2min"
// 3725 -> "1g 2min"  (godzina i minuty, sekundy obcięte gdy >= 60 min)
export function formatDuration(totalSec: number): string {
  if (!Number.isFinite(totalSec) || totalSec < 0) return '0s';
  if (totalSec < 60) return `${totalSec}s`;
  const min = Math.floor(totalSec / 60);
  if (min < 60) return `${min}min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h}g` : `${h}g ${m}min`;
}
