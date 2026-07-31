import { CheckCircle2 } from "lucide-react";

function SuccessToast({ message }) {
  if (!message) return null;

  return (
    <div className="animate-fade-up mb-6 flex items-center gap-3 rounded-xl border border-signal-green/30 bg-signal-green/10 px-4 py-3">
      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-signal-green" />
      <p className="text-sm font-medium text-signal-green">{message}</p>
    </div>
  );
}

export default SuccessToast;