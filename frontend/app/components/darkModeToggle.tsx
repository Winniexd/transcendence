import { useLayoutEffect, useState } from "react";

export default function DarkModeToggle() {
	const [darkMode, setDarkMode] = useState(false);
	
	useLayoutEffect(() => {
		const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		setDarkMode(isDark);
	}, [])

	const toggleDarkMode = () => {
		const root = document.documentElement
		setDarkMode(!darkMode);
		root.classList.toggle("dark", !darkMode)
	}

	return (
		<button onClick={toggleDarkMode} className="text-text">
			{darkMode ? "DARK": "LIGHT"}
		</button>
	)
}