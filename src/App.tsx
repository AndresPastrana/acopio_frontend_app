import React from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import { router } from "./routes/Router";
const App = () => {
	return (
		<div>
			<React.StrictMode>
				<AuthProvider>
					<RouterProvider router={router} />
				</AuthProvider>
			</React.StrictMode>
		</div>
	);
};

export default App;
