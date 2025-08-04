import { getFastify, prisma } from '../setup'
import { generateMockAuthor } from '../mocks/mockData'

describe('Book Controller Tests', () => {
  it('should list all books', async () => {
    const fastify = getFastify()
    const response = await fastify.inject({
      method: 'GET',
      url: '/books',
    })

    expect(response.statusCode).toBe(200)

    const body = response.json()
    expect(Array.isArray(body)).toBe(true)
  })

  it('should create a new book', async () => {
    const author = generateMockAuthor()
    await prisma.author.create({ data: author })

    const newBookPayload = {
      title: 'Test Book',
      authorId: author.id,
    }

    const fastify = getFastify()
    const response = await fastify.inject({
      method: 'POST',
      url: '/books',
      payload: newBookPayload,
    })

    expect(response.statusCode).toBe(201)

    const body = response.json()
    expect(body).toHaveProperty('id')
    expect(body.title).toBe(newBookPayload.title)
  })
})
