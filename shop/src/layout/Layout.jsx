import React from "react";
import Header from "./header/Header.jsx";
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="home">
        <div className="page-wrapper">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
