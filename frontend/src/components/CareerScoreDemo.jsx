import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const START_SCORE = 41;
const END_SCORE = 87;
const GAPS = ["SQL", "System Design", "Mock Interview"];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function animateScoreTo(target, setScore) {
  const duration = 600;
  const start = performance.now();
  let startValue;

  setScore((current) => {
    startValue = current;
    return current;
  });

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    setScore(Math.round(startValue + (target - startValue) * progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/**
 * The hero's signature element: a live-looking demo of the product's core
 * loop - a Career Score that climbs as skill gaps get resolved one by one.
 * Respects prefers-reduced-motion by rendering the static end-state instead of looping.
 */
function CareerScoreDemo() {
  const [score, setScore] = useState(START_SCORE);
  const [resolvedGaps, setResolvedGaps] = useState([]);
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (prefersReducedMotion.current) {
      setScore(END_SCORE);
      setResolvedGaps(GAPS);
      return;
    }

    let cancelled = false;

    const runCycle = async () => {
      while (!cancelled) {
        setScore(START_SCORE);
        setResolvedGaps([]);
        await sleep(900);

        for (let i = 0; i < GAPS.length; i++) {
          if (cancelled) return;
          await sleep(1100);
          setResolvedGaps((prev) => [...prev, GAPS[i]]);
          animateScoreTo(
            START_SCORE + Math.round(((i + 1) / GAPS.length) * (END_SCORE - START_SCORE)),
            setScore
          );
        }

        await sleep(2800);
      }
    };

    runCycle();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="w-full max-w-sm rounded-2xl border border-paper-200 bg-paper-0 p-6 shadow-xl shadow-ink-950/5 dark:border-ink-800 dark:bg-ink-900">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-paper-600 dark:text-ink-200">
          Your Career Score
        </span>
        <span className="rounded-full bg-signal-green/10 px-2 py-0.5 text-xs font-medium text-signal-green">
          Live
        </span>
      </div>

      <div className="mb-6 font-mono text-5xl font-semibold tabular-nums text-paper-900 dark:text-ink-50">
        {score}
        <span className="text-lg text-paper-600 dark:text-ink-200">/100</span>
      </div>

      <div className="mb-5 h-2 w-full overflow-hidden rounded-full bg-paper-200 dark:bg-ink-800">
        <div
          className="h-full rounded-full bg-amber-400 transition-all duration-700 ease-out"
          style={{ width: `${score}%` }}
        />
      </div>

      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-paper-600 dark:text-ink-200">
        Skill Gaps Detected
      </p>
      <div className="flex flex-wrap gap-2">
        {GAPS.map((gap) => {
          const isResolved = resolvedGaps.includes(gap);
          return (
            <span
              key={gap}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all duration-500 ${
                isResolved
                  ? "border-signal-green/30 bg-signal-green/10 text-signal-green"
                  : "border-paper-200 bg-paper-50 text-paper-600 dark:border-ink-800 dark:bg-ink-950 dark:text-ink-200"
              }`}
            >
              {isResolved && <Check className="h-3 w-3" strokeWidth={3} />}
              {gap}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default CareerScoreDemo;
