import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/layout/ProtectedRoute.jsx";
import AppLayout from "./components/layout/AppLayout.jsx";

import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ResumePage from "./pages/ResumePage.jsx";
import InterviewPage from "./pages/InterviewPage.jsx";
import RoadmapPage from "./pages/RoadmapPage.jsx";
import InternshipsPage from "./pages/InternshipsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

/**
 * Wraps an authenticated page in both ProtectedRoute (redirects to /login if
 * not signed in) and AppLayout (sidebar shell) - every protected route needs
 * both, so this keeps that pairing from being repeated five times below.
 */
function protectedPage(children) {
  return (
    <ProtectedRoute>
      <AppLayout>{children}</AppLayout>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Authenticated routes */}
          <Route path="/dashboard" element={protectedPage(<DashboardPage />)} />
          <Route path="/resume" element={protectedPage(<ResumePage />)} />
          <Route path="/interview" element={protectedPage(<InterviewPage />)} />
          <Route path="/roadmap" element={protectedPage(<RoadmapPage />)} />
          <Route path="/internships" element={protectedPage(<InternshipsPage />)} />

          {/* Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
