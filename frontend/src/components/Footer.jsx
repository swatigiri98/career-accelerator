import { TrendingUp, Github, Linkedin, Mail } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Login", href: "/login" },
  ],
  Company: [
    { label: "About", href: "#how-it-works" },
    { label: "Contact", href: "#contact" },
  ],
};

function Footer() {
  return (
    <footer id="contact" className="border-t border-paper-200 dark:border-ink-800">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <a href="#home" className="mb-3 flex items-center gap-2 font-display text-lg font-bold">
              <TrendingUp className="h-5 w-5 text-amber-400" strokeWidth={2.5} />
              Career<span className="text-amber-400">Accelerator</span>
            </a>
            <p className="max-w-xs text-sm text-paper-600 dark:text-ink-200">
              One closed-loop profile for resume analysis, mock interviews, learning roadmaps, and
              internship matching.
            </p>
            <div className="mt-5 flex items-center gap-4">
              <a href="#" aria-label="GitHub" className="text-paper-600 hover:text-amber-400 dark:text-ink-200">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-paper-600 hover:text-amber-400 dark:text-ink-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@careeraccelerator.app"
                aria-label="Email"
                className="text-paper-600 hover:text-amber-400 dark:text-ink-200"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="mb-3 text-sm font-semibold text-paper-900 dark:text-ink-50">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-paper-600 transition hover:text-amber-400 dark:text-ink-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-paper-200 pt-6 text-xs text-paper-600 dark:border-ink-800 dark:text-ink-200">
          © {new Date().getFullYear()} Career Accelerator. Built for Buildathon 2K26.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
