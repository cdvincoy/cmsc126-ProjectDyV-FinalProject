import React from "react";
import "./App.css";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";

function App() {
  return (
    <div>
      <h1>Student Portfolio Hub</h1>

      <ProjectForm />
      <ProjectList />
    </div>
  );
}

export default App;