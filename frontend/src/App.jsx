import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Game from "./components/MobilityGame/Game"
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
