import { FastifyInstance } from 'fastify'
import { listAuthors, createAuthor } from '../controllers/authorController'
import { authorSchema } from '../schemas/authorSchema'
import { z } from 'zod'

export async function authorRoutes(app: FastifyInstance): Promise<void> {
  app.get('/authors', {
    schema: {
      response: {
        200: z.array(authorSchema),
      },
      tags: ['Authors'],
      summary: 'List all authors',
    },
    handler: listAuthors,
  })

  app.post('/authors', {
    schema: {
      body: authorSchema,
      response: {
        201: authorSchema,
      },
      tags: ['Authors'],
      summary: 'Create a new author',
    },
    handler: createAuthor,
  })
}
