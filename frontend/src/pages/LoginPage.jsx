import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TrendingUp, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper-50 px-4 dark:bg-ink-950">
      <Card className="w-full max-w-sm p-8">
        <Link to="/" className="mb-6 flex items-center gap-2 font-display text-lg font-bold">
          <TrendingUp className="h-5 w-5 text-amber-400" strokeWidth={2.5} />
          Career<span className="text-amber-400">Accelerator</span>
        </Link>

        <h1 className="mb-1 text-2xl font-bold text-paper-900 dark:text-ink-50">Welcome back</h1>
        <p className="mb-6 text-sm text-paper-600 dark:text-ink-200">Log in to see your Career Score.</p>

        {error && (
          <div className="mb-4 flex items-start gap-2 rounded-lg bg-signal-red/10 p-3 text-sm text-signal-red">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-paper-900 dark:text-ink-50">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-paper-200 bg-paper-0 px-3 py-2.5 text-sm text-paper-900 dark:border-ink-800 dark:bg-ink-950 dark:text-ink-50"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-paper-900 dark:text-ink-50">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-paper-200 bg-paper-0 px-3 py-2.5 text-sm text-paper-900 dark:border-ink-800 dark:bg-ink-950 dark:text-ink-50"
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Logging in..." : "Log in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-paper-600 dark:text-ink-200">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-amber-600 dark:text-amber-400">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default LoginPage;
