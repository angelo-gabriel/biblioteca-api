import { fastify } from 'fastify'
import prismaPlugin from './plugins/prisma'
import {
  ZodTypeProvider,
  validatorCompiler,
  serializerCompiler,
} from 'fastify-type-provider-zod'
import { registerSwagger } from './plugins/swagger'
import { registerCors } from './plugins/cors'
import { routes } from './routes/index'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

await registerCors(app)
await registerSwagger(app)

await app.register(prismaPlugin)

await app.register(routes)
