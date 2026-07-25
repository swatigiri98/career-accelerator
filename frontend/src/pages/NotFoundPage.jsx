import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import Button from "../components/ui/Button.jsx";

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper-50 px-4 text-center dark:bg-ink-950">
      <TrendingUp className="mb-4 h-8 w-8 text-amber-400" />
      <h1 className="mb-2 text-3xl font-bold text-paper-900 dark:text-ink-50">Page not found</h1>
      <p className="mb-6 text-sm text-paper-600 dark:text-ink-200">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link to="/">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
