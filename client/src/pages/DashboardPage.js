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
            <div
                className="user-info"
                onClick={() => setPage("settings")}
            >
                <div className="avatar">Icon</div>
                <span>Student Name</span>
            </div>
            
            <nav>
                <button onClick={() => setPage("profile")}>Profile</button>
                <button onClick={() => setPage("portfolio")}>Portfolio</button>
                <button onClick={() => setPage("jobs")}>Jobs</button>
                <button onClick={() => setPage("about")}>About</button>
                </nav>
            </div>
        </header>

      {/* CONTENT */}
      <main>

        {/* SETTINGS (FIXED POSITION) */}
    {page === "settings" && (
      <section>
        <h2>Settings</h2>

        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Stop Editing" : "Edit Profile"}
        </button>
      </section>
    )}

        {page === "profile" && (
          <section>
            <div className="basic_info">
                {/* TOP SECTION */}
                <div className="basic_top">
                
                    {/* LEFT: IMAGE */}
                    <div className="basic_left">
                        <img src="https://via.placeholder.com/120" alt="user" className="profile_img"/>
                    </div>

                    {/* RIGHT: INFO */}
                    <div className="basic_right">

                    <h2>ABOUT ME</h2>
                        <p className="designation">
                            Undergraduate Student
                        </p>
                    <textarea value={about} onChange={(e) => setAbout(e.target.value)} placeholder="Write about yourself..."/>
                    
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

</div>
            <h3>Skills</h3>
            <p>React, JS, HTML</p>

            <h3>Projects</h3>
            <p>Project 1, Project 2</p>
          </section>
        )}

        {page === "portfolio" && (
          <section>
            <h2>Portfolio (Other Users)</h2>
            <p>Mock data for now</p>
          </section>
        )}

        {page === "jobs" && (
          <section>
            <h2>Jobs / Collaboration</h2>
            <p>Looking for teammates posts</p>
          </section>
        )}

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

// import React from "react";

// function DashboardPage() {
//   return (
//     <div className="dashboard">
//       <header className="dashboard-header">
//         Header
//       </header>

//       <main className="dashboard-content">
//         <section className="profile-section">
//           <h2>About Me</h2>
//           <h1>How to make this editable like undergraduate or graduate student</h1>
//           <p>Description you want so like also an editable textbox</p>
//           <p>Your image</p>
//           <education>From education tables in database</education>
//           <p></p>
//         </section>

//         <section className="skills-section">
//           <h1>Skills</h1>
//           <h2>Soft Skills</h2>
//           soft skills for each card under here choose icon(can we use api)
//           then icon, title, description
//           <h2>Hard Skills</h2>
//           icon and name as well
//         </section>

//         <section className="projects-section">
//             <Projects>
//                 <icon>
//                 </icon>
//                 title
//                 description
//                 So we did add something like this
//                 in the database but looking at it now,
//                 is it really needed? when i can just add
//                 editable boxes in frontend 
//             </Projects>
//         </section>

//         <section className="achievements-section">
//           <h1>
//             achievements and description image as well, all user editable
//           </h1>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default DashboardPage;