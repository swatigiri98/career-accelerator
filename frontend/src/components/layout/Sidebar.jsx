import { NavLink, Link } from "react-router-dom";
import { LayoutDashboard, FileSearch, Mic, Map, Briefcase, LogOut, TrendingUp, Moon, Sun } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/resume", label: "Resume Analyzer", icon: FileSearch },
  { to: "/interview", label: "Mock Interview", icon: Mic },
  { to: "/roadmap", label: "Career Roadmap", icon: Map },
  { to: "/internships", label: "Internships", icon: Briefcase },
];

function Sidebar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="flex h-screen w-64 flex-shrink-0 flex-col border-r border-paper-200 bg-paper-0 dark:border-ink-800 dark:bg-ink-900">
      <Link
      to="/"
      className="flex items-center gap-2 border-b border-paper-200 px-6 py-5 font-display text-lg font-bold dark:border-ink-800"
    >
   <TrendingUp className="h-5 w-5 text-amber-400" strokeWidth={2.5} />
   Career<span className="text-amber-400">Accelerator</span>
  </Link>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-amber-400/10 text-amber-600 dark:text-amber-400"
                  : "text-paper-600 hover:bg-paper-200/40 dark:text-ink-200 dark:hover:bg-ink-800"
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-paper-200 p-4 dark:border-ink-800">
        <div className="mb-3 flex items-center justify-between">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-paper-900 dark:text-ink-50">{user?.name}</p>
            <p className="truncate text-xs text-paper-600 dark:text-ink-200">{user?.email}</p>
          </div>
          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="flex-shrink-0 rounded-full p-2 text-paper-600 hover:bg-paper-200/60 dark:text-ink-200 dark:hover:bg-ink-800"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-paper-600 transition hover:bg-paper-200/40 dark:text-ink-200 dark:hover:bg-ink-800"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
