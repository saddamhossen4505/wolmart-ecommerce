import PageLayout from "../../components/PageLayout/PageLayout";
import Dashboard from "../../pages/dashboard/Dashboard";
import Permissions from "../../pages/permission/Permission";

import ProfilePage from "../../pages/profile/ProfilePage";
import Roles from "../../pages/role/Role";

import Users from "../../pages/users/Users";
import PrivateGuard from "../privateGuard/privateGuard";

// Create PrivateRoute.
const privateRoute = [
  {
    element: <PrivateGuard />,
    children: [
      {
        element: <PageLayout />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },

          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
          {
            path: "/roles",
            element: <Roles />,
          },
          {
            path: "/permissions",
            element: <Permissions />,
          },
        ],
      },
    ],
  },
];

// Export privateRoute.
export default privateRoute;
