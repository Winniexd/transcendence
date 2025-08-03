import { FastifyInstance, FastifyRequest } from "fastify";
import { queryUser, insertData } from "../../database";
import { error } from "console";

interface RegisterBody {
	username: string,
	password: string
}

interface LoginBody {
	username: string,
	password: string
}

export default function basicAuth(app: FastifyInstance) {
	app.post('/register', async (req: FastifyRequest<{ Body: RegisterBody }>, res) => {
		const { username, password } = req.body;
		let user = await queryUser('username', username);
		if (!user) {
			user = await insertData('', '', '', username, password);
		}
		const token = app.jwt.sign({username, password});
		res.send(token);
	})

	app.post('/login', async (req: FastifyRequest<{ Body: LoginBody }>, res) => {
		const { username, password } = req.body;
		let user = await queryUser('username', username);
		if (!user) {
			return res.status(401).send({ error: "User not found" });
		}
		if (user.password !== password) {
			return res.status(401).send({ error: "Incorrect password" });
		}
		const token = app.jwt.sign({ uuid: user.uuid })
		res.send(token);
	})
}