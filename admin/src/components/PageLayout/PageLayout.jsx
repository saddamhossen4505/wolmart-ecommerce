import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <>
      <div className="main-wrapper">
        <Header />

        <Sidebar />

        <div className="page-wrapper">
          <div className="content container-fluid">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageLayout;
