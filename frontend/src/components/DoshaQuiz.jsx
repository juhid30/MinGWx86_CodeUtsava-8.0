import React, { useEffect, useState } from "react";
import { questions } from "../utils/questions";
import { Transition } from "@headlessui/react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import DoshaRecommendations from "./DoshaRecommendations"; // Import the Recommendations component

const DoshaQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState({ Vata: 0, Pitta: 0, Kapha: 0 });
  const [showResult, setShowResult] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState(null); // State to hold recommendations

  const handleAnswer = (dosha) => {
    setScore((prevScore) => ({
      ...prevScore,
      [dosha]: prevScore[dosha] + 1,
    }));
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    const highestDosha = Object.keys(score).reduce((a, b) =>
      score[a] > score[b] ? a : b
    );
    return highestDosha;
  };

  const dominantDosha = showResult ? getResult() : null;
  useEffect(() => console.log(dominantDosha), [dominantDosha]);
  const API_KEY = "AIzaSyBBp8jEQ3zEJXLkSVgBpGHKr6q-EycIDSI";
  const genAI = new GoogleGenerativeAI(API_KEY);

  async function improveWithAI() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt =
      `\n\nPlease suggest lifestyle recipes and exercises with the recommended time commitment per day in JSON format. The response should include details like the name of the recipe or exercise, a brief description, and the estimated time required. Here’s an example structure:\n` +
      `{\n` +
      `  "recipes": [\n` +
      `    {\n` +
      `      "name": "Healthy Smoothie",\n` +
      `      "description": "A nutritious smoothie with fruits and vegetables.",\n` +
      `      "time": "10 minutes"\n` +
      `    }\n` +
      `  ],\n` +
      `  "exercises": [\n` +
      `    {\n` +
      `      "name": "30-Minute Jog",\n` +
      `      "description": "A steady-paced jog to improve cardiovascular health.",\n` +
      `      "time": "30 minutes"\n` +
      `    }\n` +
      `  ]\n` +
      `}\n\n`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim(); // Remove leading ```JSON and trailing ``

    try {
      const jsonData = JSON.parse(text);
      setRecommendations(jsonData); // Set the recommendations state
      setShowRecommendations(true); // Show recommendations
    } catch (error) {
      console.error("Invalid JSON:", error);
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-gradient-to-br from-green-200 to-green-500 p-10 rounded-lg shadow-2xl text-center">
      {!showResult ? (
        <>
          <div className="relative w-full h-2 bg-gray-300 rounded-full overflow-hidden mb-6">
            <div
              className="absolute left-0 top-0 h-full bg-green-700 transition-all duration-500"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          <Transition
            show={!showResult}
            enter="transform transition duration-700 ease-out"
            enterFrom="opacity-0 -translate-y-4 scale-90"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="transform transition duration-500 ease-in"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 -translate-y-4 scale-90"
          >
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.dosha)}
                    className="w-full py-3 bg-emerald-700 text-white font-semibold rounded-lg shadow-lg hover:bg-emerald-900 transform transition-transform hover:scale-105"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </Transition>
        </>
      ) : (
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <Transition
            appear={true}
            show={showResult}
            enter="transform transition duration-700 ease-out"
            enterFrom="opacity-0 rotate-180 scale-50"
            enterTo="opacity-100 rotate-0 scale-100"
          >
            <div>
              <h2 className="text-3xl font-bold text-green-800 mb-4">
                Your Dominant Dosha is:
              </h2>
              <p className="text-4xl font-extrabold text-yellow-600">
                {dominantDosha}
              </p>
              <p className="mt-4 text-gray-600">
                Learn more about how to balance your {dominantDosha} energy!
              </p>
              <button
                onClick={() => improveWithAI()}
                className="mt-6 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800"
              >
                Show Recommendations
              </button>
            </div>
          </Transition>
        </div>
      )}

      {showRecommendations && recommendations && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Recommendations:</h2>

          <h3 className="text-xl font-bold mb-2">Recipes:</h3>
          <ul className="space-y-2">
            {recommendations.recipes.map((recipe, index) => (
              <li key={index} className="bg-green-100 p-3 rounded-md">
                <strong>{recipe.name}</strong>: {recipe.description} <br />
                <em>Time: {recipe.time}</em>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-bold mt-4 mb-2">Exercises:</h3>
          <ul className="space-y-2">
            {recommendations.exercises.map((exercise, index) => (
              <li key={index} className="bg-blue-100 p-3 rounded-md">
                <strong>{exercise.name}</strong>: {exercise.description} <br />
                <em>Time: {exercise.time}</em>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DoshaQuiz;
