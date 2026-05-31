import React, { useState } from "react";

function ProjectForm() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const body = {
        title,
        description,
        link,
        user_id: 1
      };

      const response = await fetch(`${API}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      console.log(data);

      setTitle("");
      setDescription("");
      setLink("");

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h2>Add Project</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <br /><br />

        <button type="submit">Add Project</button>
      </form>
    </div>
  );
}

export default ProjectForm;