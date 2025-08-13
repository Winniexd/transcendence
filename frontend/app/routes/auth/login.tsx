import { useState } from "react"

const Login = () => {
	const [form, setForm] = useState({
		first_name: "",
		last_name: "",
		username: "",
		password: ""
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [event.target.name]: event.target.value})
	}

	const submitForm = async (event: React.FormEvent) => {
		event.preventDefault();
		const res = await fetch("http://localhost:3000/login", {
			method: "POST",
			headers: { "Content-Type": "application/json"},
			body: JSON.stringify(form),
			credentials: "include"
		})
		const data = await res.json();
		console.log(data)
	}

	return (
	<div className="flex flex-col items-center align-center max-w-fit">
		<h1 className="text-3xl font-medium">Login</h1>
		<form className="m-4 flex flex-col align-center gap-4" onSubmit={submitForm}>
			<p className="bg-gray-200 rounded-md p-2 border-2 border-solid">
				<input name="username" placeholder="Username" className="outline-none" onChange={handleChange}/>
			</p>
			<p className="bg-gray-200 rounded-md p-2 border-2 border-solid">
				<input name="password" type="password" placeholder="Password" className="outline-none" onChange={handleChange}/>
			</p>
			<button type="submit" className="bg-green-400 rounded-md p-2 border-2 border-green-500 hover:bg-green-300 hover:cursor-pointer text-center">Log In</button>
		</form>
			<div className="flex justify-evenly items-center gap-2">
				<hr className="w-20 border-gray-300"></hr>
				<p>or</p>
				<hr className="w-20 border-gray-300"></hr>
			</div>
			<div className="flex items-center justify-center mt-4">
				<a href="http://localhost:3000/api/auth/discord/login">
					<img src='app/assets/discord.jpeg' className="h-10 rounded-full hover:opacity-80 transition-opacity"></img>
				</a>
			</div>
	</div>
	)
}

export default Login