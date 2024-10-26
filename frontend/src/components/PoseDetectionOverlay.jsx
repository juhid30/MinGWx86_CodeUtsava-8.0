import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import * as poseDetection from "@tensorflow-models/pose-detection";

const PoseDetectionOverlay = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [detector, setDetector] = useState(null);
  const [level, setLevel] = useState(1);
  const [isPoseDetected, setIsPoseDetected] = useState(false);
  const overlayBounds = { x: 100, y: 100, width: 200, height: 200 }; // Example overlay bounds

  const setupCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    return new Promise((resolve) => {
      videoRef.current.onloadedmetadata = () => {
        resolve(videoRef.current);
      };
    });
  };

  const detectPose = async () => {
    if (detector && videoRef.current) {
      const poses = await detector.estimatePoses(videoRef.current);
      draw(poses);
    }
  };

  const draw = (poses) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Change overlay color based on detection
    ctx.fillStyle = isPoseDetected
      ? "rgba(0, 255, 0, 0.5)"
      : "rgba(255, 0, 0, 0.5)"; // Green if detected, red otherwise
    ctx.fillRect(
      overlayBounds.x,
      overlayBounds.y,
      overlayBounds.width,
      overlayBounds.height
    );

    // Draw keypoints and check for collision
    let detected = false; // Track detection in this frame
    poses.forEach((pose) => {
      pose.keypoints.forEach((keypoint) => {
        if (keypoint.score > 0.5) {
          // Check if the keypoint is detected
          const { x, y } = keypoint.position;
          ctx.fillStyle = "blue";
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fill();

          // Check if the pose is in the overlay
          if (
            x >= overlayBounds.x &&
            x <= overlayBounds.x + overlayBounds.width &&
            y >= overlayBounds.y &&
            y <= overlayBounds.y + overlayBounds.height
          ) {
            detected = true; // Mark as detected
            setLevel((prevLevel) => prevLevel + 1);
          }
        }
      });
    });
    setIsPoseDetected(detected); // Update state for overlay color
  };

  const init = async () => {
    const video = await setupCamera();
    video.play();

    const poseDetector = await poseDetection.createDetector(
      poseDetection.SupportedModels.PoseNet
    );
    setDetector(poseDetector);

    const detectLoop = () => {
      detectPose();
      requestAnimationFrame(detectLoop);
    };
    detectLoop();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div style={{ position: "relative", width: 640, height: 480 }}>
      <video
        ref={videoRef}
        width={640}
        height={480}
        autoPlay
        muted
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <p>Level: {level}</p>
    </div>
  );
};

export default PoseDetectionOverlay;
