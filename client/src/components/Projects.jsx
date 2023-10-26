import { useContext, useState, useEffect } from "react";
import AppContext from "../context/Appcontext";
import Project from "../components/Project";
import { BsGridFill } from "react-icons/bs";
import { FaTableList } from "react-icons/fa6";

export default function Projects() {
  const { projects, setProjects, selectedClass } = useContext(AppContext);
  const [view, setView] = useState("grid");
  const [originalProjects, setOriginalProjects] = useState([]);

  console.log(projects);
  useEffect(() => {
    setOriginalProjects(projects);
    console.log(originalProjects.length);
  }, [projects]);
  console.log(originalProjects);

  useEffect(() => {
    if (selectedClass) {
      const filteredProjects = originalProjects.filter((item) => {
        return item.class_id === selectedClass;
      });
      console.log(filteredProjects);
      setProjects(filteredProjects);
    } else {
      setProjects(originalProjects);
    }
    console.log(projects);
  }, [selectedClass]);

  // if (selectedClass) {
  //   const filteredProjects = originalProjects.filter((item) => {
  //     return item.class_id === selectedClass;
  //   });
  //   console.log(filteredProjects);
  //   setProjects(filteredProjects);
  // } else {
  //   setProjects(originalProjects);
  // }

  const handleDelete = (id) => {
    console.log(id);
  };
  return (
    <>
      <div className="flex gap-2 bg-slate-600 p-3 w-fit rounded-full">
        <BsGridFill
          className={`h-[2rem] w-[3rem] cursor-pointer ${
            view === "grid" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => setView("grid")}
        />
        <FaTableList
          className={`h-[2rem] w-[3rem] cursor-pointer ${
            view === "table" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => setView("table")}
        />
      </div>

      {view === "grid" ? (
        <div className="flex gap-10">
          {projects.map((item) => (
            <Project
              id={item.project_id}
              key={item.project_id}
              name={item.project_name}
              desc={item.project_description}
              members={item.project_memebers}
              git={item.github_link}
              owner={item.owner_id}
              deleted={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div>
          <table className="table-auto w-full text-left text-gray-500 dark:text-gray-400">
            <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-2 py-4">ID</th>
                <th className="px-2 py-4">Name</th>
                <th className="px-2 py-4">Description</th>
                <th className="px-2 py-4">Members</th>
                <th className="px-2 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((item) => (
                <tr key={item.project_id}>
                  <td className="px-2 py-4">{item.project_id}</td>
                  <td className="px-2 py-4">{item.project_name}</td>
                  <td className="px-2 py-4">{item.project_description}</td>
                  <td className="px-2 py-4">{item.project_memebers}</td>
                  <td className="px-2 py-4">
                    <button
                      className="bg-red-400 text-white rounded-full px-3 cursor:pointer"
                      onClick={() => handleDelete(item.project_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
