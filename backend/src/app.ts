require('dotenv').config()
import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt';
import discord from './routes/auth/discord'
import { initializeDatabase } from './database';

export default function createApp(opts = {}) {
  const app = fastify(opts);

  app.register(discord)
  app.register(fastifyJwt, { 
    secret: process.env.JWT_SECRET || 'jwt-secret',
    cookie: {
      cookieName: 'token',
      signed: false
    }
  });
  initializeDatabase();

  return app;
}

