import React from "react";

const Layout = ({ children }) => {
  return (
    <div className=" h-screen w-screen flex flex-col">
      <div className=" h-[14.5%] p-4 w-full flex items-center justify-center">
        <div className="h-[100%] w-[90%] rounded-[1.7rem] bg-white flex ">
          <div className="h-full w-[20%] bg-yellow-50 rounded-l-[1.7rem] flex items-center justify-center">
            Logo
          </div>
          <div className="h-full w-[70%] bg-green-50 flex items-center justify-around">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
          <div className="h-full w-[10%] bg-pink-50 rounded-r-[1.7rem] flex items-center justify-center">
            <i class="ri-user-fill"></i>
          </div>
        </div>
      </div>
      <div className=" h-[100%] w-full">{children}</div>
    </div>
  );
};

export default Layout;
