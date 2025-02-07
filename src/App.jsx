import { useState, useEffect } from 'react';
import Field from './components/Feald';
import Snake from './components/Snake';
import Coin from './components/Coin';

const GRID_SIZE = 20;
const CELL_SIZE = 15;

function App() {
   const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
   const [coin, setCoin] = useState({ x: 5, y: 5 });
   const [direction, setDirection] = useState('RIGHT');
   const [gameOver, setGameOver] = useState(false);
   const [score, setScore] = useState(0);

   // Handle keyboard controls
   useEffect(() => {
      const handleKeyPress = (e) => {
         switch (e.key) {
            case 'ArrowUp':
               if (direction !== 'DOWN') setDirection('UP');
               break;
            case 'ArrowDown':
               if (direction !== 'UP') setDirection('DOWN');
               break;
            case 'ArrowLeft':
               if (direction !== 'RIGHT') setDirection('LEFT');
               break;
            case 'ArrowRight':
               if (direction !== 'LEFT') setDirection('RIGHT');
               break;
         }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
   }, [direction]);

   // Game loop
   useEffect(() => {
      if (gameOver) return;

      const moveSnake = () => {
         const newSnake = [...snake];
         const head = { ...newSnake[0] };

         switch (direction) {
            case 'UP': head.y -= 1; break;
            case 'DOWN': head.y += 1; break;
            case 'LEFT': head.x -= 1; break;
            case 'RIGHT': head.x += 1; break;
         }

         // Check collision with walls
         if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
            setGameOver(true);
            return;
         }

         // Check collision with self
         if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
            setGameOver(true);
            return;
         }

         newSnake.unshift(head);

         // Check coin collection
         if (head.x === coin.x && head.y === coin.y) {
            setScore(score + 1);
            generateNewCoin();
         } else {
            newSnake.pop();
         }

         setSnake(newSnake);
      };

      const gameInterval = setInterval(moveSnake, 150);
      return () => clearInterval(gameInterval);
   }, [snake, direction, coin, gameOver, score]);

   const generateNewCoin = () => {
      const newCoin = {
         x: Math.floor(Math.random() * GRID_SIZE),
         y: Math.floor(Math.random() * GRID_SIZE)
      };
      setCoin(newCoin);
   };

   const resetGame = () => {
      setSnake([{ x: 10, y: 10 }]);
      setDirection('RIGHT');
      setGameOver(false);
      setScore(0);
      generateNewCoin();
   };

   return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
         <h1 className="text-4xl font-bold text-white mb-4 font-game">Snake Game</h1>
         <div className="mb-4 text-2xl font-bold text-green-400">Score: {score}</div>
         <div className="relative bg-gray-700 rounded-lg p-4 shadow-2xl" 
              style={{ width: GRID_SIZE * CELL_SIZE + 32, height: GRID_SIZE * CELL_SIZE + 32 }}>
            <Field gridSize={GRID_SIZE} cellSize={CELL_SIZE} />
            <Snake segments={snake} cellSize={CELL_SIZE} />
            <Coin position={coin} cellSize={CELL_SIZE} />
         </div>
         {gameOver && (
            <div className="mt-6 text-center">
               <div className="text-red-400 text-xl mb-3">Game Over!</div>
               <button
                  onClick={resetGame}
                  className="px-6 py-3 bg-green-500 text-white rounded-full font-semibold
                           transform hover:scale-105 transition-transform duration-200
                           hover:bg-green-600 shadow-lg"
               >
                  Play Again
               </button>
            </div>
         )}
         <div className="mt-6 text-gray-400 text-sm">
            Use arrow keys to control the snake
         </div>
      </div>
   );
}

export default App;
