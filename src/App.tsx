import "./App.css";

import Sidebar from './components/Sidebar/Sidebar';
import Home from "./components/Home/Home";
import Projects from "./components/Projects/Projects";
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
              opacity: 0.7
          }}>
            <span style={{ color: 'var(--accent)' }}>~</span> /{currentPage}
          </div>
          {currentPage === "home" && <Home />}
          {currentPage === "projects" && <Projects />}
        </main>
        <Terminal />
      </div>
    </div>
  );
}

export default App;
