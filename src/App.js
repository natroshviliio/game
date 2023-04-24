import './App.css';
import './style/style.css';
import Game from './components/Game';
import { useEffect, useState } from 'react';
import Launch from './components/Launch';
import "../node_modules/bpg-banner-extrasquare-caps/css/bpg-banner-extrasquare-caps.min.css";
import YouWin from './components/YouWin';
import GameOver from './components/GameOver';

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [youWin, setYouWin] = useState(false);

  const [restrictionMessage, setRestrictionMessage] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "F12" || (e.ctrlKey && e.keyCode === 67) || (e.ctrlKey && e.keyCode === 73) || (e.ctrlKey && e.keyCode === 74)) {
        e.preventDefault();
        setRestrictionMessage(true)
      }
    })
    window.oncontextmenu = (e) => {
      e.preventDefault();
      setRestrictionMessage(true)
    }
  }, []);

  useEffect(() => {
    if (restrictionMessage) {
      setTimeout(() => {
        setRestrictionMessage(false);
      }, 2000);
    }
  }, [restrictionMessage]);

  return (
    <>
      {(isGameStarted && (!gameOver || !youWin)) && <Game setIsGameStarted={setIsGameStarted} setGameOver={setGameOver} setYouWin={setYouWin} />}
      {(!isGameStarted && (!gameOver || !youWin)) && <Launch setIsGameStarted={setIsGameStarted} />}
      {(youWin && !gameOver && !isGameStarted) && <YouWin />}
      {(!youWin && gameOver && !isGameStarted) && <GameOver setIsGameStarted={setIsGameStarted} setGameOver={setGameOver} setYouWin={setYouWin} />}
      {restrictionMessage && (
        <div className='restriction_message'>
          ნუ მაიმუნობ 🤭
        </div>
      )}
    </>
  );
}

export default App;
