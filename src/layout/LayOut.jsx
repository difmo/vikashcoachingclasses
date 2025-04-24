import React from "react";

import { Outlet } from "react-router-dom";
import Header from "../components/header/Herader";
import Footer from "../components/footer/Footer";

const LayOut = ({ childern }) => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default LayOut;
