import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logoWhite from "../../../assets/img/logo-white.png";
import { useEffect, useState } from "react";
import { loginUser } from "../../../features/auth/authApiSlice";
import { tostifyAlert } from "../../../utils/tostifyAlert";
import { setMessageEmpty } from "../../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { error, message, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  // HandleInputChange.
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // HandleLoginForm.
  const handleLoginForm = (e) => {
    e.preventDefault();
    dispatch(loginUser(input));
    setInput({
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    if (error) {
      tostifyAlert(error, "warning");
      dispatch(setMessageEmpty());
    }

    if (message) {
      tostifyAlert(message, "success");
      dispatch(setMessageEmpty());
    }

    if (user) {
      navigate("/");
    }
  }, [error, message, user]);

  return (
    <>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img className="img-fluid" src={logoWhite} alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>Login</h1>
                  <p className="account-subtitle">Access to our dashboard</p>

                  <form onSubmit={handleLoginForm}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={input.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Password"
                        name="password"
                        value={input.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                  </form>

                  <div className="text-center forgotpass">
                    <Link to="/forgot">Forgot Password?</Link>
                  </div>
                  <div className="login-or">
                    <span className="or-line"></span>
                    <span className="span-or">or</span>
                  </div>

                  <div className="text-center dont-have">
                    Don’t have an account? <Link to="/register">Register</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
