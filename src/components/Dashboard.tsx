// This component will reacive a list of Options to show in the dashboard
// In our case the childrens will be Link

// type Props ={
//     children:
// }
const Dashboard = ({ children }) => {
	return (
		<div className="p-5 bg-slate-500">
			<h1>Dashboard</h1>
			<div className="flex flex-col">{children}</div>
		</div>
	);
};

export default Dashboard;
