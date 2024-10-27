// Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, message }) => {
  let jsonData = {};
  try {
    jsonData = JSON.parse(message);
    console.log("IN MODAL: ", jsonData);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-[#7c4776]/90 rounded-lg shadow-lg w-11/12 max-w-md p-6 relative transform transition-transform duration-300 scale-100 hover:scale-105">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200 focus:outline-none"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          Health Summary and Recommendations
        </h2>
        <div className="mt-4">
          {Object.keys(jsonData).length > 0 ? (
            <ul className="list-disc pl-5 text-white">
              <li>
                <strong>Average Exercise:</strong> {jsonData.avg_exer}
              </li>
              <li>
                <strong>Average Calories:</strong> {jsonData.avg_cal}
              </li>
              <li>
                <strong>Average Steps:</strong> {jsonData.avg_steps}
              </li>
              <li>
                <strong>Step Recommendation:</strong>{" "}
                {jsonData.recommendations.steps}
              </li>
              <li>
                <strong>Calorie Recommendation:</strong>{" "}
                {jsonData.recommendations.cal}
              </li>
            </ul>
          ) : (
            <p className="text-white">No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
