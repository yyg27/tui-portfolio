import { useState, useEffect, type ReactNode } from "react";
import "./App.css";
import { readStorage, writeStorage } from "./utils/storage";

import Sidebar from './components/Sidebar/Sidebar';
import Home from "./components/Home/Home";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact";
import Journey from "./components/Journey/Journey";
import Terminal from "./components/Terminal/Terminal";
import NotFound from "./components/NotFound/NotFound";
import BootScreen from "./components/BootScreen/BootScreen";

const pages: Record<string, ReactNode> = {
  home: <Home />,
  projects: <Projects />,
  skills: <Skills />,
  journey: <Journey />,
  contact: <Contact />,
};

// "/Projects/" and "/projects" open the same page
const pageFromPath = () => window.location.pathname.replace(/^\/+|\/+$/g, "").toLowerCase() || "home";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  // boot animation once per browser session, never with reduced motion
  const [showBoot, setShowBoot] = useState(() =>
    !readStorage("booted", "sessionStorage") && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const finishBoot = () => {
    writeStorage("booted", "true", "sessionStorage");
    setShowBoot(false);
  };
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return readStorage("sidebarCollapsed") === "true";
  });

  useEffect(() => {
    writeStorage("sidebarCollapsed", String(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  const toggleSidebarCollapse = () => {
    if (!showSidebar) {
      setShowSidebar(true);
    } else {
      setIsSidebarCollapsed(c => !c);
    }
  };

  const [currentPage, setCurrentPage] = useState(pageFromPath);

  useEffect(() => {
    const onPopState = () => setCurrentPage(pageFromPath());

    const onClick = (e: MouseEvent) => {
      if (e.button || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return; // let the browser open a new tab/window
      const link = (e.target as HTMLElement).closest("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (href?.startsWith("/") && !href.startsWith("//") && link.target !== "_blank") {
        e.preventDefault();
        if (window.location.pathname !== href) {
          window.history.pushState({}, "", href);
          onPopState();
        }
      }
    };

    window.addEventListener("popstate", onPopState);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="App">
      {showBoot && <BootScreen onDone={finishBoot} />}
      {showSidebar && (
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebarCollapse}
        />
      )}
      <div className={`contentWrapper ${!showSidebar ? "noSidebar" : ""}`}>
        {/* new key per page, so each page opens scrolled to the top */}
        <main className="main" key={currentPage}>
          <div style={{ 
              marginBottom: '1.5rem', 
              marginLeft: '0.5rem',
              color: 'var(--text)', 
              fontFamily: 'monospace',
              opacity: 0.7,
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem'
          }}>
            <div 
                className="windowControls" 
                onClick={() => setShowSidebar(s => !s)}
                title="Toggle Taskbar"
            >
                <button
                    className="windowDot"
                    onClick={(e) => { e.stopPropagation(); setShowSidebar(s => !s); }}
                    style={{ color: '#ff5f56' }}
                    title={showSidebar ? "Hide sidebar (Red)" : "Show sidebar (Red)"}
                    aria-label="Toggle Sidebar Visibility"
                >
                    ●
                </button>
                <button
                    className="windowDot"
                    onClick={(e) => { e.stopPropagation(); toggleSidebarCollapse(); }}
                    style={{ color: '#ffbd2e' }}
                    title={isSidebarCollapsed ? "Expand sidebar (Yellow)" : "Collapse sidebar (Yellow)"}
                    aria-label="Toggle Sidebar Collapse"
                >
                    ●
                </button>
                <button
                    className="windowDot"
                    onClick={(e) => {
                        e.stopPropagation();
                        window.dispatchEvent(new CustomEvent("terminal-command", { detail: "toggle-help" }));
                    }}
                    style={{ color: '#27c93f' }}
                    title="Toggle /help in terminal (Green)"
                    aria-label="Toggle /help in terminal"
                >
                    ●
                </button>
            </div>
            <div>
                <span style={{ color: 'var(--accent)' }}>~</span> /{currentPage}
            </div>
          </div>
          {Object.hasOwn(pages, currentPage) ? pages[currentPage] : <NotFound pageName={currentPage} />}
        </main>
        <Terminal />
      </div>
    </div>
  );
}

export default App;
