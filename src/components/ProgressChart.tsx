import type { SessionRecord } from '../types';

type Props = {
  history: SessionRecord[];
};

// SVG viewBox — chart skaluje się do szerokości kontenera (height proporcjonalnie).
const W = 400;
const H = 150;
const PAD_LEFT = 32;
const PAD_RIGHT = 10;
const PAD_TOP = 10;
const PAD_BOTTOM = 24;
const CHART_W = W - PAD_LEFT - PAD_RIGHT;
const CHART_H = H - PAD_TOP - PAD_BOTTOM;
const PASS_LINE = 65; // próg ISTQB
const MAX_POINTS = 20; // ostatnie N sesji

export default function ProgressChart({ history }: Props) {
  if (history.length === 0) {
    return (
      <div className="rounded-md border border-border bg-surface p-6 text-center text-sm text-text-muted">
        Skończ pierwszy quiz, żeby zobaczyć trend skuteczności.
      </div>
    );
  }

  const visible = history.slice(-MAX_POINTS);
  const n = visible.length;

  // mapa (i, pct) -> (x, y) w przestrzeni SVG
  const points = visible.map((rec, i) => {
    const pct = rec.total === 0 ? 0 : (rec.correct / rec.total) * 100;
    const x =
      n === 1 ? PAD_LEFT + CHART_W / 2 : PAD_LEFT + (i / (n - 1)) * CHART_W;
    const y = PAD_TOP + (1 - pct / 100) * CHART_H;
    return { x, y, pct, rec };
  });

  // path tylko gdy >=2 punkty
  const pathD =
    n < 2
      ? ''
      : 'M ' +
        points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L ');

  const passY = PAD_TOP + (1 - PASS_LINE / 100) * CHART_H;
  const startSessionNum = history.length - n + 1;
  const endSessionNum = history.length;

  return (
    <div className="rounded-md border border-border bg-surface p-3">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full"
        role="img"
        aria-label={`Skuteczność na sesję, ${history.length} ${history.length === 1 ? 'sesja' : 'sesji'} łącznie`}
      >
        {/* Y gridlines + labels */}
        {[0, 25, 50, 75, 100].map((p) => {
          const y = PAD_TOP + (1 - p / 100) * CHART_H;
          return (
            <g key={p}>
              <line
                x1={PAD_LEFT}
                x2={W - PAD_RIGHT}
                y1={y}
                y2={y}
                stroke="var(--c-border)"
                strokeDasharray="2 4"
                strokeWidth="0.5"
              />
              <text
                x={PAD_LEFT - 4}
                y={y + 3}
                fontSize="9"
                fill="var(--c-text-muted)"
                textAnchor="end"
              >
                {p}
              </text>
            </g>
          );
        })}

        {/* próg 65% (egzamin) */}
        <line
          x1={PAD_LEFT}
          x2={W - PAD_RIGHT}
          y1={passY}
          y2={passY}
          stroke="var(--c-warning)"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.6"
        />

        {/* linia trendu */}
        {pathD && (
          <path
            d={pathD}
            fill="none"
            stroke="var(--c-accent)"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}

        {/* punkty z kolorem zależnym od mode (egzamin = inny akcent) */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.rec.mode === 'exam' ? 4 : 3}
            fill={p.rec.mode === 'exam' ? 'var(--c-warning)' : 'var(--c-accent)'}
            stroke="var(--c-bg)"
            strokeWidth="1"
          >
            <title>
              {`Sesja ${startSessionNum + i} (${p.rec.mode}) — ${Math.round(p.pct)}% (${p.rec.correct}/${p.rec.total})`}
            </title>
          </circle>
        ))}

        {/* X axis labels — tylko start i koniec, środkowe by się tłoczyły */}
        <text
          x={PAD_LEFT}
          y={H - 4}
          fontSize="9"
          fill="var(--c-text-muted)"
          textAnchor="start"
        >
          Sesja {startSessionNum}
        </text>
        {n > 1 && (
          <text
            x={W - PAD_RIGHT}
            y={H - 4}
            fontSize="9"
            fill="var(--c-text-muted)"
            textAnchor="end"
          >
            Sesja {endSessionNum}
          </text>
        )}
      </svg>
      <div className="mt-1 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-1 text-xs text-text-muted">
        <span>
          {history.length > MAX_POINTS
            ? `Ostatnie ${MAX_POINTS} z ${history.length} sesji`
            : `${history.length} ${history.length === 1 ? 'sesja' : 'sesji'}`}
        </span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-accent"></span>
            quiz/fiszki
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-warning"></span>
            egzamin
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-px w-3 border-t border-dashed border-warning opacity-60"></span>
            próg 65%
          </span>
        </span>
      </div>
    </div>
  );
}
