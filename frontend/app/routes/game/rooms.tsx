import { useNavigate } from "react-router";

const Rooms = () => {
	const navigate = useNavigate();
	const createRoom = async () => {
		const res = await fetch("http://localhost:3000/createRoom", {
			method: "post",
			credentials: "include",
		})
		console.log(res);
		if (res.ok) {
			const { roomId } = await res.json();
			navigate(`/play/${roomId}`);
		}
	}

	return (
		<div className="flex items-center justify-center h-full">
			<button onClick={createRoom} className="bg-red-400 p-5 hover:bg-black hover:cursor-pointer">Create Room</button>
		</div>
	)
}

export default Rooms;