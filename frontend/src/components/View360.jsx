import React, { useRef, useState } from "react";
// import ogImage from "../assets/360img.jpg";
import thadomalentry from "../assets/amritsar.jpeg";
import { Pannellum } from "pannellum-react";
import thadomaloffice from "../assets/thadomaloffice.jpg";
import thadomalSL from "../assets/thadomalSL.jpeg";
const View360 = () => {
  const [currentScene, setCurrentScene] = useState(thadomalentry);
  const [SLCords, setSLCords] = useState({
    yaw: -35,
    pitch: -5,
  });

  const [officeCords, setOfficeCords] = useState({
    yaw: 0,
    pitch: -5,
  });

  return (
    <>
      <div className="h-[100vh]">
        {/* <Navbar /> */}
        <div className="flex h-[100%]">
          <div className=" w-[92.5%] flex flex-row bg-[#e2d4cb] m-4 shadow-custom rounded">
            <div className=" w-[30%] h-[100%] flex items-center justify-center">
              <h1 className="text-[47px]  pl-10 ">
                Get a<br></br>{" "}
                <span className="text-6xl font-bold ">360° View</span>
                <br></br>
              </h1>
            </div>
            <div className="w-[75%] h-[100%] ">
              <Pannellum
                width="100%"
                height="100%"
                // className="rounded-[1.5rem]"
                image={currentScene}
                yaw={300}
                hfov={140}
                // vfov={00}
                // vOffsect={20}
                autoLoad
                autoRotate={-5}
                compass={true}
                showZoomCtrl={false}
                mouseZoom={true}
                onLoad={() => {
                  console.log("panorama loaded");
                }}
              >
                {/* OFFICE */}
                {currentScene == thadomalentry ||
                currentScene == thadomaloffice ? (
                  <Pannellum.Hotspot
                    type="custom"
                    pitch={officeCords.pitch}
                    yaw={officeCords.yaw}
                    handleClick={() => {
                      setCurrentScene(
                        currentScene == thadomalentry
                          ? thadomaloffice
                          : thadomalentry
                      );
                      setOfficeCords(
                        currentScene == thadomalentry
                          ? { yaw: -10, pitch: -15 }
                          : { yaw: 0, pitch: -5 }
                      );
                    }}
                  />
                ) : (
                  <></>
                )}

                {/* SL to Entry and Entry to SL */}
                {currentScene == thadomalentry || currentScene == thadomalSL ? (
                  <Pannellum.Hotspot
                    type="custom"
                    pitch={SLCords.pitch}
                    yaw={SLCords.yaw}
                    handleClick={() => {
                      setCurrentScene(
                        currentScene == thadomalentry
                          ? thadomalSL
                          : thadomalentry
                      );
                      setSLCords(
                        currentScene == thadomalentry
                          ? { yaw: -10, pitch: -15 }
                          : { yaw: -35, pitch: -5 }
                      );
                    }}
                  />
                ) : (
                  <></>
                )}
              </Pannellum>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default View360;
