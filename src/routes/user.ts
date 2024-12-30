import { Hono } from 'hono'

const user = new Hono()

user.get('/', (c) => c.text('List Users'))
user.get('/:id', (c) => {
  const id = c.req.param('id')
  return c.text(`GET /user/${id}`)
})
user.post('/', (c) => c.text('Create user'))

export { user }
