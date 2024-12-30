import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import { user } from './routes/user.js'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
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
