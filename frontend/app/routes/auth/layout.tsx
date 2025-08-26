import { Outlet } from 'react-router'

const AuthLayout = () => {
	return (
		<>
			<div className="h-full flex items-center justify-center">
				<div className="flex flex-col justify-center w-1/4 bg-bg-middle rounded-md shadow-md text-text p-4 py-10 border-1 border-text">
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default AuthLayout