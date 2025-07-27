require('dotenv').config();
const axios = require('axios')
import { FastifyInstance, FastifyRequest } from "fastify";

interface DiscordCallbackQuery {
	code?: string;
}

export default async function discord(app: FastifyInstance) {
	app.get('/api/auth/discord/login', async (req, res) => {
		res.redirect('https://discord.com/oauth2/authorize?client_id=1398989102468042923&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=identify')
	})

	app.get('/api/auth/discord/redirect', async (req: FastifyRequest<{ Querystring: DiscordCallbackQuery}>, res) => {
		const { code } = req.query;
		if (!code) throw new Error("No code provided in discord Oauth2 request.");
		const formData = new URLSearchParams({
			client_id: process.env.DISCORD_CLIENT_ID ?? "",
			client_secret: process.env.DISCORD_CLIENT_SECRET ?? "",
			grant_type: 'authorization_code',
			code: code.toString(),
			redirect_uri: process.env.DISCORD_REDIRECT_URL ?? ""
		})

		const response = await axios.post(
			'https://discord.com/api/oauth2/token',
			formData, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept-Encoding': 'application/x-www-form-urlencoded'
				}
			}
		); //store info in database (bearer token, refresh token)
		
		if (!response.data) throw new Error("No data in Discord Oauth2 response")

		const getUserInfo = await axios.get(
			'https://discord.com/api/users/@me',
			{
				headers: {
					Authorization: `Bearer ${response.data.access_token}`
				}
			}
		); //create user with username and avatar
		console.log(getUserInfo.data)
		res.redirect('https://www.google.com');
	})
}
