import { Navigate, useRoutes, Outlet } from 'react-router-dom';
// layouts
import MainLayout from 'src/layouts/main';
// config
// import { PATH_AFTER_LOGIN } from 'src/config-global';
//
import { mainRoutes, HomePage } from './main';
import { authRoutes } from './auth';
import Page404 from 'src/pages/404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // SET INDEX PAGE WITH SKIP HOME PAGE
    // {
    //   path: '/',
    //   element: <Navigate to={PATH_AFTER_LOGIN} replace />,
    // },

    // ----------------------------------------------------------------------

    // SET INDEX PAGE WITH HOME PAGE
    {
      path: '/',
      element: (
        <MainLayout>
          <Outlet />
        </MainLayout>
      ),
      children: [{ element: <HomePage />, index: true }],
    },

    // Auth routes
    ...authRoutes,

    // Main routes
    ...mainRoutes,

    // No match 404
    { path: '*', element: <Page404  /> },
  ]);
}
