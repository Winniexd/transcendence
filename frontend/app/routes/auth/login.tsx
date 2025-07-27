
const login = () => {
	return (
	<div className="flex flex-col items-center align-center max-w-fit">
		<h1 className="text-3xl font-medium">Login</h1>
		<div className="mt-5 flex flex-col align-center gap-4">
			<p className="bg-gray-200 rounded-md p-2 border-2 border-solid">
				<input placeholder="Username" className="outline-none"/>
			</p>
			<p className="bg-gray-200 rounded-md p-2 border-2 border-solid">
				<input type="password" placeholder="Password" className="outline-none"/>
			</p>
			<button type="submit" className="bg-green-400 rounded-md p-2 hover:bg-green-300 hover:cursor-pointer text-center">Log In</button>
			<div className="flex justify-evenly items-center gap-2">
				<hr className="w-20 border-gray-300"></hr>
				<p>or</p>
				<hr className="w-20 border-gray-300"></hr>
			</div>
			<div className="flex items-center justify-center">
				<a href="http://localhost:3000/api/auth/discord/login">
					<img src='app/assets/discord.jpeg' className="h-10 rounded-full hover:opacity-80 transition-opacity"></img>
				</a>
			</div>
		</div>
	</div>
	)
}

export default login