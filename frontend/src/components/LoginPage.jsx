import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleLogin = () => {
    // You can add login logic here (e.g., API calls)
    navigate("/dashboard"); // Redirect to the dashboard
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/jpeg") {
      setSelectedFile(file);
      alert(`File selected: ${file.name}`);
    } else {
      alert("Please upload a .jpg file.");
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      // Implement the upload logic here, e.g., uploading to Firebase Storage or another server
      alert(`Uploading file: ${selectedFile.name}`);
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#f5f5f5]">
      <div className="bg-white shadow-lg rounded-lg p-10 w-96">
        <h2
          className="text-3xl font-semibold text-center mb-8"
          style={{ color: "#7c4776" }}
        >
          Login
        </h2>
        
        <div className="mb-5">
          <label className="block text-gray-700 mb-2 text-lg">Email</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 mb-2 text-lg">Password</label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Enter your password"
          />
        </div>

        {/* File input for .jpg files */}
        <div className="mb-5">
          <label className="block text-gray-700 mb-2 text-lg">Upload Prescription</label>
          <input
            type="file"
            accept=".jpg"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
          <button
            onClick={handleFileUpload}
            className="w-full bg-[#b873b0] text-white py-3 mt-3  transition duration-200 hover:bg-[#d68fcd] text-lg rounded-lg"
          >
            Upload Prescription
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-[#7c4776] text-white py-3 rounded-lg transition duration-200 hover:bg-[#7c4776] hover:opacity-80 text-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
