import { useContext, useState } from "react";
import AppContext from "../context/Appcontext";
import CohortCard from "./CohortCard";
import Projects from "./Projects";

export default function Cohorts() {
  const { cohort, selectedClass, setSelectedClass, projects, setProjects } =
    useContext(AppContext);
//   console.log(projects);

  const handleViewProjects = (classId) => setSelectedClass(classId);
  console.log(selectedClass);
  return (
    <>
      <h1 className="py-4 text-center font-semibold text-2xl">Cohorts</h1>
      <div className="flex gap-4">
        {cohort.map((item) => (
          <CohortCard
            key={item.class_id}
            id={item.class_id}
            title={item.class_name}
            viewProjects={handleViewProjects}
          />
        ))}
      </div>
      {/* <Projects /> */}
    </>
  );
}
