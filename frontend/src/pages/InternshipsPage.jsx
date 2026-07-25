import { useEffect, useState } from "react";
import { MapPin, ExternalLink, CheckCircle2, XCircle } from "lucide-react";
import { getMatchedInternshipsRequest } from "../services/internshipService.js";
import Card from "../components/ui/Card.jsx";
import LoadingSpinner from "../components/ui/LoadingSpinner.jsx";

function InternshipsPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMatchedInternshipsRequest()
      .then((res) => setMatches(res.data.matches))
      .catch((err) =>
        setError(err.response?.data?.message || "Could not load matches - upload a resume first.")
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner label="Matching internships to your profile..." />;

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-paper-900 dark:text-ink-50">Internship Recommendations</h1>
      <p className="mb-8 text-sm text-paper-600 dark:text-ink-200">
        Ranked by real fit against your extracted skills - not just keyword matching.
      </p>

      {error && <Card className="p-8 text-center text-sm text-signal-red">{error}</Card>}

      {!error && (
        <div className="space-y-4">
          {matches.map(({ internship, matchScore, matchedSkills, missingSkills, reasoning }) => (
            <Card key={internship._id} className="p-6">
              <div className="mb-2 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-paper-900 dark:text-ink-50">{internship.title}</h3>
                  <p className="text-sm text-paper-600 dark:text-ink-200">{internship.company}</p>
                </div>
                <div className="flex-shrink-0 rounded-full bg-amber-400/10 px-3 py-1 font-mono text-sm font-semibold text-amber-600 dark:text-amber-400">
                  {matchScore}%
                </div>
              </div>

              <p className="mb-1 flex items-center gap-1 text-xs text-paper-600 dark:text-ink-200">
                <MapPin className="h-3.5 w-3.5" /> {internship.location}
              </p>
              <p className="mb-4 text-sm text-paper-600 dark:text-ink-200">{internship.description}</p>
              <p className="mb-4 text-sm font-medium text-paper-900 dark:text-ink-50">{reasoning}</p>

              <div className="mb-4 flex flex-wrap gap-2">
                {matchedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1 rounded-full border border-signal-green/30 bg-signal-green/10 px-2.5 py-1 text-xs font-medium text-signal-green"
                  >
                    <CheckCircle2 className="h-3 w-3" /> {skill}
                  </span>
                ))}
                {missingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1 rounded-full border border-paper-200 bg-paper-50 px-2.5 py-1 text-xs font-medium text-paper-600 dark:border-ink-800 dark:bg-ink-950 dark:text-ink-200"
                  >
                    <XCircle className="h-3 w-3" /> {skill}
                  </span>
                ))}
              </div>

              {internship.applyUrl && (
                <a
                  href={internship.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-1 text-sm font-medium text-amber-600 hover:underline dark:text-amber-400"
                >
                  Apply <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default InternshipsPage;
