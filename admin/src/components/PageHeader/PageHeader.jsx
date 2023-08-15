import React from "react";
import { Link } from "react-router-dom";
import useAuthUser from "../../hooks/useAuthUser";

const PageHeader = ({ title }) => {
  const { user } = useAuthUser();
  return (
    <div>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Wellcome {user?.name}</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">{title}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
