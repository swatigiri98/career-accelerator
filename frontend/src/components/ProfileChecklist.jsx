import { CheckCircle2, Circle } from "lucide-react";
import Card from "./ui/Card.jsx";

function ProfileChecklist({ dashboard }) {
  const steps = [
    { label: "Resume uploaded", done: Boolean(dashboard.latestResume) },
    { label: "Mock interview completed", done: dashboard.recentInterviews.some((s) => s.completed) },
    { label: "Roadmap generated", done: dashboard.roadmap.total > 0 },
    { label: "First skill completed", done: dashboard.roadmap.done > 0 },
  ];

  const completedCount = steps.filter((s) => s.done).length;

  return (
    <Card className="mb-6 p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-paper-600 dark:text-ink-200">
          Profile Completion
        </h2>
        <span className="font-mono text-xs text-paper-600 dark:text-ink-200">
          {completedCount} of {steps.length}
        </span>
      </div>
      <div className="flex flex-wrap gap-4">
        {steps.map((step) => (
          <div key={step.label} className="flex items-center gap-2">
            {step.done ? (
              <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-signal-green" />
            ) : (
              <Circle className="h-4 w-4 flex-shrink-0 text-paper-200 dark:text-ink-800" />
            )}
            <span
              className={`text-sm ${
                step.done ? "text-paper-900 dark:text-ink-50" : "text-paper-600 dark:text-ink-200"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ProfileChecklist;