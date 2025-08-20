require('dotenv').config()
import fastify from 'fastify'
import discord from './routes/auth/discord'
import basicAuth from './routes/auth/basicAuth';
import routes from './routes/userRoutes';
import RoomRoutes from './routes/protected/rooms';
import { initializeDatabase } from './database';
import authenticate from './plugins/authenticate';
import cookie from './plugins/cookie';
import cors from './plugins/cors';
import jwt from './plugins/jwt';
import fs from 'fs'
import path from 'path'

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
  app.register(RoomRoutes);

  initializeDatabase();
  const dir = path.join(__dirname, 'avatars');
  if (!fs.existsSync(dir))
    fs.mkdirSync(dir);

  return app;
}

