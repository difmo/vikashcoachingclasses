import React, { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import Header from "../components/header/Herader";
import Footer from "../components/footer/Footer";
import FloatingCallAndWhatsappButtons from "../components/FloatingCallButton";
import Loader from "../components/Loader";

const LayOut = ({ childern }) => { 
   const [isLoading, setIsLoading] = useState(false);

  // Example: set loading manually for demo/testing
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  }, []);
  return (
    <>
      <Header />

      <main>
        <Outlet />
      <Loader isLoading={isLoading} />
      </main>
      <FloatingCallAndWhatsappButtons />
      <Footer />
      {/* vhcghxfchj */}
    </>
  );
};

export default LayOut;
