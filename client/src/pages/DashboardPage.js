import React, { useState } from "react";
import "./Dashboard.css";

function DashboardPage() {
  const [page, setPage] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState("");

  return (
    <div>

      {/* HEADER */}
      <header className="dashboard-header">

        <div className="top-row">
          <h1 className="logo">Logo Here</h1>

          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
          />
        </div>

        <div className="bottom-row">

          {/* USER INFO → SETTINGS */}
          <div
            className="user-info"
            onClick={() => setPage("settings")}
          >
            <div className="avatar">Icon</div>
            <span>Student Name</span>
          </div>

          {/* NAVIGATION */}
          <nav className="nav">
            <button onClick={() => setPage("profile")}>Profile</button>
            <button onClick={() => setPage("portfolio")}>Portfolio</button>
            <button onClick={() => setPage("jobs")}>Jobs</button>
            <button onClick={() => setPage("about")}>About</button>
          </nav>

        </div>
      </header>

      {/* MAIN CONTENT */}
      <main>

        {/* SETTINGS */}
        {page === "settings" && (
          <section>
            <h2>Settings</h2>

            <button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Stop Editing" : "Edit Profile"}
            </button>
          </section>
        )}

        {/* PROFILE */}
        {page === "profile" && (
          <section className="basic_info">

            {/* TOP SECTION */}
            <div className="basic_top">

              {/* IMAGE */}
              <div className="basic_left">
                <img
                  src="https://via.placeholder.com/120"
                  alt="user"
                  className="profile_img"
                />
              </div>

              {/* INFO */}
              <div className="basic_right">

                <h2>ABOUT ME</h2>

                <p className="designation">
                  Undergraduate Student
                </p>

                {/* EDIT MODE TOGGLE */}
                {isEditing ? (
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Write about yourself..."
                  />
                ) : (
                  <p>{about || "No description yet"}</p>
                )}

                {/* SOCIALS */}
                <div className="socials">
                  <a href="#">Facebook</a>
                  <a href="#">Messenger</a>
                  <a href="#">GitHub</a>
                  <a href="#">LinkedIn</a>
                </div>

              </div>
            </div>

            {/* BOTTOM SECTION */}
            <div className="basic_bottom">

              <h3>Education</h3>

              <div className="education_card">
                <p><strong>College:</strong> Example University</p>
                <p><strong>Year:</strong> 2022 - Present</p>
              </div>

            </div>

            {/* EXTRA SECTIONS */}
            <h3>Skills</h3>
            <p>React, JS, HTML</p>

            <h3>Projects</h3>
            <p>Project 1, Project 2</p>

          </section>
        )}

        {/* PORTFOLIO */}
        {page === "portfolio" && (
          <section>
            <h2>Portfolio (Other Users)</h2>
            <p>Mock data for now</p>
          </section>
        )}

        {/* JOBS */}
        {page === "jobs" && (
          <section>
            <h2>Jobs / Collaboration</h2>
            <p>Looking for teammates posts</p>
          </section>
        )}

        {/* ABOUT */}
        {page === "about" && (
          <section>
            <h2>About System</h2>
            <p>This is a student collaboration platform</p>
          </section>
        )}

      </main>

    </div>
  );
}

export default DashboardPage;