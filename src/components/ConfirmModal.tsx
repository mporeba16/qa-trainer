type Props = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = 'OK',
  cancelLabel = 'Anuluj',
  danger,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  const confirmClass = danger
    ? 'rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white shadow-md shadow-danger/30 transition-all hover:shadow-lg hover:shadow-danger/40'
    : 'rounded-lg bg-gradient-to-br from-accent to-accent-hover px-4 py-2 text-sm font-medium text-white shadow-md shadow-accent/30 transition-all hover:shadow-lg hover:shadow-accent/40';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold tracking-tight text-text">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">{message}</p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
          >
            {cancelLabel}
          </button>
          <button onClick={onConfirm} className={confirmClass}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
