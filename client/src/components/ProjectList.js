import React, { useEffect, useState } from "react";

function ProjectList() {

  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLink, setEditLink] = useState("");

  const fetchProjects = async () => {
    const response = await fetch(`${API}/projects`);
    const data = await response.json();
    setProjects(data);
  };


  useEffect(() => {
    fetchProjects();
  }, []);

  const startEdit = (project) => {
    setEditingId(project.id);
    setEditTitle(project.title);
    setEditDescription(project.description);
    setEditLink(project.link);
  };

  const updateProject = async (id) => {
    try {
        const body = {
            title: editTitle,
            description: editDescription,
            link: editLink
    };

    const response = await fetch(`${API}/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    setProjects(
      projects.map((p) =>
        p.id === id ? data : p
      )
    );

    setEditingId(null);

  } catch (err) {
    console.error(err.message);
  }

};


  const deleteProject = async (id) => {

    try {

      await fetch(`${API}/projects/${id}`, {
        method: "DELETE"
      });

      setProjects(projects.filter(p => p.id !== id));

    } catch (err) {
      console.error(err.message);
    }

  };



return (
  <div>
    <h2>Projects</h2>

    {projects.map((project) => (
      <div key={project.id}>

        {editingId === project.id ? (
          <>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />

            <input
              value={editLink}
              onChange={(e) => setEditLink(e.target.value)}
            />

            <button onClick={() => updateProject(project.id)}>
              Save
            </button>

            <button onClick={() => setEditingId(null)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <a href={project.link} target="_blank" rel="noreferrer">
              View
            </a>

            <br />

            <button onClick={() => startEdit(project)}>
              Edit
            </button>

            <button onClick={() => deleteProject(project.id)}>
              Delete
            </button>
          </>
        )}

        <hr />
      </div>
    ))}
  </div>
);
}

export default ProjectList;