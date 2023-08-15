import DataTable from "datatables.net-dt";
import ModalPopUp from "../../components/ModalPopUp/ModalPopUp";
import { Modal } from "@rakan/bootstrap4rtl";
import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { randomPassword, timeago } from "../../helpers/helpers";
import useFormFields from "../../hooks/useFormFields";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  deleteUser,
  updateUser,
  updateUserStatus,
} from "../../features/user/userApiSlice";
import {
  getAllPermissionData,
  setMessageEmpty,
} from "../../features/user/userSlice";
import { tostifyAlert } from "../../utils/tostifyAlert";
import swal from "sweetalert";

const Users = () => {
  const dispatch = useDispatch();
  const { user, role, error, message } = useSelector(getAllPermissionData);
  const [editData, setEditData] = useState({});

  // State for manage for input fields.
  const { input, handleInputChange, setInput, resetForm } = useFormFields({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  // handleRandomPassword.
  const handleRandomPassword = (e) => {
    e.preventDefault();
    setInput((prevState) => ({
      ...prevState,
      password: randomPassword(),
    }));
  };

  // handleCreateUserForm.
  const handleCreateUserForm = (e) => {
    e.preventDefault();
    dispatch(createUser(input));
    resetForm();
  };

  // handleUpdateUserStatus.
  const handleUpdateUserStatus = ({ id, status }) => {
    dispatch(updateUserStatus({ id, status }));
  };

  // handleDeleteUser.
  const handleDeleteUser = (id) => {
    swal({
      title: "Delete permission",
      text: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your file has been deleted!", {
          icon: "success",
        });
        dispatch(deleteUser(id));
      } else {
        swal("Your file is safe!");
      }
    });
  };

  // handleEditUser.
  const handleEditUser = (id) => {
    const oldEditData = user.find((data) => data._id === id);
    setEditData(oldEditData);
  };

  // handleEditInputChange.
  const handleEditInputChange = (e) => {
    setEditData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handleUpdateUserForm.
  const handleUpdateUserForm = (e) => {
    e.preventDefault();
    dispatch(updateUser(editData));
    setEditData({
      name: "",
      email: "",
      role: "-Select-",
      mobile: "",
      gender: "",
    });
  };

  useEffect(() => {
    new DataTable("#dataTable");
  });

  useEffect(() => {
    if (error) {
      tostifyAlert(error, "error");
      dispatch(setMessageEmpty());
    } else {
      tostifyAlert(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [error, message, dispatch]);

  return (
    <>
      <ModalPopUp target="userAddModal" title="Add new user">
        <form onSubmit={handleCreateUserForm}>
          <div className="my-3">
            <label htmlFor="">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="my-3">
            <label htmlFor="">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={input.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="my-3">
            <select
              className="form-control"
              name="role"
              value={input.role}
              onChange={handleInputChange}
            >
              <option value="">-Select-</option>
              {role?.map((item, index) => {
                return (
                  <option value={item._id} key={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="my-3">
            <label htmlFor="">Password</label>
            <input
              type="text"
              className="form-control"
              name="password"
              value={input.password}
              onChange={handleInputChange}
            />
            <a
              className="badge badge-warning"
              style={{ cursor: "pointer" }}
              onClick={handleRandomPassword}
            >
              Random password
            </a>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Create user
          </button>
        </form>
      </ModalPopUp>

      <ModalPopUp target="userEditModal" title="Edit user">
        <form onSubmit={handleUpdateUserForm}>
          <div className="my-3">
            <label htmlFor="">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={editData.name}
              onChange={handleEditInputChange}
            />
          </div>

          <div className="my-3">
            <label htmlFor="">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={editData.email}
              onChange={handleEditInputChange}
            />
          </div>

          <div className="my-3">
            <label htmlFor="">Role</label>
            <select
              className="form-control"
              name="role"
              onChange={handleEditInputChange}
            >
              <option>{editData?.role?.name}</option>
              {role?.map((item, index) => {
                return (
                  <option value={item._id} key={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="my-3">
            <label htmlFor="">Mobile</label>
            <input
              type="text"
              className="form-control"
              name="mobile"
              value={editData.mobile}
              onChange={handleEditInputChange}
            />
          </div>

          <div className="my-3">
            <label htmlFor="">Gender</label>
            <input
              type="text"
              className="form-control"
              name="gender"
              value={editData.gender}
              onChange={handleEditInputChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Update Now
          </button>
        </form>
      </ModalPopUp>

      <PageHeader title="Users" />

      <button
        className="btn btn-primary btn-sm"
        data-target="#userAddModal"
        data-toggle="modal"
      >
        Add new user.
      </button>
      <br />
      <br />

      <div className="row">
        <div className="col-md-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="table-responsive">
                {user && (
                  <table
                    id="dataTable"
                    className="table table-hover table-center mb-0"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>CreatedAt</th>
                        <th>Status</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...user]?.reverse().map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item?.role?.name}</td>
                            <td>{timeago(item.createdAt)}</td>
                            <td>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="status_1"
                                  className="check"
                                  checked={item.status ? true : false}
                                />
                                <label
                                  htmlFor="status_1"
                                  className="checktoggle"
                                  onClick={() =>
                                    handleUpdateUserStatus({
                                      id: item._id,
                                      status: item.status,
                                    })
                                  }
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <td className="text-right">
                              <button
                                className="btn btn-sm btn-warning"
                                data-target="#userEditModal"
                                data-toggle="modal"
                                onClick={() => handleEditUser(item._id)}
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              &nbsp;
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeleteUser(item._id)}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
