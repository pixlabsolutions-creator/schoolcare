import React, { useEffect, useState } from "react";
import SplashIcon from "../assets/app.png";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-3">
        <img src={SplashIcon} alt="School Care" />
      </div>
    </div>
  );
};

export default Splash;
