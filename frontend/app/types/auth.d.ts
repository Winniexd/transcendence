export type FormType = {
	first_name?: string,
	last_name?: string,
	username: string,
	password: string
}

export type AuthCtxType = {
	loggedIn: boolean;
	logIn: (form: FormType) => Promise<boolean>;
	logOut: () => Promise<void>;
}