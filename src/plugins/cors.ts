import { FastifyInstance } from 'fastify'
import fastifyCors from '@fastify/cors'

export async function registerCors(app: FastifyInstance): Promise<void> {
  await app.register(fastifyCors, {
    origin: '*',
  })
}
