import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  await prisma.loan.deleteMany()
  await prisma.exemplar.deleteMany()
  await prisma.book.deleteMany()
  await prisma.author.deleteMany()
  await prisma.user.deleteMany()
  console.log('Old data cleaned.')

  const authors = []
  for (let i = 0; i < 10; i++) {
    const author = await prisma.author.create({
      data: {
        id: uuidv4(),
        name: faker.person.fullName(),
      },
    })
    authors.push(author)
  }

  const users = []
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
    })
    users.push(user)
  }
  console.log(`Created ${users.length} users.`)

  const exemplars = []
  for (let i = 0; i < 20; i++) {
    const randomAuthor = authors[Math.floor(Math.random() * authors.length)]

    const book = await prisma.book.create({
      data: {
        id: uuidv4(),
        title: faker.lorem.words({ min: 2, max: 5 }),
        authorId: randomAuthor.id,
      },
    })

    for (let j = 0; j < 3; j++) {
      const exemplar = await prisma.exemplar.create({
        data: {
          id: uuidv4(),
          bookId: book.id,
          available: true,
        },
      })
      exemplars.push(exemplar)
    }
  }
  console.log(`Created 20 books and ${exemplars.length} exemplars.`)

  for (let i = 0; i < 5; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)]
    const randomExemplar = exemplars[i]

    await prisma.$transaction(async (tx) => {
      await tx.loan.create({
        data: {
          id: uuidv4(),
          exemplarId: randomExemplar.id,
          userId: randomUser.id,
          loanedAt: new Date(),
        },
      })

      await tx.exemplar.update({
        where: { id: randomExemplar.id },
        data: { available: false },
      })
    })
  }
  console.log(`Created 5 book loans.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('Ended seeding.')
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
