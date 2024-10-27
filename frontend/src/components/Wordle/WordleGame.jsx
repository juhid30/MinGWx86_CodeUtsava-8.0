// src/WordleGame.js

import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Layout from "../Layout";

const LEVELS = [
  {
    words: ["apple", "berry", "grape"],
    maxAttempts: 6,
  },
  {
    words: ["lemon", "mango", "peach"],
    maxAttempts: 5,
  },
  {
    words: ["orange", "melon", "kiwi"],
    maxAttempts: 4,
  },
];

const WordleGame = () => {
  const [level, setLevel] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [targetWord, setTargetWord] = useState("");
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const randomWord =
      LEVELS[level].words[
        Math.floor(Math.random() * LEVELS[level].words.length)
      ];
    setTargetWord(randomWord);
    setGuesses(Array(LEVELS[level].maxAttempts).fill(""));
  }, [level]);

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase().slice(0, 5);
    setCurrentGuess(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentGuess.length === 5 && attempts < LEVELS[level].maxAttempts) {
      setGuesses((prev) => {
        const newGuesses = [...prev];
        newGuesses[attempts] = currentGuess;
        return newGuesses;
      });

      if (currentGuess === targetWord) {
        setGameWon(true);
      } else {
        setAttempts(attempts + 1);
        setCurrentGuess("");
      }
    }
  };

  const getFeedback = (guess) => {
    return guess.split("").map((letter, index) => {
      if (targetWord[index] === letter) {
        return "correct";
      } else if (targetWord.includes(letter)) {
        return "present";
      } else {
        return "absent";
      }
    });
  };

  const renderGuesses = () => {
    return guesses.map((guess, index) => {
      const feedback = getFeedback(guess);
      return (
        <div key={index} className="flex justify-center mb-1">
          {guess.split("").map((letter, i) => (
            <div
              key={i}
              className={`w-10 h-10 flex items-center justify-center border-2 border-gray-400 m-1 text-xl font-bold ${
                feedback[i] === "correct"
                  ? "bg-green-500 text-white"
                  : feedback[i] === "present"
                  ? "bg-yellow-500 text-white"
                  : feedback[i] === "absent"
                  ? "bg-gray-300 text-white"
                  : ""
              }`}
            >
              {letter}
            </div>
          ))}
        </div>
      );
    });
  };

  const handleNextLevel = () => {
    setLevel((prev) => (prev + 1 < LEVELS.length ? prev + 1 : prev));
    setAttempts(0);
    setCurrentGuess("");
    setGameWon(false);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full w-full bg-gray-200 p-4">
        {gameWon && <Confetti />}
        <h1 className="text-4xl font-bold mb-6">
          Wordle Game - Level {level + 1}
        </h1>
        <div className="flex flex-col mb-4">{renderGuesses()}</div>
        <form onSubmit={handleSubmit} className="flex mb-4">
          <input
            type="text"
            value={currentGuess}
            onChange={handleInputChange}
            maxLength={5}
            disabled={attempts >= LEVELS[level].maxAttempts || gameWon}
            className="border-2 border-gray-400 p-2 rounded w-40 text-center text-xl"
          />
          <button
            type="submit"
            disabled={attempts >= LEVELS[level].maxAttempts || gameWon}
            className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
          >
            Guess
          </button>
        </form>
        {attempts >= LEVELS[level].maxAttempts && !gameWon && (
          <div className="mt-4 text-xl">
            The word was: <strong>{targetWord}</strong>
          </div>
        )}
        {gameWon && (
          <div className="mt-4 text-xl">
            Congratulations! You guessed the word!
            <button
              onClick={handleNextLevel}
              className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Next Level
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WordleGame;
