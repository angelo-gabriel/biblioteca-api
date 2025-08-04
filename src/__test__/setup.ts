import { buildServer } from '../app'
import { PrismaClient } from '@prisma/client'
import { generateMockAuthor, generateMockBook } from './mocks/mockData'
import { faker } from '@faker-js/faker'

export const prisma = new PrismaClient()

let fastifyInstance: Awaited<ReturnType<typeof buildServer>>
export const getFastify = () => fastifyInstance

beforeAll(async () => {
  fastifyInstance = await buildServer()
  await fastifyInstance.ready()

  await prisma.loan.deleteMany()
  await prisma.exemplar.deleteMany()
  await prisma.book.deleteMany()
  await prisma.author.deleteMany()
})

afterAll(async () => {
  await prisma.$disconnect()
  await fastifyInstance.close()
})

beforeEach(async () => {
  await prisma.loan.deleteMany()
  await prisma.exemplar.deleteMany()
  await prisma.book.deleteMany()
  await prisma.author.deleteMany()
  await prisma.user.deleteMany()
})
