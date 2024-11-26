import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { TaskProvider } from "./context/TaskProvider";

const App: React.FC = () => {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Добавьте другие страницы при необходимости */}
        </Routes>
      </Router>
    </TaskProvider>
  );
};

export default App;
