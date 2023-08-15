import Home from "../../pages/home/Home";
import Shop from "../../pages/shop/Shop";

// Create publicRoute
const publicRoute = [
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/shop",
    element: <Shop />,
  },
];

// Export publicRoute.
export default publicRoute;
