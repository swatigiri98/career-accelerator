import Sidebar from "./Sidebar.jsx";

function AppLayout({ children }) {
  return (
    <div className="flex bg-paper-50 dark:bg-ink-950">
      <Sidebar />
    <main className="h-screen flex-1 overflow-y-auto print:h-auto print:overflow-visible">
     <div className="mx-auto max-w-5xl px-8 py-10 print:max-w-none print:px-0 print:py-0">{children}</div>
    </main>      
    </div>
  );
}

export default AppLayout;
