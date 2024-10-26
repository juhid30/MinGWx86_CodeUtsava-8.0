import React, { useState } from "react";
import Layout from "./Layout";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, registerables } from "chart.js";
import books from "../../public/books.png";
import finbg from "../../public/financial_bg.jpg";
import fries from "../../public/fries.png";
import money from "../../public//money.png";

Chart.register(ArcElement, Tooltip, Legend);
Chart.register(...registerables);

const Dashboard = () => {
  const medicines = [
    { name: "Paracetamol", schedule: "1-0-1" },
    { name: "Aspirin", schedule: "0-1-0" },
    { name: "Ibuprofen", schedule: "1-1-1" },
    { name: "Amoxicillin", schedule: "1-0-0" },
    { name: "Cough Syrup", schedule: "0-0-1" },
    { name: "Antacid", schedule: "1-1-0" },
    { name: "Vitamin D", schedule: "1-0-1" },
    { name: "Metformin", schedule: "0-1-1" },
    { name: "Lisinopril", schedule: "1-1-1" },
    { name: "Atorvastatin", schedule: "0-1-0" },
    // Add more medicines if needed
  ];

  const videos = [
    { title: "React Tutorial", link: "https://reactjs.org" },
    { title: "JavaScript Basics", link: "https://developer.mozilla.org" },
    { title: "Tailwind CSS Guide", link: "https://tailwindcss.com" },
    { title: "CSS Grid Layout", link: "https://css-tricks.com" },

    // Add more videos if needed
  ];

  const [labels, setLabels] = useState({
    amountSpent: "Amount Spent",
    financialGames: "Financial Games",
    amountSaved: "Amount Saved",
  });

  const handleArrowClick = (direction) => {
    if (direction === "up") {
      setLabels({
        amountSpent: "Wordle",
        financialGames: "Sudoku",
        amountSaved: "Memory Cards",
      });
    } else if (direction === "down") {
      setLabels({
        amountSpent: "Yoga Trainer",
        financialGames: "Catch the Block",
        amountSaved: "Hole in Wall",
      });
    }
  };

  const data1 = {
    labels: ["Red", "Blue", "Yellow"], // Add meaningful labels
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const data2 = {
    labels: ["Green", "Purple", "Orange"], // Add meaningful labels
    datasets: [
      {
        data: [200, 150, 100],
        backgroundColor: ["#4BC0C0", "#9966FF", "#FF9F40"],
        hoverBackgroundColor: ["#4BC0C0", "#9966FF", "#FF9F40"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Disable legend
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw || 0; // Get the value for the current segment
            return `${label}: ${value}`; // Show label and value on hover
          },
        },
      },
    },
  };

  const [dataType, setDataType] = useState("heartRate");

  const lineData = {
    heartRate: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Heart Rate",
          data: [72, 75, 78, 80, 77],
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
        },
      ],
    },
    sleep: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Sleep (hours)",
          data: [7, 6.5, 8, 5.5, 7],
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
        },
      ],
    },
    steps: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Steps",
          data: [1500, 2000, 2500, 3000, 3500],
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    },
  };

  const handleButtonClick = (type) => {
    setDataType(type);
  };

  return (
    <>
      <Layout>
        <div className="flex h-full bg-gray-200 text-gray-800">
          {/* Sidebar (commented out) */}
          {/* <aside className="w-16 bg-gray-800 text-white p-4 space-y-6">
            <div className="rounded-full w-10 h-10 bg-gray-400"></div>
            <nav className="flex flex-col space-y-4">
              <div className="w-8 h-8 bg-gray-600 rounded"></div>
              <div className="w-8 h-8 bg-gray-600 rounded"></div>
              <div className="w-8 h-8 bg-gray-600 rounded"></div>
              <div className="w-8 h-8 bg-gray-600 rounded"></div>
            </nav>
          </aside> */}

          {/* Main Content */}
          <main className="flex gap-8 h-[80vh] w-full items-center justify-center p-4">
            {/* Statistics Section */}
            <section className="h-full w-[70%] bg-white rounded-lg shadow flex flex-col-reverse p-2">
              <div className="h-[70%] w-full flex items-center justify-center relative">
                <Line data={lineData[dataType]} className="w-full max-w-lg" />

                <div className="absolute right-6 top-20 flex flex-col space-y-4">
                  <button
                    onClick={() => handleButtonClick("heartRate")}
                    className="bg-red-500 text-white py-2 px-4 rounded shadow-md transition-transform transform hover:scale-105"
                  >
                    Heart Rate
                  </button>
                  <button
                    onClick={() => handleButtonClick("sleep")}
                    className="bg-blue-500 text-white py-2 px-4 rounded shadow-md transition-transform transform hover:scale-105"
                  >
                    Sleep
                  </button>
                  <button
                    onClick={() => handleButtonClick("steps")}
                    className="bg-green-500 text-white py-2 px-4 rounded shadow-md transition-transform transform hover:scale-105"
                  >
                    Steps
                  </button>
                </div>
              </div>
              <div className="h-[30%] w-full  flex">
                <div className="flex flex-col w-[10%] h-full items-center justify-center">
                  <button
                    onClick={() => handleArrowClick("up")}
                    className="h-8 w-8 flex items-center justify-center bg-gray-200 rounded-full mb-1"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => handleArrowClick("down")}
                    className="h-8 w-8 flex items-center justify-center bg-gray-200 rounded-full"
                  >
                    ↓
                  </button>
                </div>
                <div className="flex h-[100%] w-[90%] ">
                  <div className="w-[33.33%] m-[0.4rem] border border-[#e7e7e7] relative overflow-hidden rounded-[30px] flex flex-col items-center ">
                    <img
                      className="float-end absolute bottom-[-30px] -rotate-12 h-[75%] right-[-25px] z-20"
                      src={fries || "path/to/money-image"}
                      alt="Money"
                    />
                    <div className="h-[30%] w-[100%] flex items-center justify-center font-medium bg-[#ff4444]">
                      {labels.amountSpent}
                    </div>
                    <div className="h-[70%] w-[100%] flex items-center justify-center text-[18px] z-[1] bg-white">
                      ₹{"5000"}
                    </div>
                  </div>

                  <a
                    href="https://financial-game.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[33.33%] m-[0.4rem] border-[10px] border-[#B8E0E0] relative overflow-hidden rounded-[30px] flex flex-col items-center"
                  >
                    <img
                      src={finbg || "path/to/financial-game-image"}
                      alt="button for financial games"
                      className="h-[90%] mt-2 w-[90%]"
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-[#40294D] font-bold text-lg rounded-[30px]">
                      <span className="bg-white p-1 w-[50%] text-center text-bold rounded-xl">
                        {labels.financialGames}
                      </span>
                    </span>
                  </a>

                  <div className="w-[33.33%] m-[0.4rem] border border-[#e7e7e7] relative overflow-hidden rounded-[30px] flex flex-col items-center ">
                    <img
                      className="float-end absolute bottom-[-20px] h-[55%] right-[-25px]"
                      src={books || "path/to/books-image"}
                      alt="Books"
                    />
                    <div className="h-[30%] w-[100%] flex items-center justify-center font-medium bg-[#66CEA5]">
                      {labels.amountSaved}
                    </div>
                    <div className="h-[70%] w-[100%] flex items-center justify-center text-[18px] z-[1]">
                      <span className="z-[100]">₹{"2500"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Profile Section */}
            <section className="flex flex-col h-full w-[30%] bg-white p-6 rounded-lg shadow">
              <div className="flex items-center h-[12%] space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-400"></div>
                <div>
                  <h3 className="text-lg font-medium">Alex Bennett</h3>
                  <p className="text-sm text-gray-500">Profile info here</p>
                </div>
              </div>
              <div className="h-[13%] w-full flex mt-4 ">
                <div className="h-full w-[33.333%] flex flex-col border-r border-r-1 border-gray-200">
                  <div className="w-full h-[40%] flex items-center justify-center">
                    <span className="font-semibold text-gray-400">Height</span>
                  </div>
                  <div className="w-full h-[60%] flex items-center justify-center">
                    <span className="font-semibold text-2xl">
                      172<span className="text-lg">cm</span>
                    </span>
                  </div>
                </div>
                <div className="h-full w-[33.333%] flex flex-col border-r border-r-1 border-gray-200">
                  <div className="w-full h-[40%] flex items-center justify-center">
                    <span className="font-semibold text-gray-400">Weight</span>
                  </div>
                  <div className="w-full h-[60%] flex items-center justify-center">
                    <span className="font-semibold text-2xl">
                      69<span className="text-lg">kg</span>
                    </span>
                  </div>
                </div>
                <div className="h-full w-[33.333%] flex flex-col">
                  <div className="w-full h-[40%] flex items-center justify-center">
                    <span className="font-semibold text-gray-400">Age</span>
                  </div>
                  <div className="w-full h-[60%] flex items-center justify-center">
                    <span className="font-semibold text-2xl">
                      45<span className="text-lg">yrs</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-[20%] w-full flex mt-4">
                <div className="w-full h-full flex justify-center items-center">
                  <div className="w-[35%] flex justify-center p-4 items-center flex-col">
                    <h5 className="text-sm font-semibold mb-2">Dosha</h5>
                    <Doughnut data={data1} options={options} />
                  </div>
                </div>
              </div>

              <div className=" h-[55%] w-full mt-2 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">
                  Medicine Schedule
                </h2>
                <div className="overflow-y-auto h-48">
                  <table className="min-w-full bg-white rounded-lg shadow">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-2 px-3 text-left">Medicine</th>
                        <th className="py-2 px-3 text-left">Schedule</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                      {medicines.map((medicine, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-2 px-3">{medicine.name}</td>
                          <td className="py-2 px-3">{medicine.schedule}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </main>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
