import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="bg-image w-screen h-screen">
      <div className="bg-opacity-10 bg-black w-screen h-screen absolute"></div>
      <div className="flex justify-center items-center w-screen h-screen z-10 absolute">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
