const SEGMENTS = [
  { key: "resumeScore", label: "Resume" },
  { key: "interviewScore", label: "Interview" },
  { key: "roadmapScore", label: "Roadmap" },
];

/**
 * Displays a career score with its breakdown - used on the dashboard with
 * real user data (as opposed to CareerScoreDemo, which is the animated
 * marketing version shown on the public landing page).
 */
function ScoreGauge({ score, breakdown }) {
  return (
    <div>
      <div className="mb-4 flex items-end gap-2">
        <span className="font-mono text-5xl font-semibold tabular-nums text-paper-900 dark:text-ink-50">
          {score}
        </span>
        <span className="mb-1 text-lg text-paper-600 dark:text-ink-200">/100</span>
      </div>

      <div className="mb-5 h-2 w-full overflow-hidden rounded-full bg-paper-200 dark:bg-ink-800">
        <div
          className="h-full rounded-full bg-amber-400 transition-all duration-700 ease-out"
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {SEGMENTS.map(({ key, label }) => (
          <div key={key} className="rounded-lg bg-paper-50 p-3 text-center dark:bg-ink-950">
            <div className="font-mono text-lg font-semibold text-paper-900 dark:text-ink-50">
              {breakdown[key]}
            </div>
            <div className="text-xs text-paper-600 dark:text-ink-200">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScoreGauge;
