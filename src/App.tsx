import "./App.css";

import Sidebar from './components/Sidebar/Sidebar';
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <main className="main">
        <Home />
      </main>
    </div>
  );
}

export default App;
