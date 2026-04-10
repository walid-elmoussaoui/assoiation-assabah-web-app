import { X } from "lucide-react";

type Props = {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  onClose: () => void;
};

export default function AlertModal({
  open,
  title = "Information",
  message,
  confirmText = "OK",
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        // Click outside closes
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />

      {/* Panel */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary-500 via-yellow-400 to-primary-700" />

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">
                {message}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

