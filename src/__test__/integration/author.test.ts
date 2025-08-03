import { faker } from '@faker-js/faker'
import { buildServer } from '../../app'

describe('Author Controller Tests', () => {
  it('should create a new author', async () => {
    const app = await buildServer()

    const newAuthor = { name: faker.person.fullName() }
    const response = await app.inject({
      method: 'POST',
      url: '/authors',
      payload: newAuthor,
    })

    expect(response.statusCode).toBe(201)
    const body = response.json()
    expect(body).toHaveProperty('id')
    expect(body.name).toBe(newAuthor.name)
  })

  it('should list all authors', async () => {
    const app = await buildServer()

    const response = await app.inject({
      method: 'GET',
      url: '/authors',
    })

    expect(response.statusCode).toBe(200)
    const body = response.json()
    expect(Array.isArray(body)).toBe(true)
    expect(body.length).toBeGreaterThan(0)
  })
})
