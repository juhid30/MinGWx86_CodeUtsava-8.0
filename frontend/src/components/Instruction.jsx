import React, { useState } from "react";
import { poseInstructions } from "../utils/data";
import { poseImages } from "../utils/pose_images";

export default function Instructions({ currentPose }) {
  const [instructions, setInstructions] = useState(poseInstructions);

  return (
    <div className="flex justify-evenly items-center">
      <ul className="w-2/5 rounded-lg border-4 border-white/20 p-2.5 mt-2.5">
        {instructions[currentPose].map((instruction, index) => {
          return (
            <li
              key={index}
              className="m-2.5 tracking-wide text-white font-normal mt-5"
            >
              {instruction}
            </li>
          );
        })}
      </ul>
      <img
        className="h-[400px] aspect-square rounded-lg"
        src={poseImages[currentPose]}
        alt={`${currentPose} pose`}
      />
    </div>
  );
}
