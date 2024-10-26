import React from "react";
import { poseImages } from "../utils/pose_images";

export default function DropDown({ poseList, currentPose, setCurrentPose }) {
  return (
    <div className="flex justify-center">
      <button
        className="btn btn-secondary w-[400px] bg-transparent hover:border-white focus:bg-white focus:text-black focus:ring-0 focus:border-white"
        type="button"
        data-bs-toggle="dropdown"
        id="pose-dropdown-btn"
        aria-expanded="false"
      >
        {currentPose}
      </button>
      <ul
        className="dropdown-menu overflow-scroll max-h-[40vh] scrollbar-hide"
        aria-labelledby="dropdownMenuButton1"
      >
        {poseList.map((pose) => (
          <li onClick={() => setCurrentPose(pose)} key={pose}>
            <div className="w-[400px] flex rounded-md justify-center items-center">
              <p className="m-2">{pose}</p>
              <img src={poseImages[pose]} alt={pose} className="w-20 h-20" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
