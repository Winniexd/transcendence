import { FastifyInstance, FastifyRequest } from "fastify";
import { queryUser, insertData } from "../../database";
interface RegisterBody {
	first_name: string,
	last_name: string,
	username: string,
	password: string
}

interface LoginBody {
	username: string,
	password: string
}

export default function basicAuth(app: FastifyInstance) {
	app.post('/register', async (req: FastifyRequest<{ Body: RegisterBody }>, res) => {
		const { username, password, first_name, last_name } = req.body;
		let user = await queryUser('username', username);
		if (user) {
			return res.status(401).send({ error: "User already exists" })
		}
		user = await insertData('', first_name, last_name, username, password);
		const token = app.jwt.sign({ uuid: user.uuid });
		res.setCookie('token', token, { httpOnly: true });
		res.send({ success: true });
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
		const token = app.jwt.sign({ uuid: user.uuid });
		res.setCookie('token', token, { httpOnly: true });
		res.send({ success: true });
	})

	app.post('/logout', async (req, res) => {
		res.clearCookie('token');
		res.status(200).send('Logged out');
	})
}