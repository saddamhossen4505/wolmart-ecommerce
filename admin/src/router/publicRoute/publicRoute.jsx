import Forgot from "../../pages/auth/Forgot/Forgot";
import Login from "../../pages/auth/Login/Login";
import Register from "../../pages/auth/Register/Register";
import PublicGuard from "../PublicGuard/PublicGuard";

// Create publicRoute
const publicRoute = [
  {
    element: <PublicGuard />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/forgot",
        element: <Forgot />,
      },
    ],
  },
];

// Export publicRoute.
export default publicRoute;
