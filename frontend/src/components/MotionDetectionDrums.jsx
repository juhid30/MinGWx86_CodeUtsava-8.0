import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const MotionDetectionDrums = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [rods, setRods] = useState([]); // State for rods
  const [drumCounts, setDrumCounts] = useState(0);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const circleRef = useRef({ x: 0, y: 0 }); // Circle position
  const lastTimeRef = useRef(Date.now()); // For timing the average calculation

  useEffect(() => {
    if (isCameraOn) {
      startWebcam();
      startRodGeneration();
      startMotionDetection();
    } else {
      stopWebcam();
    }

    return () => stopWebcam();
  }, [isCameraOn]);

  const startWebcam = () => {
    console.log("Camera started");
  };

  const stopWebcam = () => {
    console.log("Camera stopped");
  };

  const startRodGeneration = () => {
    const generateRods = () => {
      setRods((prevRods) => [
        ...prevRods,
        { id: Date.now(), x: Math.random() * 600, y: 0, height: 50 },
      ]);

      // Remove rods after a certain time (e.g., 2 seconds)
      setTimeout(() => {
        setRods((prevRods) => prevRods.filter((rod) => rod.y < 480)); // Keep only rods that are still falling
      }, 2000);
    };

    const interval = setInterval(generateRods, 2000); // Generate a rod every 2 seconds

    return () => clearInterval(interval);
  };

  const startMotionDetection = () => {
    const context = canvasRef.current.getContext("2d");
    console.log("Motion detection started");

    const update = () => {
      drawCircles(context);
      moveRods(); // Move rods down
      checkOverlap(); // Check for overlaps
      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  const drawCircles = (context) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear the canvas

    // Draw each rod
    rods.forEach((rod) => {
      context.fillStyle = "rgba(0, 0, 255, 0.5)"; // Rod color
      context.fillRect(rod.x, rod.y, 10, rod.height); // Draw the rod
    });

    // Draw the moving circle (tracked by hand)
    context.beginPath();
    context.arc(circleRef.current.x, circleRef.current.y, 30, 0, Math.PI * 2);
    context.fillStyle = "rgba(255, 0, 0, 0.5)"; // Circle color
    context.fill();
    context.closePath();
  };

  const moveRods = () => {
    setRods(
      (prevRods) => prevRods.map((rod) => ({ ...rod, y: rod.y + 2 })) // Move each rod down
    );
  };

  const checkOverlap = () => {
    const updatedRods = rods.filter((rod) => {
      const circle = circleRef.current;

      // Check if the circle overlaps with the rod
      const isOverlapping =
        circle.x + 30 > rod.x &&
        circle.x - 30 < rod.x + 10 &&
        circle.y + 30 > rod.y &&
        circle.y - 30 < rod.y + rod.height;

      if (isOverlapping) {
        setDrumCounts((prevCount) => prevCount + 1); // Increment count
        return false; // Remove rod if it is caught
      }
      return true; // Keep rod if not caught
    });

    setRods(updatedRods);
  };

  const handleWebcamToggle = () => {
    setIsCameraOn((prev) => !prev);
  };

  const handleMouseMove = (e) => {
    // Update circle position based on mouse movement (simulate hand tracking)
    circleRef.current.x = e.clientX;
    circleRef.current.y = e.clientY;
  };

  return (
    <div id="motion-app" className="relative" onMouseMove={handleMouseMove}>
      <div className="form-control webcam-start" id="webcam-control">
        <label className="form-switch">
          <input
            type="checkbox"
            checked={isCameraOn}
            onChange={handleWebcamToggle}
          />
          <i></i>
          <span id="webcam-caption">
            {isCameraOn ? "Webcam On" : "Click to Start Webcam"}
          </span>
        </label>
      </div>
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "user" }}
        style={{
          display: isCameraOn ? "block" : "none",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{
          display: isCameraOn ? "block" : "none",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none", // Disable interaction with the canvas
        }}
      />
      <div id="counts-display">{`Caught Rods Count: ${drumCounts}`}</div>
    </div>
  );
};

export default MotionDetectionDrums;
