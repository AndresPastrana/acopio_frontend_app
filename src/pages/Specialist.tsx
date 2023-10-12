import { Link, Outlet } from "react-router-dom";
import Dashboard from "../components/Dashboard";

const Specialist = () => {
	return (
		<div>
			<h1>Specialist Page</h1>
			{/* Dashboard */}
			<Dashboard>
				<Link to="producer">Producers</Link>
				<Link to="report">Daily Reports</Link>
				<Link to="stadistic">Stadistics</Link>
			</Dashboard>
			<h2>Children Route</h2>
			<Outlet />
			{/* Children Here */}
		</div>
	);
};

export default Specialist;
