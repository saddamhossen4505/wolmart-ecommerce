import Layout from "../../layout/Layout";
import Account from "../../pages/account/Account";
import Blog from "../../pages/blog/Blog";
import Cart from "../../pages/cart/Cart";
import Checkout from "../../pages/checkout/Checkout";
import Home from "../../pages/home/Home";
import Shop from "../../pages/shop/Shop";
import SingleProduct from "../../pages/singleProduct/SingleProduct";

// Create publicRoute
const publicRoute = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/shop",
        element: <Shop />,
      },

      {
        path: "/shop/:id",
        element: <SingleProduct />,
      },

      {
        path: "/blog",
        element: <Blog />,
      },

      {
        path: "/cart",
        element: <Cart />,
      },

      {
        path: "/checkout",
        element: <Checkout />,
      },

      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
];

// Export publicRoute.
export default publicRoute;
