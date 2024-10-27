import React, { useRef, useState } from "react";
// import ogImage from "../assets/360img.jpg";
import thadomalentry from "../assets/reception.jpg";
import { Pannellum } from "pannellum-react";
import thadomaloffice from "../assets/thadomaloffice.jpg";
import thadomalSL from "../assets/outCCC.jpg";
import Layout from "./Layout";

const View360 = () => {
  const [currentScene, setCurrentScene] = useState(thadomalentry);
  const [SLCords, setSLCords] = useState({
    yaw: 40,
    pitch: -5,
  });

  // const [officeCords, setOfficeCords] = useState({
  //   yaw: 0,
  //   pitch: -5,
  // });

  return (
    <Layout>
      <div className="h-[100vh]">
        <div className="flex h-full">
          <div className="w-[100%]">
            <Pannellum
              width="100%"
              height="100%"
              image={currentScene}
              yaw={300}
              hfov={140}
              autoLoad
              autoRotate={-4}
              compass={true}
              showZoomCtrl={false}
              mouseZoom={true}
              onLoad={() => {
                console.log("panorama loaded");
              }}
            >
              {/* OFFICE */}
              {/* {currentScene === thadomalentry ||
                currentScene === thadomaloffice ? (
                  <Pannellum.Hotspot
                    type="custom"
                    pitch={officeCords.pitch}
                    yaw={officeCords.yaw}
                    handleClick={() => {
                      setCurrentScene(
                        currentScene === thadomalentry
                          ? thadomaloffice
                          : thadomalentry
                      );
                      setOfficeCords(
                        currentScene === thadomalentry
                          ? { yaw: -10, pitch: -15 }
                          : { yaw: 0, pitch: -5 }
                      );
                    }}
                  />
                ) : null} */}

              {/* SL to Entry and Entry to SL */}
              {currentScene === thadomalentry || currentScene === thadomalSL ? (
                <Pannellum.Hotspot
                  type="custom"
                  pitch={SLCords.pitch}
                  yaw={SLCords.yaw}
                  handleClick={() => {
                    setCurrentScene(
                      currentScene === thadomalentry
                        ? thadomalSL
                        : thadomalentry
                    );
                    setSLCords(
                      currentScene === thadomalentry
                        ? { yaw: 142, pitch: -1 }
                        : { yaw: 40, pitch: -5 }
                    );
                  }}
                />
              ) : null}
            </Pannellum>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default View360;
