import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Yoga from "./components/Yoga";
import View360 from "./components/View360";
import MotionDetectionDrums from "./components/MotionDetectionDrums";
import FallingRodsGame from "./components/FallingRodsGame";
import Game from "./components/Game";
import Login from "./components/Login";
import FitData from "./components/FitData";
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";
import Game from "./components/Game";
import GamePage from "./components/GamePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <div className="bg-red-900">Hello</div> */}
      <Game />
    </>
  );
}

export default App;
