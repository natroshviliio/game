import React from 'react'

const GameOver = ({ setIsGameStarted, setGameOver, setYouWin }) => {
    const tryAgain = () => {
        setIsGameStarted(true);
        setGameOver(false);
        setYouWin(false);
    }
    return (
        <div className="gameover">
            Game Over
            <button className="gameover_button" onClick={tryAgain}>Try Again</button>
        </div>
    )
}

export default GameOver