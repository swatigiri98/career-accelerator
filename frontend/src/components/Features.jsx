import { FileSearch, Mic, Map, Target } from "lucide-react";

const FEATURES = [
  {
    icon: FileSearch,
    title: "Resume Analyzer",
    description:
      "Upload your resume and get an ATS-style score plus specific, line-level feedback - not generic keyword advice.",
  },
  {
    icon: Mic,
    title: "AI Mock Interview",
    description:
      "Practice with voice or text against questions generated from your actual resume gaps, then get scored feedback per answer.",
  },
  {
    icon: Map,
    title: "Career Roadmap",
    description:
      "A learning path built from what your resume and interview revealed - not a generic 'top 10 skills to learn' list.",
  },
  {
    icon: Target,
    title: "Skill Gap Analysis",
    description:
      "Paste a target job description and see exactly what's missing, ranked by how much it matters for that specific role.",
  },
];

function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="mb-12 max-w-2xl">
        <h2 className="mb-4 text-3xl font-bold text-paper-900 dark:text-ink-50 md:text-4xl">
          Everything talks to everything else
        </h2>
        <p className="text-paper-600 dark:text-ink-200">
          Four tools, one profile. Each one feeds the next, so your progress compounds instead of resetting
          every time you open a new tab.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="group rounded-2xl border border-paper-200 bg-paper-0 p-6 transition hover:border-amber-400/40 hover:shadow-lg hover:shadow-ink-950/5 dark:border-ink-800 dark:bg-ink-900"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-600 transition group-hover:bg-amber-400/20 dark:text-amber-400">
              <Icon className="h-5 w-5" strokeWidth={2} />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-paper-900 dark:text-ink-50">{title}</h3>
            <p className="text-sm leading-relaxed text-paper-600 dark:text-ink-200">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
