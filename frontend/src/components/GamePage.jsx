// src/pages/GamePage.js
import React, { useState, useEffect } from 'react';
import PoseCanvas from '../components/PoseCanvas';
import * as posedetection from '@tensorflow-models/pose-detection';

const GamePage = () => {
  const [detector, setDetector] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const loadDetector = async () => {
      const detector = await posedetection.createDetector(
        posedetection.SupportedModels.MoveNet,
        { modelType: 'singlepose' }
      );
      setDetector(detector);
    };

    loadDetector();
  }, []);

  const targetPoseImage = process.env.PUBLIC_URL + '/assets/target-pose.png';

  const calculateScore = (playerPose) => {
    // Logic to calculate alignment score (you can customize this)
    // For example: Compare the player's pose keypoints to target pose
    // If aligned, increase score
    setScore((prevScore) => prevScore + 1);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Align with the Pose!</h1>
      <p>Your Score: {score}</p>
      {detector && (
        <PoseCanvas
          detector={detector}
          onPoseDetected={calculateScore}
          targetImage={targetPoseImage}
        />
      )}
    </div>
  );
};

export default GamePage;
