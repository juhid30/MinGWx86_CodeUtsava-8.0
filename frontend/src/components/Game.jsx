import React, { useEffect, useRef, useState } from "react";
import * as handTrack from "handtrackjs"; // Import HandTrack.js

const Game = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isVideo, setIsVideo] = useState(false);
  const [rods, setRods] = useState([]);
  const [score, setScore] = useState(0); // Track the score

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
        });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsVideo(true);
      } catch (error) {
        console.error("Error accessing webcam: ", error);
      }
    };

    loadVideo();
  }, []);

  useEffect(() => {
    const loadModel = async () => {
      try {
        await handTrack.tf.ready();
        const model = await handTrack.load();
        console.log("Model loaded successfully");
        runDetection(model);
      } catch (error) {
        console.error("Error loading handtrack.js model: ", error);
      }
    };

    const drawOverlay = (predictions) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

      // Draw falling rods
      rods.forEach((rod) => {
        ctx.fillStyle = "blue";
        ctx.fillRect(rod.x, rod.y, rod.width, rod.height);
      });

      // Check if the hand is over any rods
      predictions.forEach((prediction) => {
        const handX = prediction.bbox[0];
        const handY = prediction.bbox[1];
        const width = prediction.bbox[2];
        const height = prediction.bbox[3];

        rods.forEach((rod, index) => {
          if (
            handX < rod.x + rod.width &&
            handX + width > rod.x &&
            handY < rod.y + rod.height &&
            handY + height > rod.y
          ) {
            // Increment score and remove rod when the hand touches it
            setScore((prevScore) => prevScore + 1);
            setRods((prevRods) => prevRods.filter((_, i) => i !== index));
          }
        });
      });
    };

    const runDetection = async (model) => {
      const predictions = await model.detect(videoRef.current);
      drawOverlay(predictions); // Draw rods and check hand positions
      requestAnimationFrame(() => runDetection(model));
    };

    if (isVideo) {
      loadModel();
    }
  }, [isVideo, rods]);

  // Function to create falling rods
  const createRod = () => {
    const width = 20; // Width of the rod
    const height = 100; // Height of the rod
    const x = Math.random() * (window.innerWidth - width); // Random x position
    setRods((prevRods) => [...prevRods, { x, y: 0, width, height }]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      createRod(); // Create a new rod every second
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fall = () => {
      setRods(
        (prevRods) => prevRods.map((rod) => ({ ...rod, y: rod.y + 5 })) // Move rods down
      );
    };

    const interval = setInterval(fall, 100); // Move rods every 100ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "auto",
          zIndex: 1,
        }}
        autoPlay
        playsInline
      />
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          color: "white",
          fontSize: "24px",
        }}
      >
        Score: {score}
      </div>
    </div>
  );
};

export default Game;
