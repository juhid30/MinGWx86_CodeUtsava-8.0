import React from "react";
import logo from "../assets/logo.png";
const Layout = ({ children }) => {
  return (
    <div className=" h-screen max-w-[100%] flex flex-col">
      <div className=" h-[14.5%] p-4 w-full flex items-center justify-center">
        <div className="h-[100%] w-[90%] rounded-[1.7rem] bg-white shadow-lg flex ">
          <div className="h-full w-[20%] rounded-l-[1.7rem] flex items-center justify-center">
            <img src={logo} width={140} height={140}></img>
          </div>
          <div className="h-full w-[70%]  flex items-center justify-around">
            <div>Home</div>
            <div>Dashboard</div>
            <div>BlockGame</div>
          </div>
          <div className="h-full w-[10%]  rounded-r-[1.7rem] flex items-center justify-center">
            <i class="ri-user-fill text-xl bg-purple-200 p-4 rounded-full"></i>
          </div>
        </div>
      </div>
      <div className=" h-[100%] w-full">{children}</div>
    </div>
  );
};

export default Layout;
