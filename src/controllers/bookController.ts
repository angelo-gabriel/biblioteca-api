import { FastifyReply, FastifyRequest } from 'fastify'
import { BookInput } from '../schemas/bookSchema'
import { v4 as uuidv4 } from 'uuid'
import { PrismaClient, Book, Author } from '@prisma/client'

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

export async function createBook(
  request: FastifyRequest<{ Body: BookInput }>,
  reply: FastifyReply
) {
  const { title, authorName } = request.body

  const author = await prisma.author.findUnique({
    where: { name: authorName },
  })

  if (!author) {
    return reply.status(404).send({ message: 'Author not found' })
  }

  const newBook = await prisma.book.create({
    data: {
      id: uuidv4(),
      title,
      authorId: author.id,
    },
    include: {
      author: true,
    },
  })

  const formattedBook = {
    id: newBook.id,
    title: newBook.title,
    authorName: newBook.author.name,
  }

  reply.code(201).send(formattedBook)
}
