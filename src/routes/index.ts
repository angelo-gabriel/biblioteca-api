import { FastifyInstance } from 'fastify'
import { bookRoutes } from './bookRoutes'
import { authorRoutes } from './authorRoutes'

export async function routes(app: FastifyInstance): Promise<void> {
  app.register(bookRoutes, { prefix: '/' })
  app.register(authorRoutes, { prefix: '/' })
}
