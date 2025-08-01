import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

async function main() {
  const author1 = await prisma.author.create({
    data: {
      id: uuidv4(),
      name: 'Machado de Assis',
      books: {
        create: [
          {
            id: uuidv4(),
            title: 'Dom Casmurro',
          },
          {
            id: uuidv4(),
            title: 'O Alienista',
          },
        ],
      },
    },
  })
  const author2 = await prisma.author.create({
    data: {
      id: uuidv4(),
      name: 'Stephen King',
      books: {
        create: {
          id: uuidv4(),
          title: 'The Shining',
        },
      },
    },
  })
  console.log({ author1, author2 })
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
