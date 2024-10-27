import React, { useState, useEffect, useRef } from "react";
import soothingSound from "../assets/soothing.mp3";
import meditationImage from "../assets/medit.png";
import Layout from "./Layout";

const PomodoroMeditation = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // default to 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [selectedTime, setSelectedTime] = useState(25 * 60);
  const audioRef = useRef(new Audio(soothingSound));

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      audioRef.current.pause();
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (!isActive) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const handleTimeChange = (event) => {
    const newTime = parseInt(event.target.value) * 60;
    setSelectedTime(newTime);
    setTimeLeft(newTime);
    setIsActive(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      secs < 10 ? "0" : ""
    }${secs}`;
  };

  return (
    <Layout>
      <div className="flex items-center justify-between h-[85.5vh] bg-gradient-to-br from-purple-200 to-pink-300 p-10">
        {/* Left Side: Timer and Controls */}
        <div className="flex flex-col items-start w-full max-w-md">
          <h2 className="text-4xl font-extrabold text-purple-800 mb-6">
            Pomodoro Meditation
          </h2>
          <div className="mb-4">
            <label className="text-lg font-medium text-purple-700 mr-2">
              Select Time:
            </label>
            <select
              value={selectedTime / 60}
              onChange={handleTimeChange}
              className="bg-white border border-purple-500 text-purple-700 rounded-md px-4 py-2"
            >
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={15}>15 minutes</option>
              <option value={25}>25 minutes</option>
            </select>
          </div>
          <div className="bg-white shadow-xl rounded-xl p-8 w-full">
            <p className="text-6xl font-bold text-purple-700 mb-8">
              {formatTime(timeLeft)}
            </p>
            <button
              onClick={toggleTimer}
              className={`w-full px-8 py-4 font-semibold rounded-lg transition-all transform ${
                isActive
                  ? "bg-red-500 text-white hover:bg-red-600 hover:scale-105"
                  : "bg-purple-500 text-white hover:bg-purple-600 hover:scale-105"
              }`}
            >
              {isActive ? "Pause" : "Start Meditation"}
            </button>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full max-w-xl flex items-center justify-center">
          <img
            src={meditationImage}
            alt="Meditation"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </Layout>
  );
};

export default PomodoroMeditation;
