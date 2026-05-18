type Props = {
  message: string;
  type?: 'success' | 'danger';
  onDismiss: () => void;
};

export default function Toast({ message, type = 'success', onDismiss }: Props) {
  const color =
    type === 'success'
      ? 'border-success/40 bg-success/10 text-success'
      : 'border-danger/40 bg-danger/10 text-danger';

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-xl border bg-surface/90 px-4 py-2.5 text-sm font-medium shadow-xl backdrop-blur-md ${color}`}
      role="status"
      aria-live="polite"
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
      <span>{message}</span>
      <button
        onClick={onDismiss}
        aria-label="Zamknij"
        className="-mr-1 ml-1 flex h-5 w-5 items-center justify-center rounded text-base opacity-60 transition-opacity hover:opacity-100"
      >
        ×
      </button>
    </div>
  );
}
