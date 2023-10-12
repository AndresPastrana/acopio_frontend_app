import { Link, Outlet } from "react-router-dom";
import Dashboard from "../components/Dashboard";
const Admin = () => {
	return (
		<div>
			<h1>Admin Page</h1>
			{/* Dashboard */}
			<h2>Dashborad</h2>
			<Dashboard>
				<Link to="user">Users</Link>
				<Link to="prodcutive-base">Productive Bases</Link>
				<Link to="route">Route</Link>
				<Link to="tank">Tanks</Link>
			</Dashboard>
			<Outlet />
			{/* Children Here */}
		</div>
	);
};

export default Admin;
