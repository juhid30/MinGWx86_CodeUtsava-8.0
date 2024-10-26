import React from "react";
import Layout from "./Layout";

const LandingPage = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center h-full w-full">
        <div className="h-full w-[60%] bg-yellow-200 flex items-center">
          <div className="w-[100%] h-[70%] py-[10%] pl-5">
            <div className="pills flex gap-4 w-[60%] mb-4">
              <div className="border-2 border-red-400 flex items-center justify-center rounded-[1.8rem] px-4 py-1">
                Balance
              </div>
              <div className="border-2 border-red-400 flex items-center justify-center rounded-[1.8rem] px-4 py-1">
                Balance
              </div>
              <div className="border-2 border-red-400 flex items-center justify-center rounded-[1.8rem] px-4 py-1">
                Balance
              </div>
              <div className="border-2 border-red-400 flex items-center justify-center rounded-[1.8rem] px-4 py-1">
                Balance
              </div>
            </div>
            <div className="main-heading text-[3.0rem] leading-[3.5rem] font-bold text-wrap">
              Enhancing Health and Fitness for an Improved Lifestyle
            </div>
            <div className="sub-heading text-[1.4rem]">
              Empowering Your Journey!
            </div>
            <div className="buttons"></div>
          </div>
          {/* Balance
Mobility
Strength
Flexibility */}
        </div>
        <div className="h-full w-[40%] bg-green-200"></div>
      </div>
    </Layout>
  );
};

export default LandingPage;
