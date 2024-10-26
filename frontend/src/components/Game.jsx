import React, { useRef, useEffect, useState } from 'react';

const Game = () => {
  const canvasRef = useRef(null);
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 50 });
  const [gameOver, setGameOver] = useState(false);
  const outline = [[20, 20], [80, 20], [80, 80], [20, 80]]; // Define your outline points

  const handleKeyPress = (e) => {
    if (!gameOver) {
      switch (e.key) {
        case 'ArrowUp':
          setPlayerPos((pos) => ({ ...pos, y: pos.y - 5 }));
          break;
        case 'ArrowDown':
          setPlayerPos((pos) => ({ ...pos, y: pos.y + 5 }));
          break;
        case 'ArrowLeft':
          setPlayerPos((pos) => ({ ...pos, x: pos.x - 5 }));
          break;
        case 'ArrowRight':
          setPlayerPos((pos) => ({ ...pos, x: pos.x + 5 }));
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const drawOutline = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      outline.forEach((point, index) => {
        const [x, y] = point;
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      });
      context.closePath();
      context.stroke();
    };

    const drawPlayer = () => {
      context.beginPath();
      context.arc(playerPos.x, playerPos.y, 5, 0, Math.PI * 2);
      context.fillStyle = 'blue';
      context.fill();
    };

    drawOutline();
    drawPlayer();
  }, [playerPos]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameOver]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={400} height={400} className="border border-gray-300"></canvas>
      {gameOver && <p className="text-red-500">Game Over!</p>}
    </div>
  );
};

export default Game;
