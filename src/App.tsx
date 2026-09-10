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
      <Sidebar />
      <div className="contentWrapper">
        <main className="main">
          <div style={{ 
              marginBottom: currentPage === 'home' ? '0' : '1.5rem', 
              marginLeft: '1rem',
              color: 'var(--text)', 
              fontFamily: 'monospace',
              opacity: 0.7,
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem'
          }}>
            <div style={{ display: 'flex', gap: '4px', fontSize: '22px' }}>
                <span style={{ color: '#ff5f56' }}>●</span>
                <span style={{ color: '#ffbd2e' }}>●</span>
                <span style={{ color: '#27c93f' }}>●</span>
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
