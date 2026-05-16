type Props = {
  message: string;
  type?: 'success' | 'danger';
  onDismiss: () => void;
};

export default function Toast({ message, type = 'success', onDismiss }: Props) {
  const color =
    type === 'success'
      ? 'border-success/40 bg-success/15 text-success'
      : 'border-danger/40 bg-danger/15 text-danger';

  return (
    <div
      className={`fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md border px-4 py-2 text-sm font-medium shadow-lg ${color}`}
      role="status"
      aria-live="polite"
    >
      <span>{message}</span>
      <button
        onClick={onDismiss}
        aria-label="Zamknij"
        className="ml-3 text-base opacity-70 hover:opacity-100"
      >
        ×
      </button>
    </div>
  );
}
