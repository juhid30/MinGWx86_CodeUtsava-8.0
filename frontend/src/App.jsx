import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Yoga from "./components/Yoga/Yoga.jsx";
import View360 from "./components/View360";
import Login from "./components/Login";
import FitData from "./components/FitData";
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";
// import Game from "./components/Game";
import PoseDetectionOverlay from "./components/PoseDetectionOverlay";
import ScreenRecorder from "./components/ScreenRecorder.jsx";
import NewScreenRecord from "./components/NewScreenRecord.jsx";
import Dashboard from "./components/Dashboard.jsx";
// import Game from "../src/components/MobilityGame/Game.jsx";
// import GamePage from "./components/GamePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Dashboard /> */}
      <LandingPage />
      {/* <div className="bg-red-900">Hello</div> */}
      {/* <GamePage /> */}
      {/* <View360 /> */}
      {/* <Game /> */}
      {/* <MotionDetectionDrums /> */}
      {/* <FallingRodsGame /> */}
      {/* <Yoga /> */}
      {/* <HandTracking /> */}
      {/* <PoseDetectionOverlay /> */}
      {/* <Yoga /> */}
      {/* <ScreenRecorder /> */}
      {/* <NewScreenRecord /> */}
      {/* <Game /> */}
    </>
  );
}

export default App;
