import { Fragment, type ReactNode } from 'react';

// Lekki inline-markdown:
// **bold** → <strong>, *italic* → <em>, `code` → <code>
// Zachowuje przy tym \n (renderowane przez whitespace-pre-line na opakowaniu).
// Nie obsługujemy zagnieżdżeń — proste 1-warstwowe formatowanie wystarcza w wyjaśnieniach.
export function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return <strong key={i} className="font-semibold text-text">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code key={i} className="rounded bg-surface-2 px-1 py-0.5 font-mono text-[0.92em] text-accent">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      return <em key={i} className="italic">{part.slice(1, -1)}</em>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
