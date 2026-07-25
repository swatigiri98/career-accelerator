import { Loader2 } from "lucide-react";

function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="flex items-center justify-center gap-2 py-12 text-paper-600 dark:text-ink-200">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export default LoadingSpinner;
