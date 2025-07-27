import fastify from 'fastify'
import discord from './routes/auth/discord'

export default function createApp(opts = {}) {
  const app = fastify(opts);

  app.register(discord)

  return app;
}

