import { useState, useEffect } from "react"
import { useParams } from "react-router";

const Game = () => {
	const [leftPaddleY, setLeftPaddleY] = useState(0);
	const [rightPaddleY, setRightPaddleY] = useState(0);
	const { roomId } = useParams();

	useEffect(() => {
		const leaveRoom = () => {
			const blob = new Blob([JSON.stringify({ roomId })], {
  				type: "application/json",
			});	
			navigator.sendBeacon("http://localhost:3000/leaveRoom", blob)
		}
		
		window.addEventListener('beforeunload', leaveRoom);
		return () => {
			window.removeEventListener('beforeunload', leaveRoom);
		}
	}, [roomId, location])

	useEffect(() => {
		const keyDownHandler = (e: KeyboardEvent) => {
			const step = 20;
			switch (e.key.toLowerCase()) {
				case 'w':
					setLeftPaddleY((curr) => Math.max(curr - step, -400))
					break;
				case 's':
					setLeftPaddleY((curr) => Math.min(curr + step, 400))
					break;
				case 'arrowup':
					setRightPaddleY((curr) => Math.max(curr - step, -400))
					break;
				case 'arrowdown':
					setRightPaddleY((curr) => Math.min(curr + step, 400))
					break;
				default:
					break;
			}
		}
		window.addEventListener("keydown", keyDownHandler);
		return () => window.removeEventListener("keydown", keyDownHandler);
	}, []);

	return (
		<>
			
			<div className="flex h-full border-4 items-center justify-between px-4">
				<div id="leftPaddle" className="bg-white h-1/4 w-2" style={{ transform: `translateY(${leftPaddleY}px)` }}></div>
				<div id="ball" className="bg-white h-4 w-4 m-auto"></div>
				<div id="rightPaddle" className="bg-white h-1/4 w-2" style={{ transform: `translateY(${rightPaddleY}px)` }}></div>
			</div>
		</>
	)
}

export default Game;