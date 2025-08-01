import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < 10; i++) {
    const authorId = uuidv4()
    const authorName = faker.person.fullName()

    const booksData = Array.from({ length: 20 }).map(() => ({
      id: uuidv4(),
      title: faker.lorem.words({ min: 2, max: 5 }),
    }))

    await prisma.author.create({
      data: {
        id: authorId,
        name: authorName,
        books: {
          create: booksData,
        },
      },
    })
  }
  console.log('Authors and books generated with success.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
