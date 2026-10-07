import "./App.css";
import { useEffect, useReducer } from "react";
import SettingsMenu from "./components/SettingsMenu";
import NavBar from "./components/NavBar"; //
import Timer from "./components/Timer";
import ToDoList from "./ToDoList";
import GooberMenu from "./components/GooberMenu";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from './components/ThemeProvider';
import "bootstrap/dist/css/bootstrap.min.css";
import { initialStudyState, studyReducer } from "./studyState";

function App() {
  // had to add because bootstrap defaults to light mode
  document.documentElement.setAttribute("data-bs-theme", "dark");

  // App owns tasks and stats so changing routes cannot reset completed tasks.
  const [study, dispatch] = useReducer(studyReducer, initialStudyState);

  useEffect(() => {
    const timer = window.setInterval(() => dispatch({ type: "tick" }), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <NavBar />
          </div>
          <GooberMenu
            currentXP={study.xp}
            level={study.level}
            money={study.money}
            currentHealth={study.health}
          />
          <Routes>
            <Route path="/settings" element={<SettingsMenu />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/todo" element={
              <ToDoList
                items={study.tasks}
                onAdd={(name) => dispatch({ type: "add-task", name })}
                onComplete={(id) => dispatch({ type: "complete-task", id })}
                onRemove={(id) => dispatch({ type: "remove-task", id })}
              />
            } />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
