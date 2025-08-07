import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { FastifyPluginAsync } from 'fastify';

const jwtPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'jwt-secret',
    cookie: {
      cookieName: 'token',
      signed: false,
    },
  });
};

export default fp(jwtPlugin);