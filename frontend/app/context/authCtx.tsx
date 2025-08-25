import { createContext, useContext, useEffect, useState } from "react";
import type { FormType, AuthCtxType } from "../types/auth";

export const AuthCtx = createContext<AuthCtxType | undefined>(undefined);

export const AuthProvider = ({ children } : { children: React.ReactNode }) => {
	const [loggedIn, setIsloggedIn] = useState<boolean>(false);

	useEffect(() => {
		const checkAuth = async () => {
			const res = await fetch("http://localhost:3000/me", {
				method: "GET",
				credentials: "include"
			});
			if (res.ok)
				setIsloggedIn(true);
		};
		checkAuth();
	}, [])

	const logIn = async (form: FormType): Promise<boolean> => {
		const res = await fetch("http://localhost:3000/login", {
		method: "POST",
		headers: { "Content-Type": "application/json"},
		body: JSON.stringify(form),
		credentials: "include"
		})
		if (res.ok) {
			setIsloggedIn(true);
			return true;
		}
		return false;
	}
		
	const logOut = async (): Promise<void> => {
		const res = await fetch("http://localhost:3000/logout", {
			method: "POST",
			credentials: "include"
		})
		setIsloggedIn(false)
	}

	return (
		<AuthCtx.Provider value={{ loggedIn, logIn, logOut }}>
			{children}
		</AuthCtx.Provider>
	)
}

export const useAuth = () => {
	const ctx = useContext(AuthCtx);
	if (!ctx) throw new Error("useAuth can only be used if wrapped in AuthProvider")
	return ctx;
}