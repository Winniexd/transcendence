require('dotenv').config();
import axios from 'axios';
import { FastifyInstance, FastifyRequest } from "fastify";
import { insertData, queryUser } from '../../database';
import path from 'path'
import fs from 'fs'

interface DiscordCallbackQuery {
	Querystring: {
		code?: string;
	}
}

export default async function discord(app: FastifyInstance) {
	app.get('/api/auth/discord/login', async (req, res) => {
		res.redirect('https://discord.com/oauth2/authorize?client_id=1398989102468042923&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=identify')
	})

	app.get<DiscordCallbackQuery>('/api/auth/discord/redirect', async (req, res) => {
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
		);
		if (!response.data) throw new Error("No data in Discord Oauth2 response")

		const getUserInfo = await axios.get(
			'https://discord.com/api/users/@me',
			{
				headers: {
					Authorization: `Bearer ${response.data.access_token}`
				}
			}
		);
		const { id, username, avatar } = getUserInfo.data;
		let user = await queryUser('discord_id', getUserInfo.data.id);
		if (!user) {
			user = await insertData(
				id,
				'',
				'',
				username,
				''
			)
			const res = await fetch(`https://cdn.discordapp.com/avatars/${id}/${avatar}.png`);
			if (res.ok) {
				try {
					const arrayBuffer = await res.arrayBuffer();
					const buffer = Buffer.from(arrayBuffer);
					const avatarFilePath = path.join(__dirname, '..', '..', 'avatars', `${user.uuid}.png`);
					fs.writeFileSync(avatarFilePath, buffer);
				}
				catch (err) { console.log(err);}
			}
		}
		const token = app.jwt.sign({ uuid: user.uuid });
		res.setCookie('token', token, { httpOnly: true, path: '/' });
		res.redirect("http://localhost:5173");
	})
}
