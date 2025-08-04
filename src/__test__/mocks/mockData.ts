import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'

export type MockAuthor = {
  id: string
  name: string
}

export type MockBook = {
  id: string
  title: string
  authorId: string
}

export function generateMockAuthor(): MockAuthor {
  return {
    id: uuidv4(),
    name: faker.person.fullName(),
  }
}

export function generateMockBook(authorId: string): MockBook {
  return {
    id: uuidv4(),
    title: faker.lorem.sentence(),
    authorId: authorId,
  }
}

export function generateMockAuthors(count: number): MockAuthor[] {
  return Array.from({ length: count }, generateMockAuthor)
}

export function generateMockBooks(count: number, authorId: string): MockBook[] {
  return Array.from({ length: count }, () => generateMockBook(authorId))
}
