// src/components/PoseCanvas.js
import React, { useEffect, useRef, useState } from 'react';
import * as posedetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';

const PoseCanvas = ({ detector, onPoseDetected, targetImage }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    };

    startCamera();
    detectPose();
  }, []);

  const detectPose = async () => {
    if (detector && videoRef.current.readyState === 4) {
      const poses = await detector.estimatePoses(videoRef.current);
      if (poses[0]) {
        onPoseDetected(poses[0]);
        drawPose(poses[0]);
      }
    }
    requestAnimationFrame(detectPose);
  };

  const drawPose = (pose) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw the target PNG overlay on the canvas
    const img = new Image();
    img.src = targetImage;
    img.onload = () => {
      ctx.globalAlpha = 0.5; // Make the PNG slightly transparent
      ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    // Draw the player's detected pose
    pose.keypoints.forEach((keypoint) => {
      const { x, y, score } = keypoint;
      if (score > 0.5) {
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
      }
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </div>
  );
};

export default PoseCanvas;
