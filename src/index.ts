import { serve } from '@hono/node-server'
import dotenv from 'dotenv'
import { Hono } from 'hono'
import pg from 'pg'
import { user } from './routes/user.js'

dotenv.config()

const client = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
})

client
  .connect()
  .catch((err) => console.error('Database connection error:', err))

const app = new Hono()

app.get('/', async (c) => {
  try {
    const result = await client.query('SELECT * FROM todos')
    return c.json(result.rows)
  } catch (err) {
    console.error(err)
    return c.json({ message: 'Error fetching todos' }, 500)
  }
})
app.put('/', (c) => c.text('PUT /'))
app.delete('/', (c) => c.text('DELETE /'))

app.route('/user', user)

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
