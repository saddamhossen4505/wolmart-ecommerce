import DataTable from "datatables.net-dt";
import ModalPopUp from "../../components/ModalPopUp/ModalPopUp";
import { Modal } from "@rakan/bootstrap4rtl";
import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPermissionData,
  setMessageEmpty,
} from "../../features/user/userSlice";
import { tostifyAlert } from "../../utils/tostifyAlert";
import {
  createRole,
  deleteRole,
  updateRole,
  updateRoleStatus,
} from "../../features/user/userApiSlice";
import { timeago } from "../../helpers/helpers";
import useFormFields from "../../hooks/useFormFields";
import swal from "sweetalert";

const Roles = () => {
  const dispatch = useDispatch();
  const { permission, role, error, message } =
    useSelector(getAllPermissionData);

  // useFormFields.
  const { input, handleInputChange, resetForm } = useFormFields({
    name: "",
  });

  // state for role edit.
  const [editData, setEditData] = useState({});

  // State for checkbox.
  const [checkValue, setCheckValue] = useState([]);

  // handleCheckBoxValue.
  const handleCheckBoxValue = (e) => {
    // Get value.
    const val = e.target.value;
    // Now get updated value.
    const updatedValue = [...checkValue];

    // Now check previous value check or uncheck.
    if (updatedValue.includes(val)) {
      updatedValue.splice(updatedValue.indexOf(val), 1);
    } else {
      updatedValue.push(val);
    }

    // Now updatedValue send to checkValue.
    setCheckValue(updatedValue);
  };

  // handleCreateRole.
  const handleCreateRole = (e) => {
    e.preventDefault();

    dispatch(
      createRole({
        name: input.name,
        permissions: [...checkValue],
      })
    );
    resetForm();
    setCheckValue([]);
  };

  // handleStatusUpdate.
  const handleStatusUpdate = ({ id, status }) => {
    dispatch(updateRoleStatus({ id, status }));
  };

  // handleDeleteRole.
  const handleDeleteRole = (id) => {
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
        dispatch(deleteRole(id));
      } else {
        swal("Your file is safe!");
      }
    });
  };

  // handleRoleEditData.
  const handleRoleEditData = (id) => {
    const oldEditData = role.find((data) => data._id === id);
    setEditData(oldEditData);
    setCheckValue(oldEditData.permissions);
  };

  // handleRoleEditInputChange.
  const handleRoleEditInputChange = (e) => {
    setEditData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handleUpdateRoleForm.
  const handleUpdateRoleForm = (e) => {
    e.preventDefault();
    dispatch(
      updateRole({
        id: editData._id,
        name: editData.name,
        permissions: checkValue,
      })
    );

    setEditData({ name: "" });
    setCheckValue([]);
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

  useEffect(() => {
    new DataTable("#dataTable");
  });

  return (
    <>
      <ModalPopUp target="rolesAddModal" title="Add new role">
        <form onSubmit={handleCreateRole}>
          <div className="my-3">
            <label>Role name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="my-3">
            <label>Permissions</label>
          </div>

          <div className="my-3">
            {permission?.map((item, index) => {
              return (
                <label className="d-block" key={index}>
                  <input
                    type="checkbox"
                    value={item.name}
                    checked={checkValue.includes(item.name)}
                    onChange={handleCheckBoxValue}
                  />
                  {item.name}
                </label>
              );
            })}
          </div>
          <div className="my-3">
            <button type="submit" className="btn btn-primary w-100">
              Add new role
            </button>
          </div>
        </form>
      </ModalPopUp>

      <ModalPopUp target="roleEditModal" title="Update role">
        <form onSubmit={handleUpdateRoleForm}>
          <div className="my-3">
            <label>Role name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={editData.name}
              onChange={handleRoleEditInputChange}
            />
          </div>

          <div className="my-3">
            <label>Permissions</label>
          </div>

          <div className="my-3">
            {permission?.map((data, index) => {
              return (
                <label className="d-block" key={index}>
                  <input
                    type="checkbox"
                    value={data.name}
                    checked={checkValue?.includes(data.name)}
                    onChange={handleCheckBoxValue}
                  />
                  {data.name}
                </label>
              );
            })}
          </div>

          <div className="my-3">
            <button type="submit" className="btn btn-primary w-100">
              Add new role
            </button>
          </div>
        </form>
      </ModalPopUp>

      <PageHeader title="Roles" />

      <button
        className="btn btn-primary btn-sm"
        data-target="#rolesAddModal"
        data-toggle="modal"
      >
        Add new role.
      </button>
      <br />
      <br />

      <div className="row">
        <div className="col-md-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="table-responsive">
                {role && (
                  <table
                    id="dataTable"
                    className="table table-hover table-center mb-0"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Permission</th>
                        <th>Status</th>
                        <th>CreatedAt</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...role]?.reverse().map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.slug}</td>
                            <td>
                              <ul>
                                {item.permissions.map((per, index) => {
                                  return <li key={index}>{per}</li>;
                                })}
                              </ul>
                            </td>
                            <td>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="status_1"
                                  className="check"
                                  checked={item.status ? true : false}
                                />
                                <label
                                  onClick={() =>
                                    handleStatusUpdate({
                                      id: item._id,
                                      status: item.status,
                                    })
                                  }
                                  for="status_1"
                                  className="checktoggle"
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <td>{timeago(item.createdAt)}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-warning"
                                data-target="#roleEditModal"
                                data-toggle="modal"
                                onClick={() => handleRoleEditData(item._id)}
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              &nbsp;
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeleteRole(item._id)}
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

export default Roles;
