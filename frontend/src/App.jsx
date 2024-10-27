import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Yoga from "./components/Yoga/Yoga.jsx";
import View360 from "./components/View360";
import FitData from "./components/FitData";
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";
// import Game from "./components/Game";
import PoseDetectionOverlay from "./components/PoseDetectionOverlay";
import Game from "../src/components/MobilityGame/Game.jsx";
import ScreenRecorder from "./components/ScreenRecorder.jsx";
import Dashboard from "./components/Dashboard.jsx";
// import GamePage from "./components/GamePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage.jsx";
import DoshaQuiz from "../src/components/DoshaQuiz.jsx";
import SudokuGame from "../src/components/SudokuGame/SudokuGame.jsx";
import WordleGame from "./components/Wordle/WordleGame.jsx";
import MemoryCardGame from "./components/MemoryCardGame.jsx";
import CommunityForum from "./components/CommunityForum.jsx";
const YogaRedirect = () => {
  useEffect(() => {
    window.location.href = "http://localhost:5174/start";
  }, []);
  
  return null; // No UI to render
};
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />{" "}
          <Route path="/dashboard" element={<Dashboard />} />{" "}
          <Route path="/sudoku" element={<SudokuGame />} />{" "}
          <Route path="/wordle" element={<WordleGame />} />{" "}
          <Route path="/yoga" element={<YogaRedirect />} />{" "}
          {/* <Route path="/hole-in-wall" element={<sudoku />} />{" "} */}
          <Route path="/catch-the-block" element={<Game />} />{" "}
          <Route path="/dosha-quiz" element={<DoshaQuiz />} />{" "}
          <Route path="/memory-card" element={<MemoryCardGame />} />{" "}
          <Route path="/view360" element={<View360 />} />{" "}
          <Route path="/community" element={<CommunityForum />} />{" "}
          {/* Another example route */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
