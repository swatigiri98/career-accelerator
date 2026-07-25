import { useEffect, useState } from "react";
import { ExternalLink, Circle, Clock, CheckCircle2 } from "lucide-react";
import { generateRoadmapRequest, getRoadmapRequest, updateRoadmapItemRequest } from "../services/roadmapService.js";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import LoadingSpinner from "../components/ui/LoadingSpinner.jsx";

const STATUS_CONFIG = {
  todo: { label: "To do", icon: Circle, className: "text-paper-600 dark:text-ink-200" },
  "in-progress": { label: "In progress", icon: Clock, className: "text-amber-600 dark:text-amber-400" },
  done: { label: "Done", icon: CheckCircle2, className: "text-signal-green" },
};

const NEXT_STATUS = { todo: "in-progress", "in-progress": "done", done: "todo" };

function RoadmapPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const loadRoadmap = () => {
    setLoading(true);
    getRoadmapRequest()
      .then((res) => setItems(res.data.items))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadRoadmap();
  }, []);

  const handleGenerate = async () => {
    setError("");
    setGenerating(true);
    try {
      const res = await generateRoadmapRequest();
      setItems((prev) => [...prev.filter((i) => i.status !== "todo"), ...res.data.items]);
    } catch (err) {
      setError(err.response?.data?.message || "Could not generate a roadmap - upload a resume first.");
    } finally {
      setGenerating(false);
    }
  };

  const cycleStatus = async (item) => {
    const nextStatus = NEXT_STATUS[item.status];
    const res = await updateRoadmapItemRequest(item._id, nextStatus);
    setItems((prev) => prev.map((i) => (i._id === item._id ? res.data.item : i)));
  };

  if (loading) return <LoadingSpinner label="Loading your roadmap..." />;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-paper-900 dark:text-ink-50">Career Roadmap</h1>
          <p className="text-sm text-paper-600 dark:text-ink-200">
            Built from your resume gaps and any weak interview answers - click a status badge to update it.
          </p>
        </div>
        <Button onClick={handleGenerate} disabled={generating}>
          {generating ? "Generating..." : "Generate Roadmap"}
        </Button>
      </div>

      {error && <Card className="mb-6 p-4 text-sm text-signal-red">{error}</Card>}

      {items.length === 0 ? (
        <Card className="p-8 text-center text-paper-900 dark:text-ink-50">
          No roadmap yet - click "Generate Roadmap" to build one from your latest resume analysis.
        </Card>
      ) : (
        <div className="space-y-4">
          {items.map((item) => {
            const config = STATUS_CONFIG[item.status];
            const StatusIcon = config.icon;
            return (
              <Card key={item._id} className="p-5">
                <div className="mb-2 flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-paper-900 dark:text-ink-50">{item.skill}</h3>
                  <button
                    onClick={() => cycleStatus(item)}
                    className={`flex flex-shrink-0 items-center gap-1.5 rounded-full border border-paper-200 px-3 py-1 text-xs font-medium transition hover:opacity-80 dark:border-ink-800 ${config.className}`}
                  >
                    <StatusIcon className="h-3.5 w-3.5" />
                    {config.label}
                  </button>
                </div>
                <p className="mb-3 text-sm text-paper-600 dark:text-ink-200">{item.description}</p>
                <div className="flex flex-wrap gap-3">
                  {item.resources.map((resource) => (
                    <a
                      key={resource.url}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm font-medium text-amber-600 hover:underline dark:text-amber-400"
                    >
                      {resource.title} <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RoadmapPage;
