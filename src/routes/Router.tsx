import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "../components/common/index";
import { Role } from "../types.d";
import { Tanks } from "../components";
import { Routes } from "../components/Route/Route";
import { ProductiveBase } from "../components/ProdcutiveBase/ProductiveBase";
const AdminPage = lazy(() => import("../pages/Admin"));
const LoginPage = lazy(() => import("../pages/Login"));
const SpecialistPage = lazy(() => import("../pages/Specialist"));
const LandingPage = lazy(() => import("../pages/Landing"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/specialist",
    element: (
      <Suspense>
        <ProtectedRoute
          ToRenderComponet={SpecialistPage}
          role={Role.Specialist}
          fallbackPath="/"
        />
      </Suspense>
    ),
    children: [
      { path: "producers", element: <h1>Producers</h1> },
      { path: "reports", element: <h1>Reports</h1> },
      { path: "stadistics", element: <h1>Stadistics</h1> },
    ],
  },
  {
    path: "admin",
    element: (
      <Suspense>
        <ProtectedRoute
          ToRenderComponet={AdminPage}
          role={Role.Admin}
          fallbackPath="/"
        />
      </Suspense>
    ),
    children: [
      { path: "users", element: <h1>Users</h1> },
      { path: "prodcutive-bases", element: <ProductiveBase /> },
      { path: "routes", element: <Routes /> },
      { path: "tanks", element: <Tanks /> },
    ],
  },
]);
