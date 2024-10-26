import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "./utilities";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, off } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfEMLR9HIwLe7E25Do5Jy1VwlW4_zCFuc",
  authDomain: "codeutsava-45dda.firebaseapp.com",
  projectId: "codeutsava-45dda",
  storageBucket: "codeutsava-45dda.appspot.com",
  messagingSenderId: "125053951590",
  appId: "1:125053951590:web:f00bbb580ca546b16057a7",
  measurementId: "G-38Z99K1GNL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const Game = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [clickCount, setClickCount] = useState(0);

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log(net);
    console.log("handpose loaded");

    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await net.estimateHands(video);
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  useEffect(() => {
    runHandpose();

    // Firebase: Listen for changes in clickCount
    const clickCountRef = ref(database, "clickCount");
    const unsubscribe = onValue(clickCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setClickCount(data);
      }
    });

    // Cleanup listener on unmount
    return () => {
      unsubscribe(); // Clean up the listener
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-red-50">
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 10,
          width: 640,
          height: 480,
        }}
      />

      {/* Display clickCount */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          color: "black",
          fontSize: "24px",
          zIndex: 69,
        }}
      >
        Click Count: {clickCount}
      </div>
    </div>
  );
};

export default Game;
