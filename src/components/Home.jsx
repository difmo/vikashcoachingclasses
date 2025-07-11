import React from "react";
import MainSlider from "./mainslider/MainSlider";
import Legesy from "./Legesy";
import FAQ from "./FAQ";
import { Helmet } from "react-helmet"; // Consider switching to react-helmet-async for future-proofing

const Home = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>
          Hire the Best Online Private Tutors for Physics, Chemistry, Maths & Biology | P.C.M.B. Tutors
        </title>
        <meta name="google-site-verification" content="E_lsntfktFWor0CLJ5-oipez6gAJ5lvHRX-dOFmj8vw" />
        <meta
          name="description"
          content="Looking for expert online private tutors in Physics, Chemistry, Maths, and Biology? P.C.M.B. Tutors offers personalized tutoring by top educators to boost your academic success. Book your free demo now!"
        />
        <meta name="robots" content="noodp, index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="P.C.M.B. Tutors" />

        {/* Open Graph */}
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Hire the Best Online Private Tutors for Physics, Chemistry, Maths & Biology | P.C.M.B. Tutors"
        />
        <meta
          property="og:description"
          content="Looking for expert online private tutors in Physics, Chemistry, Maths, and Biology? P.C.M.B. Tutors offers personalized tutoring by top educators to boost your academic success. Book your free demo now!"
        />
        <meta property="og:url" content="https://www.pcmbtutors.com/" />
        <meta property="og:site_name" content="P.C.M.B. Tutors" />
        <meta property="og:image" content="https://www.pcmbtutors.com/assets/logo-DsoWFvQT.jpeg" />

        {/* Canonical and icons */}
        <link rel="canonical" href="https://www.pcmbtutors.com/" />
        <link
          rel="shortcut icon"
          href="https://www.pcmbtutors.com/assets/logo-DsoWFvQT.jpeg"
          type="image/x-icon"
        />
        <link
          rel="apple-touch-icon"
          href="https://www.pcmbtutors.com/assets/logo-DsoWFvQT.jpeg"
        />

        {/* Facebook Page ID */}
        <meta property="fb:page_id" content="100075934304530" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@VikaskashyapSir" />
        <meta property="twitter:account_id" content="1807308218143809536" />
        <meta
          property="twitter:title"
          content="Hire the Best Online Private Tutors for Physics, Chemistry, Maths & Biology | P.C.M.B. Tutors"
        />
        <meta
          property="twitter:description"
          content="Looking for expert online private tutors in Physics, Chemistry, Maths, and Biology? P.C.M.B. Tutors offers personalized tutoring by top educators to boost your academic success. Book your free demo now!"
        />
        <meta
          property="twitter:image:src"
          content="https://www.pcmbtutors.com/assets/logo-DsoWFvQT.jpeg"
        />
      </Helmet>

      <MainSlider />
      <Legesy />
      <FAQ />
    </>
  );
};

export default Home;
