import { useState } from "react"


const Register = () => {
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
		const res = await fetch("http://localhost:3000/register", {
			method: "POST",
			headers: { "Content-Type": "application/json"},
			body: JSON.stringify(form),
			credentials: "include"
		})
		const data = await res.json();
		console.log(data)
	}

	return (
	<>
		<h1 className="text-3xl font-medium text-center">Make an account</h1>
		<form className="m-auto py-4 w-3/4 flex flex-col gap-3" onSubmit={submitForm}>
				<input name="first_name" placeholder="First Name" id="first_name" onChange={handleChange} className="bg-bg-light w-full rounded-md py-1 px-2 focus:outline-2 focus:outline-accent"/>
				<input name="last_name" placeholder="Last Name" id="last_name" onChange={handleChange} className="bg-bg-light w-full rounded-md py-1 px-2 focus:outline-2 focus:outline-accent"/>
          		<input name="username" placeholder="Username*" id="username" required onChange={handleChange} className="bg-bg-light w-full rounded-md py-1 px-2 focus:outline-2 focus:outline-accent"/>
				<input name="password" type="password" placeholder="Password*" id="password" required onChange={handleChange} className="bg-bg-light w-full rounded-md py-1 px-2 focus:outline-2 focus:outline-accent"/>
				<button type="submit" className="bg-primary text-white rounded-md p-2 hover:opacity-80 transition-opacity duration-200 hover:cursor-pointer text-center">Register</button>
		</form>
			<div className="flex m-auto items-center gap-4">
				<hr className="w-20 border-gray-300"></hr>
				<p>or</p>
				<hr className="w-20 border-gray-300"></hr>
			</div>
			<div className="flex items-center justify-center m-2">
				<a href="http://localhost:3000/api/auth/discord/login">
					<img src='/assets/discord.jpeg' className="h-10 rounded-full hover:opacity-80 transition-opacity"></img>
				</a>
			</div>
	</>
	)
}

export default Register