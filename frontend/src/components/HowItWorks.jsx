const STEPS = [
  {
    number: "01",
    title: "Upload your resume",
    description: "Drop in your resume and, optionally, a job description you're targeting.",
  },
  {
    number: "02",
    title: "Get your gap analysis",
    description: "AI scores your resume and flags exactly what's missing for the role you want.",
  },
  {
    number: "03",
    title: "Take a mock interview",
    description: "Questions are generated from your specific gaps - by voice or text - with scored feedback.",
  },
  {
    number: "04",
    title: "Follow your roadmap",
    description: "A learning path built from what the resume and interview both revealed, not a generic list.",
  },
  {
    number: "05",
    title: "See your matches",
    description: "Internships ranked by real fit, with a plain-language reason for every match.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-y border-paper-200 bg-paper-0/50 py-20 dark:border-ink-800 dark:bg-ink-900/30 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold text-paper-900 dark:text-ink-50 md:text-4xl">How it works</h2>
          <p className="text-paper-600 dark:text-ink-200">
            Five steps, in order - each one only works because of the step before it.
          </p>
        </div>

        <ol className="grid gap-10 md:grid-cols-5 md:gap-6">
          {STEPS.map((step, index) => (
            <li key={step.number} className="relative">
              <span className="font-mono text-sm font-semibold text-amber-400">{step.number}</span>
              <h3 className="mb-2 mt-2 text-base font-semibold text-paper-900 dark:text-ink-50">{step.title}</h3>
              <p className="text-sm leading-relaxed text-paper-600 dark:text-ink-200">{step.description}</p>

              {index < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute right-[-12px] top-2 hidden h-px w-6 bg-paper-200 dark:bg-ink-800 md:block"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorks;
