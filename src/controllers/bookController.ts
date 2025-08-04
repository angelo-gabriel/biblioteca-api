import { FastifyReply, FastifyRequest } from 'fastify'
import { BookInput, bookSchema, createBookSchema } from '../schemas/bookSchema'
import { v4 as uuidv4 } from 'uuid'
import { PrismaClient, Book, Author } from '@prisma/client'
import z, { number } from 'zod'

const prisma = new PrismaClient()

interface ListBooksQuery {
  title?: string
}

export async function listBooks(
  request: FastifyRequest<{ Querystring: ListBooksQuery }>,
  reply: FastifyReply
): Promise<void> {
  const { title } = request.query

  const whereCondition = title
    ? {
        title: {
          contains: title,
        },
      }
    : {}

  const books = await (request.server as any).prisma.book.findMany({
    where: whereCondition,
    include: {
      author: true,
    },
  })

  if (title && books.length === 0) {
    return reply.code(404).send({ message: 'No books found with that title' })
  }

  const formattedBooks = books.map((book: Book & { author: Author }) => ({
    id: book.id,
    title: book.title,
    authorName: book.author.name,
  }))
  return reply.code(200).send(formattedBooks)
}

export async function createBook(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { title, authorId, exemplars } = createBookSchema.parse(request.body)

    const author = await prisma.author.findUnique({
      where: { id: authorId },
    })

    if (!author) {
      return reply.code(404).send({ message: 'Author not found.' })
    }

    const exemplarsToCreate = [...Array(exemplars || 1)].map(() => ({
      id: uuidv4(),
      available: true,
    }))

    const newBook = await prisma.book.create({
      data: {
        title,
        author: {
          connect: { id: authorId },
        },
        exemplars: {
          create: exemplarsToCreate,
        },
      },
      include: {
        author: true,
        exemplars: true,
      },
    })

    const formattedBook = {
      id: newBook.id,
      title: newBook.title,
      authorId: newBook.author.id,
      exemplars: newBook.exemplars,
      numberOfExemplars: newBook.exemplars.length,
    }

    reply.code(201).send(formattedBook)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.code(400).send({
        message: 'Failed to validate request body',
        errors: error.issues,
      })
    }

    console.error(error)
    reply.code(500).send({ message: 'Internal server error' })
  }
}
