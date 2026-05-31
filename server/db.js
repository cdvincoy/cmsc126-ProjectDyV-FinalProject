// const Pool = require("pg").Pool;

// const pool = new Pool({
//     user: "postgres",
//     password: "August21",
//     host: "localhost",
//     port: 5432,
//     database: "project_db"
// });

// module.exports = pool;

const Pool = require("pg").Pool;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Required for Supabase
});

module.exports = pool;