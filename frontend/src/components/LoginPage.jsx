import { GoogleGenerativeAI } from "@google/generative-ai";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";

const LoginPage = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleLogin = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Check if a file has been selected
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    try {
      const base64Image = await toBase64(selectedFile);
      const API_KEY = "AIzaSyCVOV_MuOdKNFYVTQOzjtjpSDqL73FspW8"; // Replace with your actual API key
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt =
        "Extract the text from the given image and format it as JSON with the following keys: 'name' for the medicine's name and 'pres' for the prescription information.";

      const image = {
        inlineData: {
          data: base64Image,
          mimeType: selectedFile.type,
        },
      };

      const result = await model.generateContent([prompt, image]);
      let ans = result.response.text(); // Get the accuracy response
      ans = ans
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      // let jsonData = JSON.parse(ans);
      // ans.console.log(jsonData); // Log the accuracy for debugging
      let extractedData;
      try {
        extractedData = JSON.parse(ans); // Parse the JSON string into an object
        console.log("Extracted Data:", extractedData); // Log the extracted data
        await setDoc(
          doc(db, "extractedData", "CmmnNRQpfuCzuY5iDlEz"),
          extractedData
        );
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }

    navigate("/dashboard"); // Redirect to the dashboard
  };

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Extract base64 part
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/jpeg") {
      setSelectedFile(file); // Set the selected file
      alert(`File selected: ${file.name}`);
    } else {
      alert("Please upload a .jpg file.");
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
          <label className="block text-gray-700 mb-2 text-lg">
            Upload Prescription
          </label>
          <input
            type="file"
            accept=".jpg"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
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
