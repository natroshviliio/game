import React, { useEffect } from 'react'

const GameOver = ({ setIsGameStarted, setGameOver, setYouWin }) => {

    useEffect(() => {
        const gm = new Audio("./sounds/gameover.wav");
        gm.play();
    }, [])

    const tryAgain = () => {
        const start = new Audio("./sounds/startgame.wav");
        start.play();
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