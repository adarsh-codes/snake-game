import React, { useEffect, useRef, useState } from 'react'
import Snake from './Snake';
import Food from './Food';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const GameBoard = () => {

  const getrandomcoordinates = () =>{
    const min = 1;
    const max = 98;
    const x = Math.floor((Math.random() * (max-min+1) + min) / 2) * 2;
    const y = Math.floor((Math.random() * (max-min+1) + min) / 2) * 2;
    return [x, y];
  }

  const [snakesegment,setsnakesegment] = useState([0,0],[2,0]);
  const [food,setfood] = useState(getrandomcoordinates());
  const [direction,setdirection] = useState("RIGHT");
  const [speed,setspeed] = useState(60);
  const [gameover,setgameover] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const game = useRef(false);


  useEffect(() => {
    const storedHighScore = localStorage.getItem('highScore');
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }
  }, []);
  // to handle the direction of snake when key is pressed, up,down,left,right
  

 // TO HANDLE SNAKE MOVEMENT (USING SETinterval to change positions according to direction as key pressed)

 // newhead is added to snake a/c to the direction of snake, and if food is not consumed then tail is removed
 useEffect(() => {
  const moveSnake = () => {
    if(gameover) return;
    let newSnakeSegments = [...snakesegment];
    let head = newSnakeSegments[newSnakeSegments.length - 1];

    let newHead;
    switch (direction) {
      case 'RIGHT':
        newHead = [head[0] + 1, head[1]];
        break;
      case 'LEFT':
        newHead = [head[0] - 1, head[1]];
        break;
      case 'DOWN':
        newHead = [head[0] , head[1] + 1];
        break;
      case 'UP':
        newHead = [head[0] , head[1] - 1];
        break;
      default:
        newHead = head;
    }

    newSnakeSegments.push(newHead);
    newSnakeSegments.shift();

    setsnakesegment(newSnakeSegments);
  };


 
  const handleKeyDown = (e) => {
    if (!game.current) game.current = true;
    switch (e.keyCode) {
      case 37:
        if (direction !== 'RIGHT') setdirection('LEFT');
        break;
      case 38:
        if (direction !== 'DOWN') setdirection('UP');
        break;
      case 39:
        if (direction !== 'LEFT') setdirection('RIGHT');
        break;
      case 40:
        if (direction !== 'UP') setdirection('DOWN');
        break;
      default:
        break;
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  const interval = setInterval(moveSnake, speed);

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
    clearInterval(interval);
  };
}, [snakesegment, direction,speed,gameover]);




useEffect(() => {
  
  const checkIfCollapsed = () => {
    let snake = [...snakesegment];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        
        setgameover(true);
        return;
      }
    });
  };
  const checkIfOutOfBorders = () => {
    
    let head = snakesegment[snakesegment.length - 1];
    if (head[0] >= 100 || head[0] < 0 || head[1] >= 100 || head[1] < 0) {
      
      setgameover(true);
      return;
    }
  };

  const checkIfEat = () => {
    let head = snakesegment[snakesegment.length - 1];
    let foodPos = food;
    if (head[0] === foodPos[0] && head[1] === foodPos[1]) {
      setfood(getrandomcoordinates());
      setScore(score + 1);
      enlargeSnake();
      setspeed(speed - 5);
    }
  };

  const enlargeSnake = () => {
    let newSnake = [...snakesegment];
    newSnake.unshift([]);
    setsnakesegment(newSnake);
  };

  checkIfOutOfBorders();
  checkIfCollapsed();
  checkIfEat();
}, [snakesegment, food,speed,gameover,score]);

const startGame = () => {
  if (score > highScore) {
    setHighScore(score);
    localStorage.setItem('highScore', score); // Save high score to local storage
  }
  setsnakesegment([
    [0, 0],
    [2, 0]
  ]);
  setfood(getrandomcoordinates());
  setdirection('RIGHT');
  setspeed(100);
  setgameover(false);
  setScore(0);
  game.current = true;
};


  return (
    <div className='border-8 h-screen w-screen border-green-800 bg-black relative'>
     <Snake segment={snakesegment}/>
      <Food food={food}/>
      <div className="absolute top-0 left-0 m-4 text-white text-xl">
        Score: {score}
      </div>
      <div className="absolute top-0 right-0 m-4 text-white text-xl">
        High Score: {highScore}
      </div>
      {gameover && game.current && (
          <div className="absolute inset-0 flex items-center justify-start bg-black bg-opacity-75">
          <div className="text-white text-6xl">
            GAME OVER, PLAY
          </div>
        </div>)
          
            }
           {(!game.current || gameover) && (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
    <button className="mt-4 p-2 bg-green-500 text-white rounded" onClick={startGame}>
      Start Game
    </button>
  </div>
)}
            

              
              
            
            
            
            
  </div>
  )
}

export default GameBoard
