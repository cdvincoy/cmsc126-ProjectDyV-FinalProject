import 'dotenv/config'
import express from 'express'
import { pool } from './database.js'

const app = express()

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