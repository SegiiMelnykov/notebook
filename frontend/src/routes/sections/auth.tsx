import { lazy } from "react";
import { Outlet } from "react-router-dom";
// auth
import MainLayout from "src/layouts/main";

// ----------------------------------------------------------------------

// JWT
const JwtLoginPage = lazy(() => import("src/pages/auth/login"));
const JwtRegisterPage = lazy(() => import("src/pages/auth/register"));

export const authRoutes = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "login",
        element: (
          <MainLayout>
            <JwtLoginPage />
          </MainLayout>
        ),
      },
      {
        path: "register",
        element: (
          <MainLayout>
            <JwtRegisterPage />
          </MainLayout>
        ),
      },
    ],
  },
];
