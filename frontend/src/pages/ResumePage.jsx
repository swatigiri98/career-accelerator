import { useEffect, useState } from "react";
import { UploadCloud, CheckCircle2, AlertTriangle, FileText } from "lucide-react";
import { uploadResumeRequest, getLatestResumeRequest } from "../services/resumeService.js";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import LoadingSpinner from "../components/ui/LoadingSpinner.jsx";

function ResumePage() {
  const [resume, setResume] = useState(null);
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getLatestResumeRequest()
      .then((res) => setResume(res.data.resume))
      .catch(() => {
        /* no resume yet - fine, the upload form below handles the empty state */
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Choose a resume file first.");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const res = await uploadResumeRequest(file, jobDescription);
      setResume(res.data.resume);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <LoadingSpinner label="Loading your resume..." />;

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-paper-900 dark:text-ink-50">Resume Analyzer</h1>
      <p className="mb-8 text-sm text-paper-600 dark:text-ink-200">
        Upload your resume, optionally paste a target job description, and get a specific breakdown -
        not just a score.
      </p>

      <Card className="mb-8 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-paper-900 dark:text-ink-50">
              Resume file (PDF, DOC, DOCX, or TXT)
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-paper-200 bg-paper-50 px-4 py-6 text-sm text-paper-600 hover:border-amber-400/50 dark:border-ink-800 dark:bg-ink-950 dark:text-ink-200">
              <UploadCloud className="h-5 w-5 text-amber-400" />
              {file ? file.name : "Click to choose a file"}
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>

          <div>
            <label
              htmlFor="jobDescription"
              className="mb-1.5 block text-sm font-medium text-paper-900 dark:text-ink-50"
            >
              Target job description <span className="text-paper-600 dark:text-ink-200">(optional)</span>
            </label>
            <textarea
              id="jobDescription"
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full rounded-lg border border-paper-200 bg-paper-0 px-3 py-2.5 text-sm text-paper-900 dark:border-ink-800 dark:bg-ink-950 dark:text-ink-50"
              placeholder="Paste a job description to get gap analysis tailored to that specific role"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-lg bg-signal-red/10 p-3 text-sm text-signal-red">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button type="submit" disabled={uploading}>
            {uploading ? "Analyzing..." : "Analyze Resume"}
          </Button>
        </form>
      </Card>

      {resume && (
        <Card className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium text-paper-900 dark:text-ink-50">{resume.fileName}</span>
            </div>
            <div className="font-mono text-2xl font-semibold text-paper-900 dark:text-ink-50">
              {resume.atsScore}
              <span className="text-sm text-paper-600 dark:text-ink-200">/100</span>
            </div>
          </div>

          <p className="mb-6 text-sm leading-relaxed text-paper-900 dark:text-ink-50">{resume.feedback}</p>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-signal-green">
                <CheckCircle2 className="h-4 w-4" /> Strengths
              </h3>
              <ul className="space-y-1.5 text-sm text-paper-600 dark:text-ink-200">
                {resume.strengths.map((s) => (
                  <li key={s}>• {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-4 w-4" /> Gaps
              </h3>
              <ul className="space-y-1.5 text-sm text-paper-600 dark:text-ink-200">
                {resume.gaps.map((g) => (
                  <li key={g}>• {g}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default ResumePage;
