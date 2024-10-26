import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Yoga from "./components/Yoga";
import Login from "./components/Login";
import FitData from "./components/FitData";
import View360 from "./components/View360";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <div className="bg-red-900">Hello</div> */}
      <View360 />
    </>
  );
}

export default App;
