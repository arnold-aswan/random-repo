import "./App.css";
import Cohorts from "./components/Cohorts";
import ProjectForm from "./components/ProjectForm";
import Projects from "./components/Projects";

function App() {
  return (
    <>
      <h1 className="text-3xl text-blue-800 font-bold underline">
        hello world!!!
      </h1>
      {/* <ProjectForm /> */}
      <Cohorts />
      <Projects />
    </>
  );
}

export default App;
