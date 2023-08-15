import { createBrowserRouter } from "react-router-dom";
import publicRoute from "./publicRoute/publicRoute";
import privateRoute from "./privateRoute/privateRoute";

// Create BrowserRouter.
const router = createBrowserRouter([...publicRoute, ...privateRoute]);

// Export Router.
export default router;
