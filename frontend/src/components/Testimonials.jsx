const TESTIMONIALS = [
  {
    quote:
      "The gap analysis told me my resume was fine but I kept failing on system design questions. Three roadmap modules later, I actually passed one.",
    name: "Ananya R.",
    role: "Final-year CS student",
  },
  {
    quote:
      "I'd used a resume checker before and got a score with no context. This one told me why the score was low and what to fix first.",
    name: "Rohit M.",
    role: "Computer Engineering, 3rd year",
  },
  {
    quote:
      "The mock interview asked about the exact gap my resume had - not random questions. That's what made me actually prepare for it.",
    name: "Priya S.",
    role: "IT undergraduate",
  },
];

function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="mb-12 max-w-2xl">
        <h2 className="mb-4 text-3xl font-bold text-paper-900 dark:text-ink-50 md:text-4xl">
          What students are saying
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col justify-between rounded-2xl border border-paper-200 bg-paper-0 p-6 dark:border-ink-800 dark:bg-ink-900"
          >
            <blockquote className="mb-6 text-sm leading-relaxed text-paper-900 dark:text-ink-50">
              "{t.quote}"
            </blockquote>
            <figcaption className="text-sm">
              <span className="font-semibold text-paper-900 dark:text-ink-50">{t.name}</span>
              <span className="block text-paper-600 dark:text-ink-200">{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
