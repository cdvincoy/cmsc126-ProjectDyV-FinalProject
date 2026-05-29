import React, { useState, useEffect } from "react";
import "./DashboardPage.css";
import iconImg from "../assets/logo.png";
import logoImg from "../assets/LIKHA.png";
import facebookIcon from "../assets/facebook.svg";
import messengerIcon from "../assets/messenger.svg";
import githubIcon from "../assets/github.svg";
import linkedinIcon from "../assets/linkedin.svg";

const API = "http://localhost:5000";

/* ─── Utility icon SVGs ─── */
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="16" height="16">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="14" height="14">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);
const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="14" height="14">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const SocialIcons = [
  { src: facebookIcon,  alt: "Facebook",  key: "fb"  },
  { src: messengerIcon, alt: "Messenger", key: "msg" },
  { src: githubIcon,    alt: "GitHub",    key: "gh"  },
  { src: linkedinIcon,  alt: "LinkedIn",  key: "li"  },
];

const SOFT_SKILL_ICONS = ["👤", "🚀", "💡", "💬", "🎯", "🤝", "⭐", "🔥"];
const HARD_SKILL_LOGOS = {
  Python:     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  Java:       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  C:          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  PHP:        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  React:      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  CSS:        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  HTML:       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  MySQL:      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
};

/* ─── MODAL ─── */
function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button onClick={onClose} className="modal-close-btn">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function DashboardPage() {
  const [page, setPage]           = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading]     = useState(true);

  // Get logged-in user from localStorage (saved during login)
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // Profile fields
  const [profileImg,  setProfileImg]  = useState("https://via.placeholder.com/300");
  const [name,        setName]        = useState("");
  const [designation, setDesignation] = useState("");
  const [bio,         setBio]         = useState("");
  const [socials,     setSocials]     = useState({ fb: "#", msg: "#", gh: "#", li: "#" });

  // Data from DB
  const [softSkills,    setSoftSkills]    = useState([]);
  const [hardSkills,    setHardSkills]    = useState([]);
  const [projects,      setProjects]      = useState([]);
  const [achievements,  setAchievements]  = useState([]);
  const [allUsers,      setAllUsers]      = useState([]);

  const [settingsForm, setSettingsForm] = useState({
  name:     currentUser?.name     || "",
  email:    currentUser?.email    || "",
  birthday: currentUser?.birthday || "",
  address: currentUser?.address   || "",
  password: "",
});

