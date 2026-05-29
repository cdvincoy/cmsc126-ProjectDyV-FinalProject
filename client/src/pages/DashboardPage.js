import React, { useState } from "react";
import "./DashboardPage.css";
import iconImg from "../assets/logo.png";
import logoImg from "../assets/LIKHA.png";
import facebookIcon from "../assets/facebook.svg";
import messengerIcon from "../assets/messenger.svg";
import githubIcon from "../assets/github.svg";
import linkedinIcon from "../assets/linkedin.svg";

/* ─── Utility icon SVGs (non-social, kept inline as they're UI controls) ─── */
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

/* ─── Social icon img helper ─── */
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

  // Profile hero
  const [profileImg,  setProfileImg]  = useState("https://via.placeholder.com/300");
  const [name,        setName]        = useState("NICOLE ASHLEY DY");
  const [designation, setDesignation] = useState("UNDERGRADUATE STUDENT");
  const [bio,         setBio]         = useState("I'm Dy, a third-year undergraduate student attending University of the Philippines Visayas. I have experience in programming languages such as Python, C, Java, JavaScript, and PHP. I also have skills in UI/UX design and front-end development using HTML and CSS.");
  const [socials,     setSocials]     = useState({ fb: "#", msg: "#", gh: "#", li: "#" });

  // Skills
  const [softSkills, setSoftSkills] = useState([]);
  const [hardSkills, setHardSkills] = useState([]);

  // Projects
  const [projects, setProjects] = useState([]);

  // Achievements
  const [achievements, setAchievements] = useState([]);

  // Modals
  const [modal,      setModal]      = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [form,       setForm]       = useState({});
  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));

  function openAdd(type)        { setForm({});          setEditTarget(null);    setModal(type); }
  function openEdit(type, item) { setForm({ ...item }); setEditTarget(item.id); setModal(type); }

  /* ── SOFT SKILL CRUD ── */
  function saveSoftSkill() {
    if (!form.name) return;
    if (editTarget) {
      setSoftSkills(ss => ss.map(s => s.id === editTarget ? { ...s, ...form } : s));
    } else {
      setSoftSkills(ss => [...ss, { id: Date.now(), icon: form.icon || "⭐", name: form.name, desc: form.desc || "", active: false }]);
    }
    setModal(null);
  }
  const deleteSoftSkill = id  => setSoftSkills(ss => ss.filter(s => s.id !== id));
  const toggleSoftSkill = id  => setSoftSkills(ss => ss.map(s => s.id === id ? { ...s, active: !s.active } : s));

  /* ── HARD SKILL CRUD ── */
  function saveHardSkill() {
    if (!form.name) return;
    if (!hardSkills.includes(form.name)) setHardSkills(hs => [...hs, form.name]);
    setModal(null);
  }
  const deleteHardSkill = name => setHardSkills(hs => hs.filter(h => h !== name));

  /* ── PROJECT CRUD ── */
  function saveProject() {
    if (!form.name) return;
    if (editTarget) {
      setProjects(ps => ps.map(p => p.id === editTarget ? { ...p, ...form } : p));
    } else {
      setProjects(ps => [...ps, { id: Date.now(), logo: form.logo || "", name: form.name, desc: form.desc || "", bg: form.bg || "#251D4B" }]);
    }
    setModal(null);
  }
  const deleteProject = id => setProjects(ps => ps.filter(p => p.id !== id));

  /* ── ACHIEVEMENT CRUD ── */
  function saveAchievement() {
    if (!form.title) return;
    if (editTarget) {
      setAchievements(as => as.map(a => a.id === editTarget ? { ...a, ...form } : a));
    } else {
      setAchievements(as => [...as, { id: Date.now(), title: form.title, sub: form.sub || "" }]);
    }
    setModal(null);
  }
  const deleteAchievement = id => setAchievements(as => as.filter(a => a.id !== id));

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
            <div className="user-avatar">NA</div>
            <span className="user-name">Nicole Ashley Dy</span>
            <span className="user-sub">Undergraduate Student</span>
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
                      onBlur={e => e.target.value && setProfileImg(e.target.value)}
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
                  <p className="hero-designation">{designation}</p>
                  <h1 className="hero-name">{name}</h1>
                  <p className="hero-bio">{bio}</p>
                </>
              )}

              {/* Social icons + CV/Edit button */}
              <div className="social-row">
                {SocialIcons.map(({ src, alt, key }) => (
                  <a key={key} href={socials[key]} className="social-btn">
                    <img src={src} alt={alt} className="social-icon-img" />
                  </a>
                ))}
                <button className="cv-btn" onClick={() => setIsEditing(!isEditing)}>
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
                <div key={h} className="hard-card">
                  {isEditing && (
                    <div className="card-actions">
                      <button className="icon-btn" onClick={() => deleteHardSkill(h)}><TrashIcon /></button>
                    </div>
                  )}
                  {HARD_SKILL_LOGOS[h]
                    ? <img src={HARD_SKILL_LOGOS[h]} alt={h} className="hard-logo" />
                    : <div className="hard-fallback">{h[0]}</div>
                  }
                  <p className="hard-name">{h}</p>
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
                  <button className="play-btn"><PlayIcon /></button>
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
          {[
            { name: "CLAIRE VINCOY", role: "UX/UI ENGINEER", bio: "I'm Claire, a UI/UX engineer with experience in designing intuitive and user-centered digital interfaces. I have skills in wireframing, prototyping, visual design, and front-end development using tools such as Figma, HTML, CSS, and JavaScript.", img: "https://via.placeholder.com/260", dark: false },
          ].map((u, i) => {
            const bg     = u.dark ? "#251D4B" : "white";
            const clr    = u.dark ? "white"   : "#1a1a2e";
            const subClr = u.dark ? "rgba(255,255,255,.6)" : "#888";
            const bioClr = u.dark ? "rgba(255,255,255,.8)" : "#555";
            const socialHrefs = { fb: "#", msg: "#", gh: "#", li: "#" };
            return (
              <div key={i} className="portfolio-row" style={{ background: bg, color: clr }}>
                <div className="portfolio-left">
                  <img
                    src={u.img}
                    alt={u.name}
                    className="portfolio-img"
                    style={{ border: u.dark ? "3px solid rgba(255,255,255,.2)" : "3px solid #eee" }}
                  />
                </div>
                <div className="portfolio-right">
                  <p className="portfolio-role" style={{ color: subClr }}>{u.role}</p>
                  <h2 className="portfolio-name" style={{ color: clr }}>{u.name}</h2>
                  <p className="portfolio-bio" style={{ color: bioClr }}>{u.bio}</p>
                  <div className="portfolio-social-row">
                    {SocialIcons.map(({ src, alt, key }) => (
                      <a
                        key={key}
                        href={socialHrefs[key]}
                        className="social-btn"
                        style={{ border: u.dark ? "1.5px solid rgba(255,255,255,.3)" : "1.5px solid #d0d0e0" }}
                      >
                        <img src={src} alt={alt} className="social-icon-img" />
                      </a>
                    ))}
                    <button className="view-port-btn">VIEW PORTFOLIO</button>
                  </div>
                </div>
              </div>
            );
          })}
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
          <button className="settings-edit-btn" onClick={() => { setPage("profile"); setIsEditing(true); }}>
            Edit Profile
          </button>
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

      {/* Add Soft Skill */}
      {modal === "softSkill" && (
        <Modal title="Add Soft Skill" onClose={() => setModal(null)}>
          <div className="form-col">
            <label className="form-label">Icon (emoji)</label>
            <div className="icon-picker">
              {SOFT_SKILL_ICONS.map(ic => (
                <button
                  key={ic}
                  className={`icon-option${form.icon === ic ? " active" : ""}`}
                  onClick={() => setF("icon", ic)}
                >
                  {ic}
                </button>
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

      {/* Edit Soft Skill */}
      {modal === "editSoft" && (
        <Modal title="Edit Soft Skill" onClose={() => setModal(null)}>
          <div className="form-col">
            <label className="form-label">Icon (emoji)</label>
            <div className="icon-picker">
              {SOFT_SKILL_ICONS.map(ic => (
                <button
                  key={ic}
                  className={`icon-option${form.icon === ic ? " active" : ""}`}
                  onClick={() => setF("icon", ic)}
                >
                  {ic}
                </button>
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

      {/* Add Hard Skill */}
      {modal === "hardSkill" && (
        <Modal title="Add Hard Skill" onClose={() => setModal(null)}>
          <div className="form-col">
            <label className="form-label">Select a skill</label>
            <select className="form-input" value={form.name || ""} onChange={e => setF("name", e.target.value)}>
              <option value="">— choose from list —</option>
              {Object.keys(HARD_SKILL_LOGOS).filter(k => !hardSkills.includes(k)).map(k => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
            <p className="hint-text">Or type a custom skill:</p>
            <input className="form-input" value={form.name || ""} onChange={e => setF("name", e.target.value)} placeholder="Custom skill name" />
            <button className="save-btn" onClick={saveHardSkill}>Add Skill</button>
          </div>
        </Modal>
      )}

      {/* Add Project */}
      {modal === "project" && (
        <Modal title="Add Project" onClose={() => setModal(null)}>
          <div className="form-col">
            <label className="form-label">Project Name *</label>
            <input className="form-input" value={form.name || ""} onChange={e => setF("name", e.target.value)} placeholder="e.g. 22 Coffee" />
            <label className="form-label">Description</label>
            <textarea className="form-textarea" value={form.desc || ""} onChange={e => setF("desc", e.target.value)} placeholder="Brief description..." />
            <label className="form-label">Logo URL (optional)</label>
            <input className="form-input" value={form.logo || ""} onChange={e => setF("logo", e.target.value)} placeholder="https://..." />
            <label className="form-label">Background Color</label>
            <input type="color" value={form.bg || "#251D4B"} onChange={e => setF("bg", e.target.value)} className="color-picker-input" />
            <button className="save-btn" onClick={saveProject}>Add Project</button>
          </div>
        </Modal>
      )}

      {/* Edit Project */}
      {modal === "editProject" && (
        <Modal title="Edit Project" onClose={() => setModal(null)}>
          <div className="form-col">
            <label className="form-label">Project Name *</label>
            <input className="form-input" value={form.name || ""} onChange={e => setF("name", e.target.value)} />
            <label className="form-label">Description</label>
            <textarea className="form-textarea" value={form.desc || ""} onChange={e => setF("desc", e.target.value)} />
            <label className="form-label">Logo URL</label>
            <input className="form-input" value={form.logo || ""} onChange={e => setF("logo", e.target.value)} />
            <label className="form-label">Background Color</label>
            <input type="color" value={form.bg || "#251D4B"} onChange={e => setF("bg", e.target.value)} className="color-picker-input" />
            <button className="save-btn" onClick={saveProject}>Save Changes</button>
          </div>
        </Modal>
      )}

      {/* Add Achievement */}
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

      {/* Edit Achievement */}
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