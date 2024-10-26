import React, { useState, useEffect, useRef } from "react";
import * as handTrack from "handtrackjs";

const FallingRodsGame = () => {
  const [rods, setRods] = useState([]);
  const [handPosition, setHandPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const detectionRadius = 30;

  const rodLength = 120; // Set the length of the rods (doubled)
  const rodWidth = 30; // Set the width of the rods (doubled)

  useEffect(() => {
    const initHandDetection = async () => {
      const model = await handTrack.load(); // Load the handtrack model
      const video = videoRef.current;

      // Start webcam stream
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        video.srcObject = stream;
        video.play();
      }

      // Process each video frame for hand detection
      const detectHand = async () => {
        const predictions = await model.detect(video); // Detect hands in the video
        if (predictions.length > 0) {
          const { bbox } = predictions[0]; // Get the bounding box of the detected hand
          const x = bbox[0] + bbox[2] / 2; // Center x position of the hand
          const y = bbox[1] + bbox[3] / 2; // Center y position of the hand
          setHandPosition({ x, y });
        }
        requestAnimationFrame(detectHand);
      };
      detectHand();
    };

    initHandDetection();
  }, []);

  useEffect(() => {
    // Create a new rod if there are less than 2
    const createRod = () => {
      if (rods.length < 2) {
        // Ensure only 2 rods on screen
        const rod = {
          x: Math.random() * (window.innerWidth - rodWidth), // Ensure rod is fully visible
          y: 0,
          id: Math.random().toString(36).substr(2, 9),
        };
        setRods((rods) => [...rods, rod]);
      }
    };

    const moveRods = () => {
      setRods(
        (rods) =>
          rods
            .map((rod) => ({ ...rod, y: rod.y + 5 })) // Move rods down
            .filter((rod) => rod.y < window.innerHeight) // Remove rods that are out of bounds
      );
    };

    // Create a rod every 500 milliseconds
    const intervalId = setInterval(() => {
      createRod();
    }, 500);

    const moveIntervalId = setInterval(() => {
      moveRods();
    }, 100);

    return () => {
      clearInterval(intervalId);
      clearInterval(moveIntervalId);
    };
  }, [rods]);

  useEffect(() => {
    rods.forEach((rod) => {
      const dx = handPosition.x - rod.x;
      const dy = handPosition.y - rod.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < detectionRadius) {
        setScore((prevScore) => prevScore + 1);
        setRods((rods) => rods.filter((r) => r.id !== rod.id)); // Remove the rod if detected
      }
    });
  }, [handPosition, rods]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw rods in black
      rods.forEach((rod) => {
        ctx.fillStyle = "black"; // Set rod color to black
        ctx.fillRect(rod.x, rod.y, rodWidth, rodLength); // Use updated width and length
      });

      // Draw detection circle around hand position
      ctx.beginPath();
      ctx.arc(handPosition.x, handPosition.y, detectionRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
      ctx.fill();
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.stroke();

      requestAnimationFrame(render);
    };

    render();
  }, [rods, handPosition]);

  return (
    <div className="relative w-screen h-screen">
      <h1 className="absolute top-5 left-5 text-white text-3xl">
        Score: {score}
      </h1>
      <video
        ref={videoRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0, // Set z-index lower than canvas
          objectFit: "cover",
        }}
        autoPlay
        muted
      />
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="absolute top-0 left-0 z-10" // Set z-index higher than video
      />
    </div>
  );
};

export default FallingRodsGame;
