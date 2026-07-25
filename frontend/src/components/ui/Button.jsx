const VARIANTS = {
  primary: "bg-amber-400 text-ink-950 hover:bg-amber-600",
  secondary:
    "border border-paper-200 text-paper-900 hover:bg-paper-200/40 dark:border-ink-800 dark:text-ink-50 dark:hover:bg-ink-800",
  ghost: "text-paper-600 hover:text-paper-900 dark:text-ink-200 dark:hover:text-ink-50",
  danger: "bg-signal-red/10 text-signal-red hover:bg-signal-red/20",
};

function Button({ variant = "primary", className = "", children, disabled, ...props }) {
  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
