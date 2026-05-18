import { useEffect, useState } from 'react';

type Props = {
  startTime: number; // ms timestamp
  durationSec: number; // np. 3600 dla 60 min
  onTimeUp: () => void;
};

export default function Timer({ startTime, durationSec, onTimeUp }: Props) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const elapsed = Math.floor((now - startTime) / 1000);
  const remaining = Math.max(0, durationSec - elapsed);

  // Po dotarciu do 0 — wywołaj raz onTimeUp.
  // remaining przestaje się zmieniać (Math.max), więc effect nie odpali ponownie.
  useEffect(() => {
    if (remaining === 0) onTimeUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  const mm = Math.floor(remaining / 60);
  const ss = remaining % 60;
  const display = `${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;

  const styles =
    remaining < 60
      ? 'border-danger/40 bg-danger/10 text-danger'
      : remaining < 5 * 60
        ? 'border-warning/40 bg-warning/10 text-warning'
        : 'border-border bg-surface text-text-muted';

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-sm font-semibold tabular-nums transition-colors ${styles}`}
      aria-live="polite"
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
      {display}
    </div>
  );
}
