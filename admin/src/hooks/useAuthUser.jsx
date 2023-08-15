import { useSelector } from "react-redux";
import { getAuthUser } from "../features/auth/authSlice";

const useAuthUser = () => {
  const { user } = useSelector(getAuthUser);

  return { user };
};

export default useAuthUser;
