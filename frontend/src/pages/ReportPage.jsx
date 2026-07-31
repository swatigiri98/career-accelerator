import { useEffect, useState } from "react";
import { Printer, CheckCircle2, AlertTriangle } from "lucide-react";
import { getDashboardRequest } from "../services/dashboardService.js";
import { useAuth } from "../context/AuthContext.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import LoadingSpinner from "../components/ui/LoadingSpinner.jsx";

const STATUS_LABEL = { todo: "To do", "in-progress": "In progress", done: "Done" };

function ReportPage() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDashboardRequest()
      .then((res) => setDashboard(res.data.dashboard))
      .catch((err) => setError(err.response?.data?.message || "Could not load your report"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner label="Building your report..." />;

  if (error || !dashboard?.latestResume) {
    return (
      <Card className="p-8 text-center text-paper-900 dark:text-ink-50">
        {error || "Upload a resume first - your report needs at least a resume analysis to build from."}
      </Card>
    );
  }

  const { careerScore, latestResume, recentInterviews, roadmap, topInternshipMatches } = dashboard;
  const today = new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between print:hidden">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-paper-900 dark:text-ink-50">Career Report</h1>
          <p className="text-sm text-paper-600 dark:text-ink-200">
            A shareable summary of your profile - use "Save as PDF" in the print dialog to download it.
          </p>
        </div>
        <Button onClick={() => window.print()}>
          <Printer className="h-4 w-4" />
          Print / Save as PDF
        </Button>
      </div>

      <div className="rounded-2xl border border-paper-200 bg-paper-0 p-8 print:rounded-none print:border-none print:p-0 dark:border-ink-800 dark:bg-ink-900 print:dark:bg-white">
        <div className="mb-8 border-b border-paper-200 pb-6 dark:border-ink-800">
          <h2 className="text-2xl font-bold text-paper-900 dark:text-ink-50 print:text-black">Career Report</h2>
          <p className="text-sm text-paper-600 dark:text-ink-200 print:text-gray-600">
            {user?.name} · {user?.email} · Generated {today}
          </p>
        </div>

        <section className="mb-8">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-paper-600 dark:text-ink-200 print:text-gray-600">
            Career Score
          </h3>
          <div className="mb-3 font-mono text-4xl font-semibold text-paper-900 dark:text-ink-50 print:text-black">
            {careerScore.score}
            <span className="text-lg text-paper-600 dark:text-ink-200 print:text-gray-600">/100</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Resume", value: careerScore.breakdown.resumeScore },
              { label: "Interview", value: careerScore.breakdown.interviewScore },
              { label: "Roadmap", value: careerScore.breakdown.roadmapScore },
            ].map((seg) => (
              <div
                key={seg.label}
                className="rounded-lg bg-paper-50 p-3 text-center dark:bg-ink-950 print:border print:border-gray-200 print:bg-white"
              >
                <div className="font-mono text-lg font-semibold text-paper-900 dark:text-ink-50 print:text-black">
                  {seg.value}
                </div>
                <div className="text-xs text-paper-600 dark:text-ink-200 print:text-gray-600">{seg.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-paper-600 dark:text-ink-200 print:text-gray-600">
            Resume Analysis - {latestResume.atsScore}/100
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-paper-900 dark:text-ink-50 print:text-black">
            {latestResume.feedback}
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-signal-green">
                <CheckCircle2 className="h-4 w-4" /> Strengths
              </h4>
              <ul className="space-y-1 text-sm text-paper-600 dark:text-ink-200 print:text-gray-700">
                {latestResume.strengths.map((s) => (
                  <li key={s}>• {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400 print:text-amber-700">
                <AlertTriangle className="h-4 w-4" /> Gaps
              </h4>
              <ul className="space-y-1 text-sm text-paper-600 dark:text-ink-200 print:text-gray-700">
                {latestResume.gaps.map((g) => (
                  <li key={g}>• {g}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-paper-600 dark:text-ink-200 print:text-gray-600">
            Mock Interview Performance
          </h3>
          {recentInterviews.length === 0 ? (
            <p className="text-sm text-paper-600 dark:text-ink-200 print:text-gray-600">
              No interview sessions completed yet.
            </p>
          ) : (
            <p className="text-sm text-paper-900 dark:text-ink-50 print:text-black">
              {recentInterviews.length} session(s) completed - most recent average score:{" "}
              <span className="font-semibold">{recentInterviews[0].averageScore?.toFixed(1) ?? "N/A"}/10</span>
            </p>
          )}
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-paper-600 dark:text-ink-200 print:text-gray-600">
            Learning Roadmap - {roadmap.done}/{roadmap.total} complete
          </h3>
          {roadmap.items.length === 0 ? (
            <p className="text-sm text-paper-600 dark:text-ink-200 print:text-gray-600">No roadmap generated yet.</p>
          ) : (
            <ul className="space-y-1.5 text-sm text-paper-900 dark:text-ink-50 print:text-black">
              {roadmap.items.map((item) => (
                <li key={item._id}>
                  • {item.skill} —{" "}
                  <span className="text-paper-600 dark:text-ink-200 print:text-gray-600">
                    {STATUS_LABEL[item.status]}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-paper-600 dark:text-ink-200 print:text-gray-600">
            Top Internship Matches
          </h3>
          {topInternshipMatches.length === 0 ? (
            <p className="text-sm text-paper-600 dark:text-ink-200 print:text-gray-600">No matches yet.</p>
          ) : (
            <ul className="space-y-2 text-sm text-paper-900 dark:text-ink-50 print:text-black">
              {topInternshipMatches.map((match) => (
                <li key={match.internship._id}>
                  • {match.internship.title} at {match.internship.company} —{" "}
                  <span className="font-semibold">{match.matchScore}% match</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default ReportPage;