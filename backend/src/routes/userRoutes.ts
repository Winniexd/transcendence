import { FastifyInstance } from "fastify";
import { queryUser } from "../database";
import { createReadStream, promises } from "fs";
import { join } from "path";

export default function userRoutes(app: FastifyInstance) {
	app.get("/me", { onRequest: [app.authenticate] }, async (req, res) => {
		const userId = req.user.uuid;
		const user = await queryUser('uuid', userId);

		if (!user) return res.status(404).send({ error: "User not found" });
		res.send(user);
	});

	app.get("/avatar", { onRequest: [app.authenticate] }, async (req, res) => {
		const userId = req.user.uuid;
		const user = await queryUser('uuid', userId);

		if (!user) return res.status(404).send({ error: "User not found" });
		const avatarFilePath = join(__dirname, '..', 'avatars', `${user.uuid}.png`);

		try {
			await promises.access(avatarFilePath);
			res.header('Content-Type', 'image/png');
			return res.send(createReadStream(avatarFilePath));
		}
		catch (err) {
			console.log(err)
			res.status(404).send({ error: "Avatar not found" });
		}
	});
}