import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileSearch, Mic, Map, Briefcase, ArrowRight } from "lucide-react";
import { getDashboardRequest } from "../services/dashboardService.js";
import { useAuth } from "../context/AuthContext.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import LoadingSpinner from "../components/ui/LoadingSpinner.jsx";
import ScoreGauge from "../components/ui/ScoreGauge.jsx";

function DashboardPage() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDashboardRequest()
      .then((res) => setDashboard(res.data.dashboard))
      .catch((err) => setError(err.response?.data?.message || "Could not load your dashboard"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner label="Loading your dashboard..." />;

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-paper-900 dark:text-ink-50">
        Welcome back, {user?.name?.split(" ")[0]}
      </h1>
      <p className="mb-8 text-sm text-paper-600 dark:text-ink-200">
        Here's where your career profile stands right now.
      </p>

      {error && (
        <Card className="mb-6 p-4 text-sm text-signal-red">{error}</Card>
      )}

      {!dashboard?.latestResume ? (
        <Card className="p-8 text-center">
          <p className="mb-4 text-paper-900 dark:text-ink-50">
            You haven't uploaded a resume yet - that's the first step for everything else here.
          </p>
          <Link to="/resume">
            <Button>Upload your resume</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6 md:col-span-1">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-paper-600 dark:text-ink-200">
              Career Score
            </h2>
            <ScoreGauge score={dashboard.careerScore.score} breakdown={dashboard.careerScore.breakdown} />
          </Card>

          <div className="grid gap-6 md:col-span-2 md:grid-cols-2">
            <Card className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <FileSearch className="h-4 w-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-paper-900 dark:text-ink-50">Latest Resume</h3>
              </div>
              <p className="mb-1 font-mono text-2xl font-semibold text-paper-900 dark:text-ink-50">
                {dashboard.latestResume.atsScore}
                <span className="text-sm text-paper-600 dark:text-ink-200"> /100</span>
              </p>
              <p className="mb-4 text-xs text-paper-600 dark:text-ink-200">
                {dashboard.latestResume.gaps.length} gap(s) detected
              </p>
              <Link to="/resume" className="text-sm font-medium text-amber-600 dark:text-amber-400">
                View analysis →
              </Link>
            </Card>

            <Card className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <Mic className="h-4 w-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-paper-900 dark:text-ink-50">Interviews</h3>
              </div>
              <p className="mb-1 font-mono text-2xl font-semibold text-paper-900 dark:text-ink-50">
                {dashboard.recentInterviews.length}
              </p>
              <p className="mb-4 text-xs text-paper-600 dark:text-ink-200">session(s) completed recently</p>
              <Link to="/interview" className="text-sm font-medium text-amber-600 dark:text-amber-400">
                Practice now →
              </Link>
            </Card>

            <Card className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <Map className="h-4 w-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-paper-900 dark:text-ink-50">Roadmap</h3>
              </div>
              <p className="mb-1 font-mono text-2xl font-semibold text-paper-900 dark:text-ink-50">
                {dashboard.roadmap.done}/{dashboard.roadmap.total}
              </p>
              <p className="mb-4 text-xs text-paper-600 dark:text-ink-200">skills completed</p>
              <Link to="/roadmap" className="text-sm font-medium text-amber-600 dark:text-amber-400">
                View roadmap →
              </Link>
            </Card>

            <Card className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-paper-900 dark:text-ink-50">Top Match</h3>
              </div>
              {dashboard.topInternshipMatches[0] ? (
                <>
                  <p className="mb-1 truncate font-semibold text-paper-900 dark:text-ink-50">
                    {dashboard.topInternshipMatches[0].internship.title}
                  </p>
                  <p className="mb-4 text-xs text-paper-600 dark:text-ink-200">
                    {dashboard.topInternshipMatches[0].matchScore}% match
                  </p>
                </>
              ) : (
                <p className="mb-4 text-xs text-paper-600 dark:text-ink-200">No matches yet</p>
              )}
              <Link
                to="/internships"
                className="flex items-center gap-1 text-sm font-medium text-amber-600 dark:text-amber-400"
              >
                See all matches <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
