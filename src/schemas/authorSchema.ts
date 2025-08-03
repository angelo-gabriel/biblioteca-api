import { z } from 'zod'

export const authorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

export const authorResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
})

export type AuthorInput = z.infer<typeof authorSchema>
