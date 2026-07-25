import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CareerScoreDemo from "./CareerScoreDemo.jsx";

function Hero() {
  return (
    <section id="home" className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="animate-fade-up">
          <span className="mb-4 inline-block rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 font-mono text-xs font-medium text-amber-600 dark:text-amber-400">
            One profile. Four tools. Zero guesswork.
          </span>
          <h1 className="mb-5 text-4xl font-bold leading-tight text-paper-900 dark:text-ink-50 md:text-5xl">
            Turn your resume into a job offer, one gap at a time.
          </h1>
          <p className="mb-8 max-w-md text-base text-paper-600 dark:text-ink-200 md:text-lg">
            Most resume checkers and mock-interview apps stop at a score. We connect resume analysis,
            AI interviews, your learning roadmap, and internship matches into one profile that
            actually improves as you use it.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/signup"
              className="group flex items-center gap-2 rounded-lg bg-amber-400 px-6 py-3 text-sm font-semibold text-ink-950 transition hover:bg-amber-600"
            >
              Get Your Career Score
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-paper-600 underline-offset-4 hover:underline dark:text-ink-200"
            >
              See how it works
            </a>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <CareerScoreDemo />
        </div>
      </div>
    </section>
  );
}

export default Hero;
