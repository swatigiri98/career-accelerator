function Card({ className = "", children }) {
  return (
    <div
      className={`rounded-2xl border border-paper-200 bg-paper-0 dark:border-ink-800 dark:bg-ink-900 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
