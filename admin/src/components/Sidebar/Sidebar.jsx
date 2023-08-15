import React from "react";
import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../../hooks/useAuthUser";

const Sidebar = () => {
  const { user } = useAuthUser();
  const location = useLocation();
  return (
    <>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Main</span>
              </li>
              {user?.role?.permissions?.includes("Dashboard") && (
                <li className={`${location.pathname === "/" ? "active" : ""}`}>
                  <Link to="/">
                    <i className="fe fe-home"></i> <span>Dashboard</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Orders") && (
                <li
                  className={`${
                    location.pathname === "/orders" ? "active" : ""
                  }`}
                >
                  <Link to="/">
                    <i className="fe fe-home"></i> <span>Orders</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Products") && (
                <li
                  className={`${
                    location.pathname === "/products" ? "active" : ""
                  }`}
                >
                  <Link to="/">
                    <i className="fe fe-home"></i> <span>Products</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Category") && (
                <li
                  className={`${
                    location.pathname === "/category" ? "active" : ""
                  }`}
                >
                  <Link to="/">
                    <i className="fe fe-home"></i> <span>Category</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Tags") && (
                <li
                  className={`${location.pathname === "/tags" ? "active" : ""}`}
                >
                  <Link to="/">
                    <i className="fe fe-home"></i> <span>Tags</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Brands") && (
                <li
                  className={`${
                    location.pathname === "/brands" ? "active" : ""
                  }`}
                >
                  <Link to="/">
                    <i className="fe fe-home"></i> <span>Brands</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Users") && (
                <li
                  className={`${
                    location.pathname === "/users" ? "active" : ""
                  }`}
                >
                  <Link to="/users">
                    <i className="fe fe-users"></i> <span>Users</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Profile") && (
                <li
                  className={`${
                    location.pathname === "/profile" ? "active" : ""
                  }`}
                >
                  <Link to="/profile">
                    <i className="fe fe-user-plus"></i> <span>Profile</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Roles") && (
                <li
                  className={`${
                    location.pathname === "/roles" ? "active" : ""
                  }`}
                >
                  <Link to="/roles">
                    <i className="fa fa-anchor"></i> <span>Roles</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Permissions") && (
                <li
                  className={`${
                    location.pathname === "/permissions" ? "active" : ""
                  }`}
                >
                  <Link to="/permissions">
                    <i className="fe fe-lock"></i> <span>Permissions</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
