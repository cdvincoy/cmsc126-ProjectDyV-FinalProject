import React, { useState, useEffect } from "react";
import "./PortfolioPage.css";

const API = "http://localhost:5000";

/* ─── Utility icon SVGs ─── */
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const BackIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    width="18"
    height="18"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const HARD_SKILL_LOGOS = {
  Python:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  JavaScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  Java:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  C: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  React:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  HTML:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  TypeScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  MySQL:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
};

export default function PortfolioPage({
  userId,
  user: initialUser,
  onBack,
}) {
  const [user, setUser] = useState(initialUser || null);

  const [loading, setLoading] = useState(false);

  const [softSkills, setSoftSkills] = useState([]);
  const [hardSkills, setHardSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState([]);

  const [activeSkill, setActiveSkill] = useState(null);

  useEffect(() => {
    if (!userId) return;

    async function fetchPortfolio() {
      setLoading(true);

      try {
        const [skillsRes, projectsRes, awardsRes] = await Promise.all([
          fetch(`${API}/skills`),
          fetch(`${API}/projects`),
          fetch(`${API}/awards`),
        ]);

        const [skillsData, projectsData, awardsData] = await Promise.all([
          skillsRes.json(),
          projectsRes.json(),
          awardsRes.json(),
        ]);

        setUser(initialUser);

        const userSkills = skillsData.filter(
          (s) => Number(s.user_id) === Number(userId)
        );

        setSoftSkills(
          userSkills
            .filter((s) => s.type === "soft")
            .map((s) => ({
              id: s.id,
              name: s.name,
              icon: s.icon || "⭐",
              desc: s.description || "",
            }))
        );

        setHardSkills(
          userSkills
            .filter((s) => s.type === "hard")
            .map((s) => ({
              id: s.id,
              name: s.name,
            }))
        );

        setProjects(
          projectsData
            .filter((p) => Number(p.user_id) === Number(userId))
            .map((p) => ({
              id: p.id,
              name: p.title,
              desc: p.description || "",
              logo: p.logo || "",
              link: p.link || "",
              bg: p.bg || "#251D4B",
            }))
        );

        setAchievements(
          awardsData
            .filter((a) => Number(a.user_id) === Number(userId))
            .map((a) => ({
              id: a.id,
              title: a.title,
              sub: a.description || "",
            }))
        );
      } catch (err) {
        console.error("Error fetching portfolio:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolio();
  }, [userId, initialUser]);

  /* ── Loading State ── */
  if (loading) {
    return (
      <div className="pf-loading">
        <div className="pf-spinner" />
        <p>Loading portfolio…</p>
      </div>
    );
  }

  /* ── Error State ── */
  if (!user) {
    return (
      <div className="pf-loading">
        <p>Could not load this portfolio.</p>

        <button className="pf-back-btn" onClick={onBack}>
          <BackIcon /> Go Back
        </button>
      </div>
    );
  }

  const initials = user.name?.slice(0, 2).toUpperCase() || "??";

  return (
    <div className="pf-root">
      {/* ── Top Bar ── */}
      <div className="pf-topbar">
        <button className="pf-back-btn" onClick={onBack}>
          <BackIcon /> Back to Portfolios
        </button>
      </div>

      {/* ── HERO ── */}
      <section className="pf-hero">
        <div className="pf-hero-left">
          {user.profile_img ? (
            <img
              src={user.profile_img}
              alt={user.name}
              className="pf-avatar-img"
            />
          ) : (
            <div className="pf-avatar-initials">{initials}</div>
          )}
        </div>

        <div className="pf-hero-right">
          <p className="pf-label">ABOUT ME</p>

          <p className="pf-designation">
            {user.designation || "Student"}
          </p>

          <h1 className="pf-name">{user.name}</h1>

          <p className="pf-bio">
            {user.bio || "No bio provided."}
          </p>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="pf-section">
        <h2 className="pf-section-title">SKILLS</h2>

        {/* Soft Skills */}
        <p className="pf-sub-label">SOFT SKILLS</p>

        {softSkills.length === 0 ? (
          <p className="pf-empty">No soft skills added yet.</p>
        ) : (
          <div className="pf-soft-grid">
            {softSkills.map((s) => (
              <div
                key={s.id}
                className={`pf-soft-card${
                  activeSkill === s.id ? " pf-active" : ""
                }`}
                onClick={() =>
                  setActiveSkill(activeSkill === s.id ? null : s.id)
                }
              >
                <span className="pf-soft-icon">{s.icon}</span>

                <p className="pf-soft-name">{s.name}</p>

                {activeSkill === s.id && s.desc && (
                  <p className="pf-soft-desc">{s.desc}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Hard Skills */}
        <p className="pf-sub-label pf-mt">HARD SKILLS</p>

        {hardSkills.length === 0 ? (
          <p className="pf-empty">No hard skills added yet.</p>
        ) : (
          <div className="pf-hard-grid">
            {hardSkills.map((h) => (
              <div key={h.id} className="pf-hard-card">
                {HARD_SKILL_LOGOS[h.name] ? (
                  <img
                    src={HARD_SKILL_LOGOS[h.name]}
                    alt={h.name}
                    className="pf-hard-logo"
                  />
                ) : (
                  <div className="pf-hard-fallback">
                    {h.name[0]}
                  </div>
                )}

                <p className="pf-hard-name">{h.name}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── PROJECTS ── */}
      <section className="pf-project-section">
        <div className="pf-projects-header">
          <h2 className="pf-projects-label">PROJECTS</h2>
        </div>

        {projects.length === 0 ? (
          <p
            className="pf-empty"
            style={{ padding: "0 60px 40px" }}
          >
            No projects added yet.
          </p>
        ) : (
          projects.map((p, i) => (
            <div
              key={p.id}
              className="pf-project-hero"
              style={{
                background: i === 0 ? "#251D4B" : p.bg,
              }}
            >
              <div className="pf-project-card">
                {p.logo ? (
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="pf-project-logo"
                  />
                ) : (
                  <div className="pf-project-logo-fallback">
                    {p.name[0]}
                  </div>
                )}

                <h3 className="pf-project-name">{p.name}</h3>

                <p className="pf-project-desc">{p.desc}</p>
              </div>

              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="pf-play-btn"
                >
                  <PlayIcon />
                </a>
              )}
            </div>
          ))
        )}
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section className="pf-section">
        <h2 className="pf-section-title">ACHIEVEMENTS</h2>

        {achievements.length === 0 ? (
          <p className="pf-empty">
            No achievements added yet.
          </p>
        ) : (
          <div className="pf-ach-grid">
            {achievements.map((a) => (
              <div key={a.id} className="pf-ach-card">
                <div className="pf-ach-badge">🏆</div>

                <p className="pf-ach-title">{a.title}</p>

                <p className="pf-ach-sub">{a.sub}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}