import { lazy } from "react";
import { Outlet } from "react-router-dom";
// layouts
import MainLayout from "src/layouts/main";

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import("src/pages/home"));
const Page500 = lazy(() => import("src/pages/500"));
const Page403 = lazy(() => import("src/pages/403"));
const Page404 = lazy(() => import("src/pages/404"));
const ComingSoonPage = lazy(() => import("src/pages/coming-soon"));
const MaintenancePage = lazy(() => import("src/pages/maintenance"));
const NoteListPage = lazy(() => import("src/pages/notes/note-list"));
const NotePage = lazy(() => import("src/pages/notes/note"));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "notes",
        children: [
          { element: <NoteListPage />, index: true },
          { path: ":id", element: <NotePage /> },
        ],
      },
      { path: "coming-soon", element: <ComingSoonPage /> },
      { path: "maintenance", element: <MaintenancePage /> },
      { path: "500", element: <Page500 /> },
      { path: "404", element: <Page404 /> },
      { path: "403", element: <Page403 /> },
    ],
  },
];
