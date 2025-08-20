import {
	type RouteConfig,
	index,
	layout,
	route
} from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	layout("routes/auth/layout.tsx", [
		route("login", "routes/auth/login.tsx"),
		route("register", "routes/auth/register.tsx"),
	]),
	route("play", "routes/game/rooms.tsx"),
	route("play/:roomId", "routes/game/game.tsx")
] satisfies RouteConfig;
