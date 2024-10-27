import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "./utilities";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import Layout from "../Layout";

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
    await tf.ready(); // Ensure TensorFlow is ready

    // Optionally set a backend
    // await tf.setBackend('webgl'); // Uncomment if needed

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
    <Layout>
      <div className="h-full w-full bg-red-50 flex flex-col">
      <div className="flex-grow relative h-full w-full">
        <Webcam
          ref={webcamRef}
          className="absolute inset-0 w-[90vw] h-[80vh] object-cover z-9"
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-[90vw] h-[80vh] z-10"
        />
      </div>
  
      <div className="p-4 text-white text-2xl z-20 bg-black bg-opacity-50">
        SCORE: {clickCount}
      </div>
    </div>
    </Layout>
  );
  
  
};

export default Game;
