import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userAvatar from "../../assets/img/profileAvatar.png";
import PageHeader from "../../components/PageHeader/PageHeader";
import useAuthUser from "../../hooks/useAuthUser";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserPassword,
  userDataUpdate,
} from "../../features/auth/authApiSlice";
import { tostifyAlert } from "../../utils/tostifyAlert";
import { setMessageEmpty } from "../../features/auth/authSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.auth);
  const { user } = useAuthUser();

  // UserDataUpdate State.
  const [detailsModal, setDetailsModal] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    gender: user.gender,
  });

  // HandleInputChange.
  const handleInputChange = (e) => {
    setDetailsModal((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handleUserDataUpdate.
  const handleUserDataUpdate = (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("user"));
    dispatch(userDataUpdate({ id: userData._id, data: detailsModal }));
  };

  // UpdateUserPassword State.
  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  // handlePasswordChange.
  const handlePasswordChange = (e) => {
    setPassword((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // // handleUpdatePasswordForm.
  const handleUpdatePasswordForm = (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("user"));
    dispatch(updateUserPassword({ id: userData._id, data: password }));
    setPassword({
      old_password: "",
      new_password: "",
      confirm_password: "",
    });
  };

  useEffect(() => {
    if (error) {
      tostifyAlert(error, "error");
      dispatch(setMessageEmpty());
    } else {
      tostifyAlert(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [error, message]);

  return (
    <>
      <PageHeader title="Profile" />

      <div className="row">
        <div className="col-md-12">
          <div className="profile-header">
            <div className="row align-items-center">
              <div className="col-auto profile-image">
                <Link to="/profile">
                  <img
                    className="rounded-circle"
                    alt="User Image"
                    src={user?.photo ? user?.photo : userAvatar}
                  />
                </Link>
              </div>
              <div className="col ml-md-n2 profile-user-info">
                <h4 className="user-name mb-0">{user?.name}</h4>
                <h6 className="text-muted">{user?.email}</h6>
                <div className="user-Location">
                  <i className="fa fa-map-marker"></i> Florida, United States
                </div>
                <div className="about-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </div>
              <div className="col-auto profile-btn">
                <Link to="#" className="btn btn-primary">
                  Edit
                </Link>
              </div>
            </div>
          </div>
          <div className="profile-menu">
            <ul className="nav nav-tabs nav-tabs-solid">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#per_details_tab"
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#password_tab">
                  Password
                </a>
              </li>
            </ul>
          </div>
          <div className="tab-content profile-tab-cont">
            <div className="tab-pane fade show active" id="per_details_tab">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title d-flex justify-content-between">
                        <span>Personal Details</span>
                        <a
                          href="#edit_personal_details"
                          className="edit-link"
                          data-toggle="modal"
                        >
                          <i className="fa fa-edit mr-1"></i>Edit
                        </a>
                      </h5>
                      <div className="row">
                        <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                          Name
                        </p>
                        <p className="col-sm-10">{user?.name}</p>
                      </div>
                      <div className="row">
                        <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                          Email ID
                        </p>
                        <p className="col-sm-10">{user?.email}</p>
                      </div>
                      <div className="row">
                        <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                          Gender
                        </p>
                        <p className="col-sm-10">
                          {user?.gender ? user?.gender : "null"}
                        </p>
                      </div>
                      <div className="row">
                        <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                          Mobile
                        </p>
                        <p className="col-sm-10">
                          {user?.mobile ? user?.mobile : "null"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="modal fade"
                    id="edit_personal_details"
                    aria-hidden="true"
                    role="dialog"
                  >
                    <div
                      className="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Personal Details</h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <form onSubmit={handleUserDataUpdate}>
                            <div className="row form-row">
                              <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label>First Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={detailsModal.name}
                                    name="name"
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label>Last Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value="Doe"
                                  />
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-group">
                                  <label>Date of Birth</label>
                                  <div className="cal-icon">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value="24-07-1983"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-group">
                                  <label>Gender</label>
                                  <div className="">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={detailsModal.gender}
                                      name="gender"
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label>Email ID</label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    value={detailsModal.email}
                                    name="email"
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label>Mobile</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={detailsModal.mobile}
                                    name="mobile"
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="col-12">
                                <h5 className="form-title">
                                  <span>Address</span>
                                </h5>
                              </div>
                              <div className="col-12">
                                <div className="form-group">
                                  <label>Address</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value="4663 Agriculture Lane"
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label>City</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value="Miami"
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label>State</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value="Florida"
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label>Zip Code</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value="22434"
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label>Country</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value="United States"
                                  />
                                </div>
                              </div>
                            </div>
                            <button
                              type="submit"
                              className="btn btn-primary btn-block"
                            >
                              Save Changes
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="password_tab" className="tab-pane fade">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Change Password</h5>
                  <div className="row">
                    <div className="col-md-10 col-lg-6">
                      <form onSubmit={handleUpdatePasswordForm}>
                        <div className="form-group">
                          <label>Old Password</label>
                          <input
                            type="text"
                            className="form-control"
                            name="old_password"
                            value={password.old_password}
                            onChange={handlePasswordChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>New Password</label>
                          <input
                            type="text"
                            className="form-control"
                            name="new_password"
                            value={password.new_password}
                            onChange={handlePasswordChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Confirm Password</label>
                          <input
                            type="text"
                            className="form-control"
                            name="confirm_password"
                            value={password.confirm_password}
                            onChange={handlePasswordChange}
                          />
                        </div>
                        <button className="btn btn-primary" type="submit">
                          Save Changes
                        </button>
                      </form>
                    </div>
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

export default ProfilePage;
