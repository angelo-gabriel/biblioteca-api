import { z } from 'zod'

export const authorSchema = z.object({
  name: z.string(),
})

export type AuthorInput = z.infer<typeof authorSchema>
