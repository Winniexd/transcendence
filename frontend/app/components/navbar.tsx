import { useState, useEffect } from "react";

export default function NavBar() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [avatar, setAvatar] = useState('app/assets/pfp.png');
	useEffect(() => {
		const checkAuth = async () => {
			const authRes = await fetch("http://localhost:3000/me", {
				method: "GET",
				credentials: "include"
			})
			setLoggedIn(authRes.ok);
			console.log(authRes);
			if (authRes.ok) {
				const avatarRes = await fetch("http://localhost:3000/avatar", {
					method: "GET",
					credentials: "include"
				});

				console.log(avatarRes)
				if (avatarRes.ok) {
					const blob = await avatarRes.blob();
					const url = URL.createObjectURL(blob);
					setAvatar(url);
					console.log(url);
				}
			}
		}
		checkAuth();
	}, []);

	const logOut = async () => {
		const res = await fetch("http://localhost:3000/logout", {
			method: "POST",
			credentials: "include"
		})

		localStorage.setItem("loggedIn", "false");
		setLoggedIn(false);
	}

	const toggleDropdown = () => {
		const menu = document.getElementById('dropdownMenu');
		menu?.classList.toggle("hidden");
	}

	return (
		<nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 p-4">
			<div className="mx-5 flex items-center justify-between">
				<a href="/" className="inline-flex gap-2">
					<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="Logo" className="h-7"></img>
					<p className="text-2xl font-semibold text-gray-900 dark:text-white">Transcendance</p>
				</a>
				<div className="flex items-center gap-6 text-gray-700 dark:text-gray-300">
					<a href="#" className="hover:text-sky-500">Play</a>
					{loggedIn ? (
						<div className="relative inline-block text-left leading-0">
							<button onClick={toggleDropdown} className="inline-flex justify-center items-center hover:cursor-pointer">
								<img src={avatar} className="size-12 rounded-full" />
								<svg className="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
								</svg>
							</button>
							<div id="dropdownMenu" className="hidden absolute border border-gray-200 divide-y right-0 w-45 text-nowrap shadow-lg">
								<a href="#" className="block px-4 py-2 text-sm bg-black">Profile</a>
								<a href="#" className="block px-4 py-2 text-sm bg-black">Settings</a>
								<button onClick={logOut} className="block px-4 py-2 text-sm bg-black hover:cursor-pointer">Log Out</button>
							</div>
						</div>
					) : (
					<>
						<a href="login" className="hover:text-sky-500">Log In</a>
						<div className="bg-sky-700 px-4 py-1 hover:bg-sky-500 hover:cursor-pointer rounded-2xl transition-colors">
							<a href="register">Register</a>
						</div>
						</>
					)}
				</div>
			</div>
		</nav>
	)
}