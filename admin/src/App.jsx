import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUserData } from "./features/auth/authApiSlice";
import {
  getAllPermission,
  getAllRole,
  getAllUser,
} from "./features/user/userApiSlice";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getLoggedInUserData());
    }
  }, []);

  useEffect(() => {
    dispatch(getAllPermission());
    dispatch(getAllRole());
    dispatch(getAllUser());
  });

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
