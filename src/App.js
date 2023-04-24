import './App.css';
import './style/style.css';
import Game from './components/Game';
import { useState } from 'react';
import Launch from './components/Launch';
import "../node_modules/bpg-banner-extrasquare-caps/css/bpg-banner-extrasquare-caps.min.css";
import YouWin from './components/YouWin';
import GameOver from './components/GameOver';

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [youWin, setYouWin] = useState(false);

  return (
    <>
      {(isGameStarted && (!gameOver || !youWin)) && <Game setIsGameStarted={setIsGameStarted} setGameOver={setGameOver} setYouWin={setYouWin} />}
      {(!isGameStarted && (!gameOver || !youWin)) && <Launch setIsGameStarted={setIsGameStarted} />}
      {(youWin && !gameOver && !isGameStarted) && <YouWin />}
      {(!youWin && gameOver && !isGameStarted) && <GameOver setIsGameStarted={setIsGameStarted} setGameOver={setGameOver} setYouWin={setYouWin} />}
    </>
  );
}

export default App;
