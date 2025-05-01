import React from "react";

import { Outlet } from "react-router-dom";
import Header from "../components/header/Herader";
import Footer from "../components/footer/Footer";
import FloatingCallAndWhatsappButtons from "../components/FloatingCallButton";

const LayOut = ({ childern }) => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <FloatingCallAndWhatsappButtons />
      <Footer />
    </>
  );
};

export default LayOut;
