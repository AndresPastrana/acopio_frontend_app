import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "../components/common/index";
import { Role } from "../types.d";
import { Tanks } from "../components";
import { Routes } from "../components/Route/Route";
import { ProductiveBase } from "../components/ProdcutiveBase/ProductiveBase";
import Users from "../components/Users/Users";
import Producers from "../components/Producers/Producers";
import Stadistics from "../components/Stadistics/Stadistics";
import Reports from "../components/Reportes/Reports";
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
    path: "specialist",
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
      { path: "producers", element: <Producers /> },
      { path: "reports", element: <Reports /> },
      { path: "stadistics", element: <Stadistics /> },
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
      { path: "users", element: <Users /> },
      { path: "prodcutive-bases", element: <ProductiveBase /> },
      { path: "routes", element: <Routes /> },
      { path: "tanks", element: <Tanks /> },
    ],
  },
]);
