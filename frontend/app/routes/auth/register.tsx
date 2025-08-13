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
	<div className="flex flex-col items-center align-center max-w-fit">
		<h1 className="text-3xl font-medium">Register</h1>
		<div className="m-4 flex flex-col align-center gap-4">
			<form method="post" encType="" className="flex flex-col gap-3" onSubmit={submitForm}>
				<p className="bg-gray-200 rounded-md p-2 border-2 border-solid">
					<input name="first_name" placeholder="First Name" className="outline-none" autoCapitalize="on" value={form.first_name} onChange={handleChange}/>
				</p>
				<p className="bg-gray-200 rounded-md p-2 border-2 border-solid">
					<input name="last_name" placeholder="Last Name" className="outline-none" autoCapitalize="on" value={form.last_name} onChange={handleChange}/>
				</p>
				<p className="bg-gray-200 rounded-md p-2 border-2 border-solid">
					<input name="username" placeholder="Username*" className="outline-none" value={form.username} onChange={handleChange} required/>
				</p>
				<p className="bg-gray-200 rounded-md p-2 border-2 border-solid">
					<input name="password" type="password" placeholder="Password*" className="outline-none" value={form.password} onChange={handleChange} required/>
				</p>
				<button type="submit" className="bg-green-400 rounded-md p-2 hover:bg-green-300 hover:cursor-pointer text-center">Register</button>
			</form>
		</div>
	</div>
	)
}

export default Register