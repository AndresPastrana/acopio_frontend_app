import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import { router } from "./routes/Router";
import { Toaster } from "sonner";
const App = () => {
  return (
    <AuthProvider>
      <Toaster />
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
