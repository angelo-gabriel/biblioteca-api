import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { AuthorInput } from '../schemas/authorSchema'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

export async function listAuthors(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authors = await prisma.author.findMany()
  return authors
}

export async function createAuthor(
  request: FastifyRequest<{ Body: AuthorInput }>,
  reply: FastifyReply
) {
  const { name } = request.body
  const author = await prisma.author.create({
    data: {
      id: uuidv4(),
      name,
    },
  })
  reply.code(201).send(author)
}
