import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // You can add login logic here (e.g., API calls)
    navigate("/dashboard"); // Redirect to the dashboard
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
            className="w-full p-3 border border-gray-300 rounded" // Increased padding
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-8">
          <label className="block text-gray-700 mb-2 text-lg">Password</label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded" // Increased padding
            placeholder="Enter your password"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-[#7c4776] text-white py-3 rounded transition duration-200 hover:bg-[#7c4776] hover:opacity-80 text-lg" // Increased padding and font size
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
