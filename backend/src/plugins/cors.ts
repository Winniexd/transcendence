import fp from 'fastify-plugin'
import { FastifyPluginAsync } from "fastify";
import fastifyCors from '@fastify/cors';

const corsPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.register(fastifyCors, {
    origin: "http://localhost:5173",
    credentials: true
  })
};

export default fp(corsPlugin);