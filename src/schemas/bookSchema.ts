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
  authorName: z.string().min(1),
  numberOfExemplars: z.number().int().min(1, 'Must have at least 1 exemplar.'),
})

// Schema de resposta para a criação
export const bookResponseSchema = bookSchema.extend({
  id: z.string().uuid(),
  exemplars: z.array(exemplarResponseSchema),
})

export type BookInput = z.infer<typeof bookSchema>
