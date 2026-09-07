import "./App.css";

import Sidebar from './components/Sidebar/Sidebar';
import Home from "./components/Home/Home";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact";
import Terminal from "./components/Terminal/Terminal";

function App() {
  const path = window.location.pathname;
  const currentPage = path === "/" ? "home" : path.replace("/", "");

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
          {currentPage === "contact" && <Contact />}
        </main>
        <Terminal />
      </div>
    </div>
  );
}

export default App;
