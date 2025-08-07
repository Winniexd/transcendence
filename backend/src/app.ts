require('dotenv').config()
import fastify from 'fastify'
import discord from './routes/auth/discord'
import basicAuth from './routes/auth/basicAuth';
import routes from './routes/routes';
import { initializeDatabase } from './database';
import authenticate from './plugins/authenticate';
import cookie from './plugins/cookie';
import cors from './plugins/cors';
import jwt from './plugins/jwt';

export default function createApp(opts = {}) {
  const app = fastify(opts);

  //Plugins
  app.register(authenticate);
  app.register(cookie);
  app.register(cors);
  app.register(jwt);

  //Routes
  app.register(discord);
  app.register(basicAuth);
  app.register(routes);

  initializeDatabase();

  return app;
}

