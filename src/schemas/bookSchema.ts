import { z } from 'zod'

export const bookSchema = z.object({
  title: z.string().min(1),
  authorName: z.string().min(1),
})

export const bookResponseSchema = bookSchema.extend({
  id: z.string().uuid(),
})

export type BookInput = z.infer<typeof bookSchema>
