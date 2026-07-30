import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Moon, Sun, TrendingUp } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-paper-200 bg-paper-50/80 backdrop-blur-md dark:border-ink-800 dark:bg-ink-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-2 font-display text-lg font-bold">
          <TrendingUp className="h-5 w-5 text-amber-400" strokeWidth={2.5} />
          Career<span className="text-amber-400">Accelerator</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-paper-600 transition hover:text-paper-900 dark:text-ink-200 dark:hover:text-ink-50"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="rounded-full p-2 text-paper-600 transition hover:bg-paper-200/60 dark:text-ink-200 dark:hover:bg-ink-800"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        {isAuthenticated ? (
        <Link
          to="/dashboard"
          className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-ink-950 transition hover:bg-amber-600"
        >
          Go to Dashboard
        </Link>
        ) : (
        <>
        <Link
            to="/login"
            className="text-sm font-medium text-paper-600 transition hover:text-paper-900 dark:text-ink-200 dark:hover:text-ink-50"
        >
            Login
        </Link>
        <Link
            to="/signup"
            className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-ink-950 transition hover:bg-amber-600"
        >
          Get Started
        </Link>
        </>
      )}
      </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-paper-200 px-6 py-4 md:hidden dark:border-ink-800">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-paper-600 dark:text-ink-200"
              >
                {link.label}
              </a>
            ))}

            <div className="flex items-center justify-between border-t border-paper-200 pt-4 dark:border-ink-800">
          {isAuthenticated ? (
            <Link to="/dashboard" className="text-sm font-medium text-paper-600 dark:text-ink-200">
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className="text-sm font-medium text-paper-600 dark:text-ink-200">
              Login
            </Link>
          )}
              <button
                onClick={toggleTheme}
                aria-label="Toggle color theme"
                className="rounded-full p-2 text-paper-600 dark:text-ink-200"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          {!isAuthenticated && (
          <Link
            to="/signup"
            className="rounded-lg bg-amber-400 px-4 py-2 text-center text-sm font-semibold text-ink-950"
          >
            Get Started
          </Link>
        )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
