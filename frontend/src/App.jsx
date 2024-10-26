import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Yoga from "./components/Yoga";
import View360 from "./components/View360";
import MotionDetectionDrums from "./components/MotionDetectionDrums";
import FallingRodsGame from "./components/FallingRodsGame";
import Game from "./components/Game";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <div className="bg-red-900">Hello</div> */}
      {/* <Yoga /> */}
      <View360 />
      {/* <Game /> */}
      {/* <MotionDetectionDrums /> */}
      {/* <FallingRodsGame /> */}
    </>
  );
}

export default App;
