import React from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import { router } from "./routes/Router";
import { Toaster } from "sonner";
const App = () => {
  return (
    <div>
      <React.StrictMode>
        <AuthProvider>
          <Toaster />
          <RouterProvider router={router} />
        </AuthProvider>
      </React.StrictMode>
    </div>
  );
};

export default App;
