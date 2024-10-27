import React, { useState } from "react";
import Layout from "../Layout";

const initialBoard = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

// This is the correct solution board for the above initial board
const solutionBoard = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 2, 4, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

const Game = () => {
  const [board, setBoard] = useState(initialBoard);
  const [incorrectCells, setIncorrectCells] = useState(
    Array(9)
      .fill()
      .map(() => Array(9).fill(false))
  );

  const isSafe = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
    }
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) return false;
      }
    }
    return true;
  };

  const isComplete = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) return false;
      }
    }
    return true;
  };

  const handleInputChange = (row, col, value) => {
    const newValue = parseInt(value) || 0;
    if (newValue < 0 || newValue > 9) return;

    const newBoard = board.map((r) => [...r]);
    const newIncorrectCells = Array.from({ length: 9 }, () =>
      Array(9).fill(false)
    );

    if (newValue === 0) {
      newBoard[row][col] = 0;
      setBoard(newBoard);
      setIncorrectCells(newIncorrectCells);
      return;
    }

    if (isSafe(newBoard, row, col, newValue)) {
      newBoard[row][col] = newValue;
      setBoard(newBoard);
      if (isComplete(newBoard)) {
        alert("Congratulations! You solved the puzzle.");
      }
    } else {
      newIncorrectCells[row][col] = true;
      alert("Invalid move! This number conflicts with Sudoku rules.");
    }
    setIncorrectCells(newIncorrectCells);
  };

  const solveSudoku = () => {
    setBoard(solutionBoard); // Set the board to the solution board
  };

  const checkBoard = () => {
    const incorrect = Array.from({ length: 9 }, () => Array(9).fill(false));
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (
          board[row][col] !== initialBoard[row][col] &&
          board[row][col] !== 0
        ) {
          incorrect[row][col] = true;
        }
      }
    }
    setIncorrectCells(incorrect);
  };

  return (
    <Layout>
    <div className="flex flex-col items-center  p-4 bg-gray-50 h-full w-full">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">Sudoku Game</h1>
      <div className="grid grid-cols-9 gap-1 border-4 border-gray-800 rounded-lg p-2 bg-white shadow-md">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-16 h-16 flex items-center justify-center border-2 rounded-md ${
                (Math.floor(rowIndex / 3) + Math.floor(colIndex / 3)) % 2 === 0
                  ? "bg-gray-200"
                  : "bg-gray-300"
              } transition-all duration-200 hover:bg-gray-400`}
            >
              <input
                type="text"
                value={cell === 0 ? "" : cell}
                onChange={(e) =>
                  handleInputChange(rowIndex, colIndex, e.target.value)
                }
                className={`w-full h-full text-center text-2xl font-bold border-none focus:outline-none ${
                  incorrectCells[rowIndex][colIndex]
                    ? "text-red-500"
                    : cell === solutionBoard[rowIndex][colIndex] // Check if it matches the solution board value
                    ? "text-black"
                    : "text-blue-500" // If it doesn't match, set text color to blue
                }`}
                maxLength={1}
                disabled={initialBoard[rowIndex][colIndex] !== 0}
              />
            </div>
          ))
        )}
      </div>
      <div className="flex space-x-4 mt-6">
        <button
          onClick={solveSudoku} // Call the updated solveSudoku function
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-200"
        >
          Solve
        </button>
        <button
          onClick={checkBoard}
          className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-md shadow-md hover:bg-yellow-600 transition duration-200"
        >
          Check
        </button>
      </div>
    </div>
    </Layout>
  );
};

export default Game;