async function handleSaveSettings() {
  try {
    const res = await fetch(`${API}/users/${currentUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:        settingsForm.name,
        email:       settingsForm.email,
        password:    settingsForm.password || currentUser.password,
        bio:         currentUser.bio       || "",
        birthday:    settingsForm.birthday || null,
        address:     settingsForm.address   || null,
        profile_img: currentUser.profile_img || null,
      }),
    });
    const updated = await res.json();
    localStorage.setItem("user", JSON.stringify(updated));
    setCurrentUser(updated);
    alert("Settings saved!");
  } catch (err) {
    console.error("Error saving settings:", err);
  }
}

  // Modals
  const [modal,      setModal]      = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [form,       setForm]       = useState({});
  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));

  function openAdd(type)        { setForm({});          setEditTarget(null);    setModal(type); }
  function openEdit(type, item) { setForm({ ...item }); setEditTarget(item.id); setModal(type); }

  /* ══════════════════ FETCH DATA ON LOAD ══════════════════ */
  useEffect(() => {
    if (!currentUser) return;

    // Populate profile fields from stored user
    setName(currentUser.name || "");
    setBio(currentUser.bio || "");
    setDesignation(currentUser.designation || "");

    const userId = currentUser.id;

    async function fetchAll() {
      setLoading(true);
      try {
        // Fetch all data in parallel, filter by user_id on frontend
        const [skillsRes, projectsRes, awardsRes, usersRes] = await Promise.all([
          fetch(`${API}/skills`),
          fetch(`${API}/projects`),
          fetch(`${API}/awards`),
          fetch(`${API}/users`),
        ]);

        const [skillsData, projectsData, awardsData, usersData] = await Promise.all([
          skillsRes.json(),
          projectsRes.json(),
          awardsRes.json(),
          usersRes.json(),
        ]);

        // Filter by logged-in user
        const userSkills   = skillsData.filter(s => s.user_id === userId);
        const userProjects = projectsData.filter(p => p.user_id === userId);
        const userAwards   = awardsData.filter(a => a.user_id === userId);

        // Split skills into soft and hard
        setSoftSkills(
          userSkills
            .filter(s => s.type === "soft")
            .map(s => ({ id: s.id, name: s.name, icon: s.icon || "⭐", desc: s.description || "", active: false }))
        );
        setHardSkills(
          userSkills
            .filter(s => s.type === "hard")
            .map(s => ({ id: s.id, name: s.name }))
        );

        setProjects(
          userProjects.map(p => ({
            id:   p.id,
            name: p.title,
            desc: p.description || "",
            logo: p.logo || "",
            link: p.link || "",
            bg:   p.bg || "#251D4B",
          }))
        );

        setAchievements(
          userAwards.map(a => ({
            id:    a.id,
            title: a.title,
            sub:   a.description || "",
          }))
        );

        // All users for Portfolios page (exclude self)
        setAllUsers(usersData.filter(u => u.id !== userId));

      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [currentUser]);

  /* ══════════════════ PROFILE SAVE ══════════════════ */
  async function handleSaveProfile() {
    if (!currentUser) return;
    try {
      const res = await fetch(`${API}/users/${currentUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email:    currentUser.email,
          password: currentUser.password,
          bio,
          birthday: currentUser.birthday || null,
          address:  currentUser.address  || null,
          profile_img: profileImg,
          designation,
        }),
      });
      const updated = await res.json();
      // Update localStorage with new info
      localStorage.setItem("user", JSON.stringify(updated));
      setCurrentUser(updated);
    } catch (err) {
      console.error("Error saving profile:", err);
    }
    setIsEditing(false);
  }

  /* ══════════════════ SOFT SKILL CRUD ══════════════════ */
  async function saveSoftSkill() {
    if (!form.name) return;
    try {
      if (editTarget) {
        // UPDATE
        const res = await fetch(`${API}/skills/${editTarget}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: form.name, type: "soft", user_id: currentUser.id }),
        });
        const updated = await res.json();
        setSoftSkills(ss => ss.map(s => s.id === editTarget
          ? { ...s, name: updated.name, icon: form.icon || s.icon, desc: form.desc || s.desc }
          : s
        ));
      } else {
        // CREATE
        const res = await fetch(`${API}/skills`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: form.name, type: "soft", user_id: currentUser.id }),
        });
        const created = await res.json();
        setSoftSkills(ss => [...ss, {
          id:     created.id,
          icon:   form.icon || "⭐",
          name:   created.name,
          desc:   form.desc || "",
          active: false,
        }]);
      }
    } catch (err) {
      console.error("Error saving soft skill:", err);
    }
    setModal(null);
  }

  async function deleteSoftSkill(id) {
    try {
      await fetch(`${API}/skills/${id}`, { method: "DELETE" });
      setSoftSkills(ss => ss.filter(s => s.id !== id));
    } catch (err) {
      console.error("Error deleting soft skill:", err);
    }
  }

  const toggleSoftSkill = id => setSoftSkills(ss => ss.map(s => s.id === id ? { ...s, active: !s.active } : s));

  /* ══════════════════ HARD SKILL CRUD ══════════════════ */
  async function saveHardSkill() {
    if (!form.name) return;
    if (hardSkills.find(h => h.name === form.name)) { setModal(null); return; }
    try {
      const res = await fetch(`${API}/skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, type: "hard", user_id: currentUser.id }),
      });
      const created = await res.json();
      setHardSkills(hs => [...hs, { id: created.id, name: created.name }]);
    } catch (err) {
      console.error("Error saving hard skill:", err);
    }
    setModal(null);
  }

  async function deleteHardSkill(id) {
    try {
      await fetch(`${API}/skills/${id}`, { method: "DELETE" });
      setHardSkills(hs => hs.filter(h => h.id !== id));
    } catch (err) {
      console.error("Error deleting hard skill:", err);
    }
  }

  /* ══════════════════ PROJECT CRUD ══════════════════ */
  async function saveProject() {
    if (!form.name) return;
    try {
      if (editTarget) {
        const res = await fetch(`${API}/projects/${editTarget}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: form.name, description: form.desc, link: form.link || "" }),
        });
        const updated = await res.json();
        setProjects(ps => ps.map(p => p.id === editTarget
          ? { ...p, name: updated.title, desc: updated.description, link: updated.link, logo: form.logo || p.logo, bg: form.bg || p.bg }
          : p
        ));
      } else {
        const res = await fetch(`${API}/projects`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: form.name, description: form.desc || "", link: form.link || "", user_id: currentUser.id }),
        });
        const created = await res.json();
        setProjects(ps => [...ps, {
          id:   created.id,
          name: created.title,
          desc: created.description || "",
          logo: form.logo || "",
          link: created.link || "",
          bg:   form.bg || "#251D4B",
        }]);
      }
    } catch (err) {
      console.error("Error saving project:", err);
    }
    setModal(null);
  }

  async function deleteProject(id) {
    try {
      await fetch(`${API}/projects/${id}`, { method: "DELETE" });
      setProjects(ps => ps.filter(p => p.id !== id));
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  }

  /* ══════════════════ ACHIEVEMENT CRUD ══════════════════ */
  async function saveAchievement() {
    if (!form.title) return;
    try {
      if (editTarget) {
        const res = await fetch(`${API}/awards/${editTarget}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: form.title, description: form.sub || "", date: null, user_id: currentUser.id }),
        });
        const updated = await res.json();
        setAchievements(as => as.map(a => a.id === editTarget
          ? { ...a, title: updated.title, sub: updated.description }
          : a
        ));
      } else {
        const res = await fetch(`${API}/awards`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: form.title, description: form.sub || "", date: null, user_id: currentUser.id }),
        });
        const created = await res.json();
        setAchievements(as => [...as, { id: created.id, title: created.title, sub: created.description || "" }]);
      }
    } catch (err) {
      console.error("Error saving achievement:", err);
    }
    setModal(null);
  }

  async function deleteAchievement(id) {
    try {
      await fetch(`${API}/awards/${id}`, { method: "DELETE" });
      setAchievements(as => as.filter(a => a.id !== id));
    } catch (err) {
      console.error("Error deleting achievement:", err);
    }
  }

  /* ══════════════════ REDIRECT IF NOT LOGGED IN ══════════════════ */
  if (!currentUser) {
    return (
      <div className="simple-page">
        <p>You are not logged in. Please <a href="/AuthPage">log in</a>.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="simple-page"><p>Loading...</p></div>;
  }

  return (
    <div className="dashboard-root">

      {/* ── HEADER ── */}
      <header className="dashboard-header">
        <div className="header-top-row">
          <div className="header-logo-box">
            <img src={iconImg} alt="Icon" />
          </div>
          <input type="text" placeholder="Search..." className="search-bar" />
        </div>
        <div className="header-bottom-row">
          <div className="user-info" onClick={() => setPage("settings")}>
            <div className="user-avatar">{currentUser.name?.slice(0, 2).toUpperCase()}</div>
            <span className="user-name">{currentUser.name}</span>
            <span className="user-sub">{designation}</span>
          </div>
          <nav className="header-nav">
            {["profile", "portfolios", "jobs", "about"].map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`nav-btn${page === p ? " nav-active" : ""}`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ══════════════════ PROFILE ══════════════════ */}
      {page === "profile" && (
        <main>

          {/* HERO */}
          <section className="hero-section">
            <div className="hero-left">
              <div className="profile-img-wrap">
                <img src={profileImg} alt="profile" className="profile-img" />
                {isEditing && (
                  <label className="img-overlay">
                    <span style={{ fontSize: 11 }}>Change photo</span>
                    <input
                      type="text"
                      placeholder="Paste image URL"
                      value={profileImg}
                      onChange={e => setProfileImg(e.target.value)}
                      className="img-url-input"
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="hero-right">
              <p className="about-label">ABOUT ME</p>

              {isEditing ? (
                <>
                  <input
                    value={designation}
                    onChange={e => setDesignation(e.target.value)}
                    className="edit-inline"
                    placeholder="Designation"
                  />
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="edit-inline name-field"
                    placeholder="Full name"
                  />
                  <textarea
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    className="edit-textarea"
                    placeholder="Write your bio..."
                  />
                  <p className="social-links-label">SOCIAL LINKS</p>
                  <div className="social-inputs-row">
                    {SocialIcons.map(({ alt, key }) => (
                      <input
                        key={key}
                        value={socials[key]}
                        onChange={e => setSocials(s => ({ ...s, [key]: e.target.value }))}
                        placeholder={alt + " URL"}
                        className="edit-inline"
                      />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="hero-designation">{designation || "Add your designation"}</p>
                  <h1 className="hero-name">{name}</h1>
                  <p className="hero-bio">{bio || "Add a bio to tell people about yourself."}</p>
                </>
              )}

              <div className="social-row">
                {SocialIcons.map(({ src, alt, key }) => (
                  <a key={key} href={socials[key]} className="social-btn">
                    <img src={src} alt={alt} className="social-icon-img" />
                  </a>
                ))}
                <button
                  className="cv-btn"
                  onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                >
                  {isEditing ? "SAVE" : "EDIT CV"}
                </button>
              </div>
            </div>
          </section>

          {/* ── SKILLS ── */}
          <section className="section">
            <h2 className="section-title">SKILLS</h2>

            <p className="sub-label">SOFT SKILLS</p>
            {softSkills.length === 0 && (
              <p className="empty-state">
                {isEditing ? 'No soft skills yet — click "Add Soft Skill" to add one.' : "No soft skills added yet."}
              </p>
            )}
            <div className="soft-grid">
              {softSkills.map(s => (
                <div key={s.id} className={`soft-card${s.active ? " active" : ""}`}>
                  {isEditing && (
                    <div className="card-actions">
                      <button className="icon-btn" onClick={() => openEdit("editSoft", s)}><EditIcon /></button>
                      <button className="icon-btn" onClick={() => deleteSoftSkill(s.id)}><TrashIcon /></button>
                      <button className="icon-btn" onClick={() => toggleSoftSkill(s.id)}>
                        {s.active ? "hide" : "show"}
                      </button>
                    </div>
                  )}
                  <span className="soft-card-icon">{s.icon}</span>
                  <p className="soft-name">{s.name}</p>
                  <p className="soft-desc">{s.desc}</p>
                </div>
              ))}
              {isEditing && (
                <button className="add-card" onClick={() => openAdd("softSkill")}>
                  <PlusIcon /><span>Add Soft Skill</span>
                </button>
              )}
            </div>

            <p className="sub-label mt">HARD SKILLS</p>
            {hardSkills.length === 0 && (
              <p className="empty-state">
                {isEditing ? 'No hard skills yet — click "Add" to add one.' : "No hard skills added yet."}
              </p>
            )}
            <div className="hard-grid">
              {hardSkills.map(h => (
                <div key={h.id} className="hard-card">
                  {isEditing && (
                    <div className="card-actions">
                      <button className="icon-btn" onClick={() => deleteHardSkill(h.id)}><TrashIcon /></button>
                    </div>
                  )}
                  {HARD_SKILL_LOGOS[h.name]
                    ? <img src={HARD_SKILL_LOGOS[h.name]} alt={h.name} className="hard-logo" />
                    : <div className="hard-fallback">{h.name[0]}</div>
                  }
                  <p className="hard-name">{h.name}</p>
                </div>
              ))}
              {isEditing && (
                <button className="add-card" onClick={() => openAdd("hardSkill")}>
                  <PlusIcon /><span>Add Hard Skill</span>
                </button>
              )}
            </div>
          </section>

          {/* ── PROJECTS ── */}
          <section className="project-section">
            <div className="projects-label-row">
              <h2 className="projects-label">PROJECTS</h2>
              {isEditing && (
                <button className="add-btn-outline" onClick={() => openAdd("project")}>
                  <PlusIcon /> Add Project
                </button>
              )}
            </div>
            {projects.length === 0 ? (
              <p className="empty-state" style={{ padding: "0 60px 40px" }}>
                {isEditing ? 'No projects yet — click "Add Project" to add one.' : "No projects added yet."}
              </p>
            ) : (
              projects.map((p, i) => (
                <div
                  key={p.id}
                  className="project-hero"
                  style={{ background: i === 0 ? "#251D4B" : p.bg }}
                >
                  <div className="project-card">
                    {p.logo
                      ? <img src={p.logo} alt={p.name} className="project-logo" />
                      : <div className="project-logo-fallback">{p.name[0]}</div>
                    }
                    <h3 className="project-name">{p.name}</h3>
                    <p className="project-desc">{p.desc}</p>
                  </div>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer" className="play-btn">
                      <PlayIcon />
                    </a>
                  )}
                  {isEditing && (
                    <div className="project-actions">
                      <button className="icon-btn-light" onClick={() => openEdit("editProject", p)}><EditIcon /></button>
                      <button className="icon-btn-light" onClick={() => deleteProject(p.id)}><TrashIcon /></button>
                    </div>
                  )}
                </div>
              ))
            )}
          </section>

          {/* ── ACHIEVEMENTS ── */}
          <section className="section">
            <div className="ach-header-row">
              <h2 className="section-title">ACHIEVEMENTS</h2>
              {isEditing && (
                <button className="add-btn-outline" onClick={() => openAdd("achievement")}>
                  <PlusIcon /> Add Achievement
                </button>
              )}
            </div>
            {achievements.length === 0 ? (
              <p className="empty-state">
                {isEditing ? 'No achievements yet — click "Add Achievement" to add one.' : "No achievements added yet."}
              </p>
            ) : (
              <div className="ach-grid">
                {achievements.map(a => (
                  <div key={a.id} className="ach-card">
                    <div className="ach-badge">🏆</div>
                    <p className="ach-title">{a.title}</p>
                    <p className="ach-sub">{a.sub}</p>
                    {isEditing && (
                      <div className="ach-actions">
                        <button className="icon-btn" onClick={() => openEdit("editAchievement", a)}><EditIcon /></button>
                        <button className="icon-btn" onClick={() => deleteAchievement(a.id)}><TrashIcon /></button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      )}

      {/* ══════════════════ PORTFOLIOS ══════════════════ */}
      {page === "portfolios" && (
        <main>
          {allUsers.length === 0 ? (
            <div className="simple-page">
              <p>No other users found.</p>
            </div>
          ) : (
            allUsers.map((u, i) => {
              const dark   = i % 2 === 0;
              const bg     = dark ? "#251D4B" : "white";
              const clr    = dark ? "white"   : "#1a1a2e";
              const subClr = dark ? "rgba(255,255,255,.6)" : "#888";
              const bioClr = dark ? "rgba(255,255,255,.8)" : "#555";
              return (
                <div key={u.id} className="portfolio-row" style={{ background: bg, color: clr }}>
                  <div className="portfolio-left">
                    <img
                      src="https://via.placeholder.com/260"
                      alt={u.name}
                      className="portfolio-img"
                      style={{ border: dark ? "3px solid rgba(255,255,255,.2)" : "3px solid #eee" }}
                    />
                  </div>
                  <div className="portfolio-right">
                    <p className="portfolio-role" style={{ color: subClr }}>STUDENT</p>
                    <h2 className="portfolio-name" style={{ color: clr }}>{u.name.toUpperCase()}</h2>
                    <p className="portfolio-bio" style={{ color: bioClr }}>{u.bio || "No bio yet."}</p>
                    <div className="portfolio-social-row">
                      {SocialIcons.map(({ src, alt, key }) => (
                        <a
                          key={key}
                          href="#"
                          className="social-btn"
                          style={{ border: dark ? "1.5px solid rgba(255,255,255,.3)" : "1.5px solid #d0d0e0" }}
                        >
                          <img src={src} alt={alt} className="social-icon-img" />
                        </a>
                      ))}
                      <button className="view-port-btn">VIEW PORTFOLIO</button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </main>
      )}

      {/* ══════════════════ JOBS ══════════════════ */}
      {page === "jobs" && (
        <main className="simple-page">
          <h2 className="simple-title">Jobs / Collaboration</h2>
          <p className="simple-text">Looking for teammates posts will appear here.</p>
        </main>
      )}

      {/* ══════════════════ ABOUT ══════════════════ */}
      {page === "about" && (
        <main className="simple-page">
          <h2 className="simple-title">About Likha</h2>
          <p className="simple-text">A student collaboration and portfolio platform built for UP Visayas students.</p>
        </main>
      )}

      {/* ══════════════════ SETTINGS ══════════════════ */}
      {page === "settings" && (
  <main className="simple-page">
    <h2 className="simple-title">Settings</h2>

    <div className="settings-form">

      <h3 className="settings-section-title">Basic Info</h3>

      <label className="form-label">Name</label>
      <input
        className="form-input"
        value={settingsForm.name || ""}
        onChange={e => setSettingsForm(f => ({ ...f, name: e.target.value }))}
        placeholder="Full name"
      />

      <label className="form-label">Email</label>
      <input
        className="form-input"
        type="email"
        value={settingsForm.email || ""}
        onChange={e => setSettingsForm(f => ({ ...f, email: e.target.value }))}
        placeholder="Email"
      />

      <label className="form-label">Birthday</label>
      <input
        className="form-input"
        type="date"
        value={settingsForm.birthday || ""}
        onChange={e => setSettingsForm(f => ({ ...f, birthday: e.target.value }))}
      />

      <label className="form-label">Address</label>
      <input
      className="form-input"
      value={settingsForm.address || ""}
      onChange={e => setSettingsForm(f => ({ ...f, address: e.target.value }))}
      placeholder="Your address"
/>

      <label className="form-label">New Password</label>
      <input
        className="form-input"
        type="password"
        value={settingsForm.password || ""}
        onChange={e => setSettingsForm(f => ({ ...f, password: e.target.value }))}
        placeholder="Leave blank to keep current"
      />

      <button className="save-btn" onClick={handleSaveSettings}>
        Save Changes
      </button>

      <hr style={{ margin: "24px 0", opacity: 0.2 }} />

      <button
        className="settings-edit-btn"
        style={{ background: "#251d4b", width: "100%" }}
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
      >
        Log Out
      </button>

    </div>
  </main>
)}

      {/* ── FOOTER ── */}
      <footer className="dashboard-footer">
        <div className="footer-left">
          <div>
            <img src={logoImg} alt="Likha" className="footer-logo-img" />
          </div>
          <div className="footer-links">
            {["Profile", "Portfolios", "Jobs", "About"].map(p => (
              <a
                key={p}
                href="#"
                className="footer-link"
                onClick={e => { e.preventDefault(); setPage(p.toLowerCase()); }}
              >
                {p}
              </a>
            ))}
          </div>
          <p className="footer-copy">© 2026 Likha. All Rights Reserved</p>
        </div>
        <div className="footer-icons">
          {SocialIcons.map(({ src, alt }) => (
            <img key={alt} src={src} alt={alt} className="footer-icon-img" />
          ))}
        </div>
      </footer>

      {/* ══════════════════ MODALS ══════════════════ */}

      {modal === "softSkill" && (
        <Modal title="Add Soft Skill" onClose={() => setModal(null)}>
          <div className="form-col">
            <label className="form-label">Icon (emoji)</label>
            <div className="icon-picker">
              {SOFT_SKILL_ICONS.map(ic => (
                <button key={ic} className={`icon-option${form.icon === ic ? " active" : ""}`} onClick={() => setF("icon", ic)}>{ic}</button>
              ))}
            </div>
            <label className="form-label">Name *</label>
            <input className="form-input" value={form.name || ""} onChange={e => setF("name", e.target.value)} placeholder="e.g. Leadership" />
            <label className="form-label">Description</label>
            <textarea className="form-textarea" value={form.desc || ""} onChange={e => setF("desc", e.target.value)} placeholder="Brief description..." />
            <button className="save-btn" onClick={saveSoftSkill}>Add Skill</button>
          </div>
        </Modal>
      )}

      {modal === "editSoft" && (
        <Modal title="Edit Soft Skill" onClose={() => setModal(null)}>
          <div className="form-col">
            <label className="form-label">Icon (emoji)</label>
            <div className="icon-picker">
              {SOFT_SKILL_ICONS.map(ic => (
                <button key={ic} className={`icon-option${form.icon === ic ? " active" : ""}`} onClick={() => setF("icon", ic)}>{ic}</button>
              ))}
            </div>
            <label className="form-label">Name *</label>
            <input className="form-input" value={form.name || ""} onChange={e => setF("name", e.target.value)} />
            <label className="form-label">Description</label>
            <textarea className="form-textarea" value={form.desc || ""} onChange={e => setF("desc", e.target.value)} />
            <button className="save-btn" onClick={saveSoftSkill}>Save Changes</button>
          </div>
        </Modal>
      )}

      {modal === "hardSkill" && (
        <Modal title="Add Hard Skill" onClose={() => setModal(null)}>
          <div className="form-col">
            <label className="form-label">Select a skill</label>
            <select className="form-input" value={form.name || ""} onChange={e => setF("name", e.target.value)}>
              <option value="">— choose from list —</option>
              {Object.keys(HARD_SKILL_LOGOS).filter(k => !hardSkills.find(h => h.name === k)).map(k => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
            <p className="hint-text">Or type a custom skill:</p>
            <input className="form-input" value={form.name || ""} onChange={e => setF("name", e.target.value)} placeholder="Custom skill name" />
            <button className="save-btn" onClick={saveHardSkill}>Add Skill</button>
          </div>
        </Modal>
      )}

      {modal === "project" && (
        <Modal title="Add Project" onClose={() => setModal(null)}>
          <div className="form-col">
            <label className="form-label">Project Name *</label>
            <input className="form-input" value={form.name || ""} onChange={e => setF("name", e.target.value)} placeholder="e.g. 22 Coffee" />
            <label className="form-label">Description</label>
            <textarea className="form-textarea" value={form.desc || ""} onChange={e => setF("desc", e.target.value)} placeholder="Brief description..." />
            <label className="form-label">Link (optional)</label>
            <input className="form-input" value={form.link || ""} onChange={e => setF("link", e.target.value)} placeholder="https://..." />
            <label className="form-label">Logo URL (optional)</label>
            <input className="form-input" value={form.logo || ""} onChange={e => setF("logo", e.target.value)} placeholder="https://..." />
            <label className="form-label">Background Color</label>
            <input type="color" value={form.bg || "#251D4B"} onChange={e => setF("bg", e.target.value)} className="color-picker-input" />
            <button className="save-btn" onClick={saveProject}>Add Project</button>
          </div>
        </Modal>
      )}

      {modal === "editProject" && (
        <Modal title="Edit Project" onClose={() => setModal(null)}>
          <div className="form-col">
            <label className="form-label">Project Name *</label>
            <input className="form-input" value={form.name || ""} onChange={e => setF("name", e.target.value)} />
            <label className="form-label">Description</label>
            <textarea className="form-textarea" value={form.desc || ""} onChange={e => setF("desc", e.target.value)} />
            <label className="form-label">Link</label>
            <input className="form-input" value={form.link || ""} onChange={e => setF("link", e.target.value)} />
            <label className="form-label">Logo URL</label>
            <input className="form-input" value={form.logo || ""} onChange={e => setF("logo", e.target.value)} />
            <label className="form-label">Background Color</label>
            <input type="color" value={form.bg || "#251D4B"} onChange={e => setF("bg", e.target.value)} className="color-picker-input" />
            <button className="save-btn" onClick={saveProject}>Save Changes</button>
          </div>
        </Modal>
      )}

      {modal === "achievement" && (
        <Modal title="Add Achievement" onClose={() => setModal(null)}>
          <div className="form-col">
            <label className="form-label">Title *</label>
            <input className="form-input" value={form.title || ""} onChange={e => setF("title", e.target.value)} placeholder="e.g. Komsai Hack 2025" />
            <label className="form-label">Subtitle / Award</label>
            <input className="form-input" value={form.sub || ""} onChange={e => setF("sub", e.target.value)} placeholder="e.g. 1st Runner Up" />
            <button className="save-btn" onClick={saveAchievement}>Add Achievement</button>
          </div>
        </Modal>
      )}

      {modal === "editAchievement" && (
        <Modal title="Edit Achievement" onClose={() => setModal(null)}>
          <div className="form-col">
            <label className="form-label">Title *</label>
            <input className="form-input" value={form.title || ""} onChange={e => setF("title", e.target.value)} />
            <label className="form-label">Subtitle / Award</label>
            <input className="form-input" value={form.sub || ""} onChange={e => setF("sub", e.target.value)} />
            <button className="save-btn" onClick={saveAchievement}>Save Changes</button>
          </div>
        </Modal>
      )}

    </div>
  );
}