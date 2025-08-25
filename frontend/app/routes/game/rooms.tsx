import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

const Rooms = () => {
	const navigate = useNavigate();
	const createRoom = async () => {
		const res = await fetch("http://localhost:3000/createRoom", {
			method: "post",
			credentials: "include",
		})
		console.log(res)
		if (res.ok) {
			const { roomId } = await res.json();
			navigate(`/play/${roomId}`);
		}
	}

	const joinRoom = async (roomId: string) => {
		const res = await fetch("http://localhost:3000/joinRoom", {
			method: "post",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ roomId }),
		})
		if (res.ok) {
			navigate(`/play/${roomId}`)
		}
	}

	const [roomList, setRoomList] = useState([]);

	const getRoomList = async () => {
		const res = await fetch("http://localhost:3000/rooms", {
			method: "get",
			credentials: "include",
		})
		console.log(res);
		if (res.ok)
			setRoomList(await res.json())
	}

	useEffect(() => {
		getRoomList();
		const interval = setInterval(getRoomList, 5000);

		return () => clearInterval(interval);
	}, [])

	return (
		<div className="flex flex-col items-center justify-center h-full">
			<ul>
				{roomList.map((room: any) => (
					<div key={room.id} onClick={() => joinRoom(room.id)}>
						Room ID: {room.id} | Players: {room.players.length} / 2
					</div>
				))}
			</ul>
			<button onClick={createRoom} className="bg-red-400 p-5 hover:bg-black hover:cursor-pointer">Create Room</button>
		</div>
	)
}

export default Rooms;