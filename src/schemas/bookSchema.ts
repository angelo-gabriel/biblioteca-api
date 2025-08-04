import { z } from 'zod'
import { exemplarResponseSchema } from './exemplarSchema'

// Schema para a listagem
export const bookListSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  authorName: z.string(),
})

// Schema para a criação
export const bookSchema = z.object({
  title: z.string().min(1),
  authorId: z.string().uuid(),
})

export const createBookSchema = bookSchema.extend({
  exemplars: z.array(exemplarResponseSchema).optional(),
  authorName: z.string().optional(),
})

// Schema de resposta para a criação
export const bookResponseSchema = bookSchema.extend({
  id: z.string().uuid(),
  exemplars: z.array(exemplarResponseSchema),
  numberOfExemplars: z.number().int().nonnegative(),
})

export type BookInput = z.infer<typeof bookSchema>
