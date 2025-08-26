import type { Route } from "./+types/home";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ft_transcendance" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
	const navigate = useNavigate();
  return (
    <>
			<div className="relative flex flex-col h-full items-center justify-center overflow-hidden">
    		<div className="bg-red-600 relative z-10 text-center px-4">
						<h1 className="text-4xl font-bold mb-4">ft_transcendance</h1>
						<p>The final project of campus19</p>
						<div className="bg-primary mx-auto w-fit px-4 py-1 hover:bg-secondary hover:cursor-pointer rounded-md transition-colors duration-200">
							<button className="hover:cursor-pointer text-white" onClick={() => navigate("/login")}>Get started</button>
						</div>
    		</div>
			</div>
    </>
  );
}
