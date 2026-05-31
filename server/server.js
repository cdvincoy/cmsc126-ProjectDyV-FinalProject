require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

app.use(cors({
  origin: "https://cmsc126-projectdyv-finalproject-1.onrender.com"
}));
app.use(express.json());


// // CREATE USER
// app.post("/users", async (req, res) => {

//   try {

//     const { name, email, password, bio, birthday, address } = req.body;

//     const newUser = await pool.query(
//       `INSERT INTO users
//       (name, email, password, bio, birthday, address)
//       VALUES ($1, $2, $3, $4, $5, $6)
//       RETURNING *`,
//       [name, email, password, bio, birthday, address]
//     );

//     res.json(newUser.rows[0]);

//   } catch (err) {

//     console.error(err.message);
//     res.status(500).send("Server error");

//   }
// });

// REGISTER USER
app.post("/users", async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const newUser = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, email, password]
    );

    res.json(newUser.rows[0]);

  } catch (err) {

    console.error(err.message);
    res.status(500).send("Server error");

  }
});

// LOG IN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const foundUser = user.rows[0];

    if (foundUser.password !== password) {
      return res.status(400).json({ message: "Wrong password" });
    }

    res.json(foundUser);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// GET ALL USERS
app.get("/users", async (req, res) => {

  try {

    const result = await pool.query(
      "SELECT * FROM users"
    );

    res.json(result.rows);

  } catch (err) {

    console.error(err.message);
    res.status(500).send("Server error");

  }
});

// UPDATE USER
app.put("/users/:id", async (req, res) => {

  try {

    const { id } = req.params;
    const { name, email, password, bio, birthday, address, profile_img, designation } = req.body;

    const updatedUser = await pool.query(
      `UPDATE users
       SET name = $1,
           email = $2,
           password = $3,
           bio = $4,
           birthday = $5,
           address = $6,
           profile_img = $7,
           designation = $8
       WHERE id = $9
       RETURNING *`,
      [name, email, password, bio, birthday, address, profile_img, designation, id]
    );

    res.json(updatedUser.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }

});

// DELETE USER
app.delete("/users/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const deletedUser = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );

    res.json(deletedUser.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }

});

// CREATE PROJECT
app.post("/projects", async (req, res) => {

  try {

    const { title, description, link, user_id } = req.body;

    const newProject = await pool.query(
      `INSERT INTO projects
      (title, description, link, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [title, description, link, user_id]
    );

    res.json(newProject.rows[0]);

  } catch (err) {

    console.error(err.message);

  }
});

// GET ALL PROJECTS
app.get("/projects", async (req, res) => {

  try {

    const allProjects = await pool.query(
      "SELECT * FROM projects"
    );

    res.json(allProjects.rows);

  } catch (err) {

    console.error(err.message);

  }
});


// UPDATE PROJECT
app.put("/projects/:id", async (req, res) => {

  try {

    const { id } = req.params;
    const { title, description, link } = req.body;

    const updatedProject = await pool.query(
      `UPDATE projects
       SET title = $1,
           description = $2,
           link = $3
       WHERE id = $4
       RETURNING *`,
      [title, description, link, id]
    );

    res.json(updatedProject.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }

});

// DELETE PROJECT
app.delete("/projects/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const deletedProject = await pool.query(
      "DELETE FROM projects WHERE id = $1 RETURNING *",
      [id]
    );

    res.json(deletedProject.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }

});

// CREATE SKILL
app.post("/skills", async (req, res) => {

  try {

    const { name, type, user_id } = req.body;

    const newSkills = await pool.query(
      `INSERT INTO skills
      (name, type, user_id)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [name, type, user_id]
    );

    res.json(newSkills.rows[0]);

  } catch (err) {

    console.error(err.message);

  }
});


// GET ALL SKILLS
app.get("/skills", async (req, res) => {

  try {

    const allSkills = await pool.query(
      "SELECT * FROM skills"
    );

    res.json(allSkills.rows);

  } catch (err) {

    console.error(err.message);

  }
});

