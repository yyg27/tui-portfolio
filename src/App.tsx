import "./App.css";

import Sidebar from './components/Sidebar/Sidebar';
import Home from "./components/Home/Home";
import Terminal from "./components/Terminal/Terminal";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <main className="main">
        <Home />
      </main>
      <Terminal />
    </div>
  );
}

export default App;
