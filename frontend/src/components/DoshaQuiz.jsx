import React, { useEffect, useState } from "react";
import { questions } from "../utils/questions";
import { Transition } from "@headlessui/react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import DoshaRecommendations from "./DoshaRecommendations";
import Layout from "./Layout";

const DoshaQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState({ Vata: 0, Pitta: 0, Kapha: 0 });
  const [showResult, setShowResult] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading

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
    setLoading(true); // Start loading

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

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const jsonData = JSON.parse(text);
      setRecommendations(jsonData);
      setShowRecommendations(true);
    } catch (error) {
      console.error("Invalid JSON:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-12 bg-white rounded-3xl shadow-2xl p-10 text-center space-y-10">
        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        {!showResult ? (
          <>
            <Transition
              show={!showResult}
              enter="transition transform duration-700 ease-out"
              enterFrom="opacity-0 -translate-y-4 scale-90"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="transition transform duration-500 ease-in"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 -translate-y-4 scale-90"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  {questions[currentQuestion].question}
                </h2>

                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option.dosha)}
                      className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-md hover:from-purple-700 hover:to-pink-700 transition-transform transform hover:scale-105"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </div>
            </Transition>
          </>
        ) : (
          <div className="text-center p-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg shadow-md">
            <Transition
              appear={true}
              show={showResult}
              enter="transition transform duration-700 ease-out"
              enterFrom="opacity-0 rotate-180 scale-50"
              enterTo="opacity-100 rotate-0 scale-100"
            >
              <div>
                <h2 className="text-4xl font-extrabold text-purple-800 mb-4">
                  Your Dominant Dosha is:
                </h2>
                <p className="text-5xl font-extrabold text-pink-600 mb-4">
                  {dominantDosha}
                </p>
                <p className="mt-4 text-gray-700 text-lg">
                  Discover ways to balance your {dominantDosha} energy!
                </p>
                <button
                  onClick={() => improveWithAI()}
                  className="mt-6 py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loader">Loading...</span>
                  ) : (
                    "Get Personalized Recommendations"
                  )}
                </button>
              </div>
            </Transition>
          </div>
        )}

        {/* Modal for Recommendations */}
        {showRecommendations && recommendations && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center ">
            <div className="bg-white rounded-lg max-w-lg p-8 h-[80%] overflow-x-hidden overflow-y-scroll invisible-scrollbar text-left shadow-xl relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setShowRecommendations(false)}
              >
                ×
              </button>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Recommendations
              </h2>

              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                Recipes:
              </h3>
              <ul className="space-y-4">
                {recommendations.recipes.map((recipe, index) => (
                  <li
                    key={index}
                    className="bg-purple-100 p-4 rounded-md text-gray-700 shadow-sm"
                  >
                    <strong className="text-purple-700">{recipe.name}</strong>:{" "}
                    {recipe.description} <br />
                    <em className="text-gray-600">Time: {recipe.time}</em>
                  </li>
                ))}
              </ul>

              <h3 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">
                Exercises:
              </h3>
              <ul className="space-y-4">
                {recommendations.exercises.map((exercise, index) => (
                  <li
                    key={index}
                    className="bg-pink-100 p-4 rounded-md text-gray-700 shadow-sm"
                  >
                    <strong className="text-pink-700">{exercise.name}</strong>:{" "}
                    {exercise.description} <br />
                    <em className="text-gray-600">Time: {exercise.time}</em>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DoshaQuiz;
