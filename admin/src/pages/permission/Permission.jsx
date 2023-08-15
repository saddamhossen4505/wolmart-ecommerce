import DataTable from "datatables.net-dt";
import ModalPopUp from "../../components/ModalPopUp/ModalPopUp";
import { Modal } from "@rakan/bootstrap4rtl";
import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import {
  createPermission,
  deletePermission,
  updatePermission,
  updatePermissionStatus,
} from "../../features/user/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPermissionData,
  setMessageEmpty,
} from "../../features/user/userSlice";
import { tostifyAlert } from "../../utils/tostifyAlert";
import swal from "sweetalert";
import useFormFields from "../../hooks/useFormFields";
import { timeago } from "../../helpers/helpers";

const Permissions = () => {
  const dispatch = useDispatch();
  const { permission, error, message } = useSelector(getAllPermissionData);
  const { input, handleInputChange, resetForm } = useFormFields({
    name: "",
  });

  // Handle add new permission form.
  const handlePermissionAddForm = (e) => {
    e.preventDefault();
    dispatch(createPermission(input));
    resetForm();
  };

  // Get permissionEditData.
  const [editData, setEditData] = useState({});

  // Handle inputChange.
  const handleEditInputChange = (e) => {
    setEditData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //handleUpdatePermission.
  const handleUpdatePermission = (id) => {
    setEditData(permission.find((data) => data._id === id));
  };

  // handleUpdateEditForm.
  const handleUpdateEditForm = (e) => {
    e.preventDefault();
    dispatch(updatePermission({ id: editData._id, data: editData }));
    setEditData({
      name: "",
    });
  };

  // handleDeletePermission.
  const handleDeletePermission = (id) => {
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
        dispatch(deletePermission(id));
      } else {
        swal("Your file is safe!");
      }
    });
  };

  // handlePermissionStatusUpdate.
  const handlePermissionStatusUpdate = (id, status) => {
    dispatch(updatePermissionStatus({ id, status }));
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
      <ModalPopUp target="permissionsAddModal" title="Add new permission.">
        <form onSubmit={handlePermissionAddForm}>
          <div className="my-3">
            <label>Permission name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-3">
            <button type="submit" className="btn btn-primary w-100">
              Add new permission
            </button>
          </div>
        </form>
      </ModalPopUp>

      <ModalPopUp target="permissionsEditModal" title="Edit permission.">
        <form onSubmit={handleUpdateEditForm}>
          <div className="my-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={editData.name}
              onChange={handleEditInputChange}
            />
          </div>
          <div className="my-3">
            <button type="submit" className="btn btn-primary w-100">
              Edit now
            </button>
          </div>
        </form>
      </ModalPopUp>

      <PageHeader title="Permissions" />

      <button
        className="btn btn-primary btn-sm"
        data-target="#permissionsAddModal"
        data-toggle="modal"
      >
        Add new Permission.
      </button>
      <br />
      <br />

      <div className="row">
        <div className="col-md-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="table-responsive">
                {permission && (
                  <table
                    id="dataTable"
                    className="table table-hover table-center mb-0"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...permission]?.reverse().map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.slug}</td>
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
                                  for="status_1"
                                  className="checktoggle"
                                  onClick={() =>
                                    handlePermissionStatusUpdate(
                                      item._id,
                                      item.status
                                    )
                                  }
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-warning"
                                data-target="#permissionsEditModal"
                                data-toggle="modal"
                                onClick={() => handleUpdatePermission(item._id)}
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              &nbsp;
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeletePermission(item._id)}
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

export default Permissions;