// UPDATE SKILL
app.put("/skills/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, user_id } = req.body;

    const result = await pool.query(
      `UPDATE skills
       SET name = $1,
           type = $2,
           user_id = $3
       WHERE id = $4
       RETURNING *`,
      [name, type, user_id, id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE SKILL
app.delete("/skills/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM skills WHERE id = $1 RETURNING *",
      [id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// CREATE EDUCATION
app.post("/education", async (req, res) => {

  try {

    const {
      school,
      degree,
      year_start,
      year_end,
      user_id
    } = req.body;

    const newEducation = await pool.query(
      `INSERT INTO education
      (school, degree, year_start, year_end, user_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [school, degree, year_start, year_end, user_id]
    );

    res.json(newEducation.rows[0]);

  } catch (err) {

    console.error(err.message);

  }
});

// GET ALL EDUCATION
app.get("/education", async (req, res) => {

  try {

    const allEducation = await pool.query(
      "SELECT * FROM education"
    );

    res.json(allEducation.rows);

  } catch (err) {

    console.error(err.message);

  }
});

// UPDATE EDUCATION
app.put("/education/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { school, degree, year_start, year_end, user_id } = req.body;

    const result = await pool.query(
      `UPDATE education
       SET school = $1,
           degree = $2,
           year_start = $3,
           year_end = $4,
           user_id = $5
       WHERE id = $6
       RETURNING *`,
      [school, degree, year_start, year_end, user_id, id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE EDUCATION
app.delete("/education/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM education WHERE id = $1 RETURNING *",
      [id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// UPDATE CERTIFICATION
app.put("/certifications/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, organization, date_issued, link, user_id } = req.body;

    const result = await pool.query(
      `UPDATE certifications
       SET title = $1,
           organization = $2,
           date_issued = $3,
           link = $4,
           user_id = $5
       WHERE id = $6
       RETURNING *`,
      [title, organization, date_issued, link, user_id, id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE CERTIFICATION
app.delete("/certifications/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM certifications WHERE id = $1 RETURNING *",
      [id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// CREATE CERTIFICATION
app.post("/certifications", async (req, res) => {

  try {

    const {
      title,
      organization,
      date_issued,
      link,
      user_id
    } = req.body;

    const newCertifications = await pool.query(
      `INSERT INTO certifications
      (title, organization, date_issued, link, user_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [title, organization, date_issued, link, user_id]
    );

    res.json(newCertifications.rows[0]);

  } catch (err) {

    console.error(err.message);

  }
});

// GET ALL CERTIFICATIONS
app.get("/certifications", async (req, res) => {

  try {

    const allCertifications = await pool.query(
      "SELECT * FROM certifications"
    );

    res.json(allCertifications.rows);

  } catch (err) {

    console.error(err.message);

  }
});

// UPDATE CERTIFICATION
app.put("/certifications/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, organization, date_issued, link, user_id } = req.body;

    const result = await pool.query(
      `UPDATE certifications
       SET title = $1,
           organization = $2,
           date_issued = $3,
           link = $4,
           user_id = $5
       WHERE id = $6
       RETURNING *`,
      [title, organization, date_issued, link, user_id, id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE CERTIFICATION
app.delete("/certifications/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM certifications WHERE id = $1 RETURNING *",
      [id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// CREATE AWARD
app.post("/awards", async (req, res) => {

  try {

    const {
      title,
      description,
      date,
      user_id
    } = req.body;

    const newAwards = await pool.query(
      `INSERT INTO awards
      (title, description, date, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [title, description, date, user_id]
    );

    res.json(newAwards.rows[0]);

  } catch (err) {

    console.error(err.message);

  }
});


// GET ALL AWARDS
app.get("/awards", async (req, res) => {

  try {

    const allAwards = await pool.query(
      "SELECT * FROM awards"
    );

    res.json(allAwards.rows);

  } catch (err) {

    console.error(err.message);

  }
});

// UPDATE AWARD
app.put("/awards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, user_id } = req.body;

    const result = await pool.query(
      `UPDATE awards
       SET title = $1,
           description = $2,
           date = $3,
           user_id = $4
       WHERE id = $5
       RETURNING *`,
      [title, description, date, user_id, id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE AWARD
app.delete("/awards/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM awards WHERE id = $1 RETURNING *",
      [id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// CREATE WORK EXPERIENCE
app.post("/work_experience", async (req, res) => {

  try {

    const {
      company,
      role,
      description,
      start_date,
      end_date,
      is_current,
      user_id
    } = req.body;

    const newWorkExperience = await pool.query(
      `INSERT INTO work_experience
      (company, role, description, start_date, end_date, is_current, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        company,
        role,
        description,
        start_date,
        end_date,
        is_current,
        user_id
      ]
    );

    res.json(newWorkExperience.rows[0]);

  } catch (err) {

    console.error(err.message);

  }
});


// GET ALL WORK EXPERIENCE
app.get("/work_experience", async (req, res) => {

  try {

    const allWorkExperience = await pool.query(
      "SELECT * FROM work_experience"
    );

    res.json(allWorkExperience.rows);

  } catch (err) {

    console.error(err.message);

  }
});

// UPDATE WORK EXPERIENCE
app.put("/work_experience/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      company,
      role,
      description,
      start_date,
      end_date,
      is_current,
      user_id
    } = req.body;

    const result = await pool.query(
      `UPDATE work_experience
       SET company = $1,
           role = $2,
           description = $3,
           start_date = $4,
           end_date = $5,
           is_current = $6,
           user_id = $7
       WHERE id = $8
       RETURNING *`,
      [
        company,
        role,
        description,
        start_date,
        end_date,
        is_current,
        user_id,
        id
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE WORK EXPERIENCE
app.delete("/work_experience/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM work_experience WHERE id = $1 RETURNING *",
      [id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// CREATE JOB
app.post("/jobs", async (req, res) => {

  try {

    const {
      title,
      description,
      location,
      type,
      created_at,
      user_id
    } = req.body;

    const newJobs = await pool.query(
      `INSERT INTO jobs
      (title, description, location, type, created_at, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [
        title,
        description,
        location,
        type,
        created_at,
        user_id
      ]
    );

    res.json(newJobs.rows[0]);

  } catch (err) {

    console.error(err.message);

  }
});

// GET ALL JOBS
app.get("/jobs", async (req, res) => {

  try {

    const allJobs = await pool.query(
      "SELECT * FROM jobs"
    );

    res.json(allJobs.rows);

  } catch (err) {

    console.error(err.message);

  }
});

// UPDATE JOB
app.put("/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      location,
      type,
      created_at,
      user_id
    } = req.body;

    const result = await pool.query(
      `UPDATE jobs
       SET title = $1,
           description = $2,
           location = $3,
           type = $4,
           created_at = $5,
           user_id = $6
       WHERE id = $7
       RETURNING *`,
      [title, description, location, type, created_at, user_id, id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE JOB
app.delete("/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM jobs WHERE id = $1 RETURNING *",
      [id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// CREATE APPLICATION
app.post("/applications", async (req, res) => {

  try {

    const {
      message,
      status,
      user_id,
      job_id
    } = req.body;

    const newApplications = await pool.query(
      `INSERT INTO applications
      (message, status, user_id, job_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [message, status, user_id, job_id]
    );

    res.json(newApplications.rows[0]);

  } catch (err) {

    console.error(err.message);

  }
});

// GET ALL APPLICATIONS
app.get("/applications", async (req, res) => {

  try {

    const allApplications = await pool.query(
      "SELECT * FROM applications"
    );

    res.json(allApplications.rows);

  } catch (err) {

    console.error(err.message);

  }
});

// UPDATE APPLICATION
app.put("/applications/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { message, status, user_id, job_id } = req.body;

    const result = await pool.query(
      `UPDATE applications
       SET message = $1,
           status = $2,
           user_id = $3,
           job_id = $4
       WHERE id = $5
       RETURNING *`,
      [message, status, user_id, job_id, id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE APPLICATION
app.delete("/applications/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM applications WHERE id = $1 RETURNING *",
      [id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// SERVER
app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});

// GET comments for a portfolio owner
app.get("/comments/:portfolio_owner_id", async (req, res) => {
  try {
    const { portfolio_owner_id } = req.params;
    const result = await pool.query(
      `SELECT comments.*, users.name as commenter_name 
       FROM comments 
       JOIN users ON comments.user_id = users.id
       WHERE portfolio_owner_id = $1
       ORDER BY created_at DESC`,
      [portfolio_owner_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// POST a comment
app.post("/comments", async (req, res) => {
  try {
    const { message, user_id, portfolio_owner_id } = req.body;
    const result = await pool.query(
      `INSERT INTO comments (message, user_id, portfolio_owner_id)
       VALUES ($1, $2, $3) RETURNING *`,
      [message, user_id, portfolio_owner_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE a comment (only the commenter can delete)
app.delete("/comments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM comments WHERE id = $1 RETURNING *",
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});