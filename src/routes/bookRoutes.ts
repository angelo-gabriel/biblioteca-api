import { FastifyInstance } from 'fastify'
import { listBooks, createBook } from '../controllers/bookController'
import { bookResponseSchema, bookSchema } from '../schemas/bookSchema'
import z from 'zod'

export async function bookRoutes(app: FastifyInstance): Promise<void> {
  app.get('/books', {
    schema: {
      response: {
        200: z.array(bookResponseSchema),
      },
      tags: ['Books'],
      summary: 'List all books',
    },
    handler: listBooks,
  })

  app.post('/books', {
    schema: {
      body: bookSchema,
      response: {
        201: bookResponseSchema,
      },
      tags: ['Books'],
      summary: 'Create a new book',
    },
    handler: createBook,
  })

  app.delete('/books/:id', {
    schema: {
      params: z.object({
        id: z.string().uuid(),
      }),
      response: {
        204: z.void(),
        404: z.object({
          message: z.string(),
        }),
      },
      tags: ['Books'],
      summary: 'Delete existing book',
    },
    handler: async (request, reply) => {
      const { id } = request.params as { id: string }

      const book = await app.prisma.book.findUnique({
        where: { id },
      })

      if (!book) {
        return reply.code(404).send({ message: 'Book not found' })
      }

      await app.prisma.book.delete({
        where: { id },
      })

      return reply.code(204).send()
    },
  })
}
