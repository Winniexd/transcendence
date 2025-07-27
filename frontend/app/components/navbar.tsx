export default function NavBar() {
	return (
		<nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 p-4">
			<div className="mx-auto flex items-center justify-between">
				<a href="/" className="inline-flex gap-2">
					<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="Logo" className="h-7"></img>
					<p className="text-2xl font-semibold text-gray-900 dark:text-white">Transcendance</p>
				</a>
				<div className="flex items-center gap-6 text-gray-700 dark:text-gray-300">
					<a href="#" className="hover:text-sky-500">Play</a>
					<a href="login" className="hover:text-sky-500">Log In</a>
					<div className="bg-sky-700 px-4 py-1 hover:bg-sky-500 rounded-2xl transition-colors"><a href="register">Register</a></div>
				</div>
			</div>
		</nav>
	)
}