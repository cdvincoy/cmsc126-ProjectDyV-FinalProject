require('dotenv').config()
const express = require('express')
const { Pool } = require('pg')

const app = express()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

app.get('/api', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users')
    res.json({ users: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

app.listen(5000, () => {
  console.log('Server started on port 5000')
})