import { Outlet } from 'react-router'

const AuthLayout = () => {
	return (
		<div className="min-h-screen flex justify-center items-center bg-gray-800">
			<div className="flex p-8 rounded-md shadow max-w-xl w-full justify-center text-black bg-white">
				<Outlet />
			</div>
		</div>
	);
};

export default AuthLayout