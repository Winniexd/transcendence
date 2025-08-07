import fp from 'fastify-plugin'
import { FastifyPluginAsync } from "fastify";

const authPlugin: FastifyPluginAsync = async (fastify) => {
	fastify.decorate("authenticate", async (req, res) => {
		try {
			await req.jwtVerify();
		}
		catch (err: any) {
			res.status(401).send({ error: 'Unauthorized', message: err.message })
		}
	});
};

export default fp(authPlugin);