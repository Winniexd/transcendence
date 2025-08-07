import fp from 'fastify-plugin'
import { FastifyPluginAsync } from "fastify";
import fastifyCookie from "@fastify/cookie";

const cookiePlugin: FastifyPluginAsync = async (fastify) => {
	fastify.register(fastifyCookie);
};

export default fp(cookiePlugin);