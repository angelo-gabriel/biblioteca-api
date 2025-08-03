import { buildServer } from './app'

buildServer()
  .then((app) => app.listen({ port: 3333 }))
  .catch((err: unknown) => {
    console.error('Error starting server:', err)
    process.exit(1)
  })
