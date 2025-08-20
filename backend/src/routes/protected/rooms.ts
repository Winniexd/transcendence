import { error } from "console";
import { FastifyInstance } from "fastify";
import { v4 } from "uuid";

interface RoomRequest {
	Body: {
		roomId: string;
	};
}

type Player = {
	id: string;
	score: number;
}

type Room = {
	players: Player[];
	hasPlayer: (id: string) => boolean;
	addPlayer: (player: Player) => void;
	removePlayer: (id: string) => void;
	getPlayer: (id: string) => Player | undefined;
	isFull: () => boolean;
}

const createRoom = (): Room => {
	const players: Player[] = [];

	return {
		players,
		hasPlayer: (id: string) => players.some(p => p.id === id),
		addPlayer: (player: Player) => {
			if (!players.some(p => p.id === player.id))
				players.push(player)
		},
		removePlayer: (id: string) => {
			const idx = players.findIndex(p => p.id === id);
			if (idx !== -1)
				players.slice(idx, 1);
		},
		getPlayer: (id: string) => players.find(p => p.id === id),
		isFull: () => players.length >= 2,
	}
}

export default function RoomRoutes(app: FastifyInstance) {
	const rooms: Record<string, Room> = {};

	app.post("/createRoom", { onRequest: [app.authenticate] }, async (req, res) => {
		if (Object.values(rooms).some(room => room.hasPlayer(req.user.uuid))) {
			return res.status(403).send({ error: "You are already in a room" });
		}
		const roomId = v4();
		rooms[roomId] = createRoom();
		rooms[roomId].addPlayer({ id: req.user.uuid, score: 0 });
		console.log(`Created room ${roomId} and added player ${req.user.uuid}`);
		return res.send({ roomId });
	})

	app.post<RoomRequest>("/joinRoom", { onRequest: [app.authenticate] }, async (req, res) => {
		const { roomId } = req.body;

		if (!rooms[roomId]) return res.status(403).send({ error: "Room doesn't exist"});

		if (Object.values(rooms).some(room => room.hasPlayer(req.user.uuid))) {
			return res.status(403).send({ error: "You are already in a room" });
		}
		
		if (rooms[roomId].isFull()) return res.status(403).send({ error: "Room is full" });

		if (!rooms[roomId].hasPlayer(req.user.uuid)) rooms[roomId].addPlayer({ id: req.user.uuid, score: 0 });

		console.log(`${req.user.uuid} joined room ${roomId}`);
	})

	app.post<RoomRequest>("/leaveRoom", { onRequest: [app.authenticate] }, async (req, res) => {
		const { roomId } = req.body;

		if (!rooms[roomId]) return;
		const idx = rooms[roomId].players.findIndex(p => p.id === req.user.uuid);
		if (idx !== -1) {
			console.log(`Removed player ${rooms[roomId].getPlayer(req.user.uuid)}`);
			rooms[roomId].players.splice(idx, 1);
		}
	})
}