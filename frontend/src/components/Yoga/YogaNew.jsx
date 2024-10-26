import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { count } from "../../utils/music";
import Instructions from "../Instruction";
import DropDown from "../DropDown";
import { poseImages } from "../../utils/pose_images";
import { POINTS, keypointConnections } from "../../utils/data";
import { drawPoint, drawSegment } from "../../utils/helper";

let skeletonColor = "rgb(255,255,255)";
let poseList = [
  "Tree",
  "Chair",
  "Cobra",
  "Warrior",
  "Dog",
  "Shoulderstand",
  "Triangle",
];

let interval;
let flag = false;

function Yoga() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [startingTime, setStartingTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [poseTime, setPoseTime] = useState(0);
  const [bestPerform, setBestPerform] = useState(0);
  const [currentPose, setCurrentPose] = useState("Tree");
  const [isStartPose, setIsStartPose] = useState(false);
  const [isPoseCorrect, setIsPoseCorrect] = useState(false);

  useEffect(() => {
    const timeDiff = (currentTime - startingTime) / 1000;
    if (flag) {
      setPoseTime(timeDiff);
    }
    if (timeDiff > bestPerform) {
      setBestPerform(timeDiff);
    }
  }, [currentTime]);

  useEffect(() => {
    setCurrentTime(0);
    setPoseTime(0);
    setBestPerform(0);
  }, [currentPose]);

  const CLASS_NO = {
    Chair: 0,
    Cobra: 1,
    Dog: 2,
    No_Pose: 3,
    Shoulderstand: 4,
    Triangle: 5,
    Tree: 6,
    Warrior: 7,
  };

  const get_center_point = (landmarks, left_bodypart, right_bodypart) => {
    const left = tf.gather(landmarks, left_bodypart, 1);
    const right = tf.gather(landmarks, right_bodypart, 1);
    return tf.add(tf.mul(left, 0.5), tf.mul(right, 0.5));
  };

  const get_pose_size = (landmarks, torso_size_multiplier = 2.5) => {
    const hips_center = get_center_point(
      landmarks,
      POINTS.LEFT_HIP,
      POINTS.RIGHT_HIP
    );
    const shoulders_center = get_center_point(
      landmarks,
      POINTS.LEFT_SHOULDER,
      POINTS.RIGHT_SHOULDER
    );
    const torso_size = tf.norm(tf.sub(shoulders_center, hips_center));
    let pose_center_new = get_center_point(
      landmarks,
      POINTS.LEFT_HIP,
      POINTS.RIGHT_HIP
    );
    pose_center_new = tf.expandDims(pose_center_new, 1);
    pose_center_new = tf.broadcastTo(pose_center_new, [1, 17, 2]);
    const d = tf.gather(tf.sub(landmarks, pose_center_new), 0, 0);
    const max_dist = tf.max(tf.norm(d, "euclidean", 0));
    return tf.maximum(tf.mul(torso_size, torso_size_multiplier), max_dist);
  };

  const normalize_pose_landmarks = (landmarks) => {
    let pose_center = get_center_point(
      landmarks,
      POINTS.LEFT_HIP,
      POINTS.RIGHT_HIP
    );
    pose_center = tf.expandDims(pose_center, 1);
    pose_center = tf.broadcastTo(pose_center, [1, 17, 2]);
    landmarks = tf.sub(landmarks, pose_center);
    const pose_size = get_pose_size(landmarks);
    return tf.div(landmarks, pose_size);
  };

  const landmarks_to_embedding = (landmarks) => {
    landmarks = normalize_pose_landmarks(tf.expandDims(landmarks, 0));
    return tf.reshape(landmarks, [1, 34]);
  };

  const runMovenet = async () => {
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
    };
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      detectorConfig
    );
    const poseClassifier = await tf.loadLayersModel(
      "https://models.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json"
    );
    const countAudio = new Audio(count);
    countAudio.loop = true;
    interval = setInterval(() => {
      detectPose(detector, poseClassifier, countAudio);
    }, 100);
  };

  const detectPose = async (detector, poseClassifier, countAudio) => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      let notDetected = 0;
      const video = webcamRef.current.video;
      const pose = await detector.estimatePoses(video);
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      try {
        const keypoints = pose[0].keypoints;
        const input = keypoints.map((keypoint) => {
          if (keypoint.score > 0.4) {
            drawPoint(ctx, keypoint.x, keypoint.y, 8, "rgb(255,255,255)"); // Draw keypoints

            // Draw connections if keypoint score is valid
            const connections = keypointConnections[keypoint.name];
            connections.forEach((connection) => {
              const conName = connection.toUpperCase();
              if (keypoints[POINTS[conName]].score > 0.4) {
                drawSegment(
                  ctx,
                  [keypoint.x, keypoint.y],
                  [keypoints[POINTS[conName]].x, keypoints[POINTS[conName]].y],
                  skeletonColor
                );
              }
            });
          } else {
            notDetected += 1;
          }
          return [keypoint.x, keypoint.y];
        });

        // Logic for handling undetected keypoints
        if (notDetected > 4) {
          skeletonColor = "rgb(255,255,255)";
          return;
        }
        const processedInput = landmarks_to_embedding(input);
        const classification = poseClassifier.predict(processedInput);

        classification.array().then((data) => {
          const classNo = CLASS_NO[currentPose];
          if (data[0][classNo] > 0.97) {
            if (!flag) {
              countAudio.play();
              setStartingTime(new Date(Date()).getTime());
              flag = true;
            }
            setCurrentTime(new Date(Date()).getTime());
            skeletonColor = "rgb(0,255,0)"; // Change color to green when pose is correct
            setIsPoseCorrect(true);
          } else {
            flag = false;
            skeletonColor = "rgb(255,255,255)";
            countAudio.pause();
            countAudio.currentTime = 0;
            setIsPoseCorrect(false);
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const startYoga = () => {
    setIsStartPose(true);
    runMovenet();
  };

  const stopPose = () => {
    setIsStartPose(false);
    clearInterval(interval);
  };

  return (
    <div className="bg-gradient-to-r from-orange-500 to-yellow-400 min-w-full min-h-screen flex flex-col items-center justify-center">
      {isStartPose ? (
        <>
          <div className="flex space-x-4 mb-4">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h4 className="text-gray-700">Pose Time: {poseTime} s</h4>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h4 className="text-gray-700">Best: {bestPerform} s</h4>
            </div>
          </div>
          <div className="relative">
            <Webcam
              width="640"
              height="480"
              id="webcam"
              ref={webcamRef}
              className="absolute left-30 top-24"
            />
            <canvas
              ref={canvasRef}
              id="my-canvas"
              width="640"
              height="480"
              className="absolute left-30 top-24 z-10"
            />
            <img
              src={poseImages[currentPose]}
              alt="pose overlay"
              className="absolute left-30 top-24 w-160 h-140 opacity-50 z-20"
            />
          </div>
          <button
            onClick={stopPose}
            className="bg-black text-white rounded-lg py-2 px-4 hover:bg-gray-700 transition duration-300"
          >
            Stop Pose
          </button>
          {isPoseCorrect && (
            <div className="text-green-600 font-bold mt-4">Correct Pose!</div>
          )}
        </>
      ) : (
        <>
          <DropDown
            options={poseList}
            currentPose={currentPose}
            setCurrentPose={setCurrentPose}
          />
          <Instructions />
          <button
            onClick={startYoga}
            className="bg-black text-white rounded-lg py-2 px-4 hover:bg-gray-700 transition duration-300"
          >
            Start Yoga
          </button>
        </>
      )}
    </div>
  );
}

export default Yoga;
