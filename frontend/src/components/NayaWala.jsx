// HandTracking.js
import React, { useEffect, useRef, useState } from "react";
import * as handTrack from "handtrackjs";

const HandTracking = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const handImgRef = useRef(null);
  const [model, setModel] = useState(null);
  const [isVideoStarted, setIsVideoStarted] = useState(false);
  const [imgIndex, setImgIndex] = useState(1);

  const modelParams = {
    flipHorizontal: true,
    maxNumBoxes: 20,
    iouThreshold: 0.5,
    scoreThreshold: 0.6,
  };

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await handTrack.load(modelParams);
      setModel(loadedModel);
      console.log("Model loaded:", loadedModel);
      startVideo();
    };

    const startVideo = async () => {
      const video = videoRef.current;
      const status = await handTrack.startVideo(video);
      if (status) {
        console.log("Video started");
        setIsVideoStarted(true);
        detectHands(); // Start detecting hands if video starts successfully
      } else {
        console.error("Please enable video");
      }
    };

    const detectHands = async () => {
      if (model && videoRef.current) {
        const predictions = await model.detect(videoRef.current);
        renderPredictions(predictions);
        requestAnimationFrame(detectHands); // Keep detecting
      }
    };

    const renderPredictions = (predictions) => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before rendering
      model.renderPredictions(predictions, canvas, context, videoRef.current);
    };

    loadModel();

    // Clean up on unmount
    return () => {
      if (isVideoStarted) {
        handTrack.stopVideo(videoRef.current);
      }
    };
  }, [model, isVideoStarted]);

  const nextImage = () => {
    setImgIndex((prevIndex) => (prevIndex % 9) + 1);
    setTimeout(() => {
      runDetectionImage(handImgRef.current);
    }, 500);
  };

  const runDetectionImage = async (img) => {
    if (model) {
      const predictions = await model.detect(img);
      console.log("Predictions: ", predictions);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before rendering
      model.renderPredictions(predictions, canvas, context, img);
    }
  };

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <h1>Hand Tracking with Webcam</h1>
      <video
        ref={videoRef}
        width="640"
        height="480"
        style={{ border: "1px solid black" }}
        autoPlay
      />
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ position: "absolute", left: 0, top: 0 }}
      />
      <div>
        <img
          ref={handImgRef}
          src={`images/${imgIndex}.jpg`}
          className="canvasbox hidden"
          alt=""
          style={{ display: "none" }}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <button onClick={nextImage} disabled={!model}>
          Next Image
        </button>
      </div>
    </div>
  );
};

export default HandTracking;
