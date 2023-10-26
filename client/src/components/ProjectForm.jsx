import { useState, useEffect } from "react";
import axios from "axios";

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    project_name: "",
    description: "",
    github_link: "",
    class_id: "",
    members: [],
  });
  const [pmembers, setPmemebers] = useState([]);
  const [cohort, setCohort] = useState([]);
  const [count, setCount] = useState([]);

  const getMembers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users").then((res) => {
        setPmemebers(res.data);
      });
    } catch (error) {
      console.log("Error getting members", error);
    }
  };

  const getCohort = async () => {
    try {
      const response = await axios
        .get("http://localhost:3000/class")
        .then((response) => {
          setCohort(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getProjects = async () => {
    try {
      const response = await axios
        .get("http://localhost:3000/Projects")
        .then((response) => {
          setCount(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //   console.log(cohort);

  useEffect(() => {
    getMembers();
    getCohort();
  }, []);

  //   console.log(pmembers);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMembersChange = (e) => {
    const { options } = e.target;
    const selectedMembers = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedMembers.push(options[i].value);
      }
    }
    setFormData({ ...formData, members: selectedMembers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    const newProject = {
      project_id: (count.length += 1),
      project_name: formData.project_name,
      project_description: formData.project_description,
      project_memebers: formData.members,
      members_id: formData.members,
      github_link: formData.github_link,
      owner_id: 1,
      class_id: formData.class_id,
    };

    try {
      const response = await fetch("http://localhost:3000/Projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });
      if (!response.ok) throw Error("Could not create Project");

      const data = await response.json();

      console.log("Project added successfully!", data);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-500 border-2 border-black w-[25rem] p-4"
    >
      <label htmlFor="project_name">Project Name:</label>
      <input
        type="text"
        id="project_name"
        name="project_name"
        value={formData.project_name}
        onChange={handleChange}
        required
      />
      <br />
      <br />

      <label htmlFor="description">Description:</label>
      <br />
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows="4"
        cols="50"
        required
      ></textarea>
      <br />
      <br />

      <label htmlFor="github_link">Github Link:</label>
      <input
        type="text"
        id="github_link"
        name="github_link"
        value={formData.github_link}
        onChange={handleChange}
        required
      />
      <br />
      <br />

      <label htmlFor="class_id">Class:</label>
      <select
        id="class_id"
        name="class_id"
        value={formData.class_id}
        onChange={handleChange}
        required
      >
        <option>select</option>
        {cohort.map((item) => (
          <option key={item.class_id} value={item.class_id}>
            {item.class_name}
          </option>
        ))}
      </select>
      <br />
      <br />

      <label htmlFor="members">Members:</label>
      <br />
      <select
        id="members"
        name="members"
        multiple
        value={formData.members}
        onChange={handleMembersChange}
        required
        className="h-[4rem]"
      >
        {pmembers.map((item) => (
          <option key={item.user_id} value={item.user_id}>
            {item.username}
          </option>
        ))}
      </select>
      <br />
      <br />

      <button type="submit">Submit</button>
    </form>
  );
}
