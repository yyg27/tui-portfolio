import { useState, useEffect } from "react";
import "./App.css";

import Sidebar from './components/Sidebar/Sidebar';
import Home from "./components/Home/Home";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact";
import Journey from "./components/Journey/Journey";
import Terminal from "./components/Terminal/Terminal";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return localStorage.getItem("sidebarCollapsed") === "true";
  });

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", String(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  const toggleSidebarCollapse = () => {
    if (!showSidebar) {
      setShowSidebar(true);
    } else {
      setIsSidebarCollapsed(c => !c);
    }
  };

  const [currentPage, setCurrentPage] = useState(() => {
    const p = window.location.pathname.replace(/^\//, "");
    return p || "home";
  });

  useEffect(() => {
    const onPopState = () => {
      const p = window.location.pathname.replace(/^\//, "");
      setCurrentPage(p || "home");
    };

    const onClick = (e: MouseEvent) => {
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
      {showSidebar && (
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebarCollapse}
        />
      )}
      <div className={`contentWrapper ${!showSidebar ? "noSidebar" : ""}`}>
        <main className="main">
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
          {currentPage === "home" && <Home />}
          {currentPage === "projects" && <Projects />}
          {currentPage === "skills" && <Skills />}
          {currentPage === "journey" && <Journey />}
          {currentPage === "contact" && <Contact />}
        </main>
        <Terminal />
      </div>
    </div>
  );
}

export default App;
