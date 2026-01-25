import React, { useEffect, useState } from "react";
import SplashIcon from "../assets/app.png";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  return (
    <div className="bg-white flex flex-col w-screen h-screen items-center justify-center">
      <div className="w-60 lg:w-96">
        <img src={SplashIcon} alt="School Care" />
      </div>
    </div>
  );
};

export default Splash;
