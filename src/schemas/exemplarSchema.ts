import { z } from 'zod'

export const exemplarSchema = z.object({
  bookId: z.string().uuid('Book ID must be a valid UUID.'),
  available: z.boolean().default(true).optional(),
})

export const exemplarResponseSchema = exemplarSchema.extend({
  id: z.string().uuid(),
})

export type ExemplarInput = z.infer<typeof exemplarSchema>
