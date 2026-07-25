import Sidebar from "./Sidebar.jsx";

function AppLayout({ children }) {
  return (
    <div className="flex bg-paper-50 dark:bg-ink-950">
      <Sidebar />
      <main className="h-screen flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-8 py-10">{children}</div>
      </main>
    </div>
  );
}

export default AppLayout;
