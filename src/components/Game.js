import React, { useEffect, useState } from 'react'
import { AiFillStar } from "react-icons/ai";
import { BsHeartFill } from "react-icons/bs";
import { GiKey, GiDoorway } from "react-icons/gi";

const Game = ({ setIsGameStarted, setGameOver, setYouWin }) => {
    const [person, setPerson] = useState(null);
    const [personLife, setPersonLife] = useState(3);
    const [pickedScores, setPickedScores] = useState(0);
    const [pickedKey, setPickedKey] = useState(0);
    const [isKeyPressed, setIsKeyPressed] = useState({ pressed: null, key: null });
    const screamAudio = new Audio();

    const [phisics, setPhisics] = useState({
        moveSpeed: 1,
        defaultMoveSpeed: 1,
    })

    const [scores, setScores] = useState([
        {
            data: {
                id: "score1",
                element: <AiFillStar />,
                picked: false
            },
            style: {
                width: 25,
                height: 25,
                top: 455,
                left: 320,
            }
        },
        {
            data: {
                id: "score2",
                element: <AiFillStar />,
                picked: false
            },
            style: {
                width: 25,
                height: 25,
                top: 470,
                left: 755,
            }
        },
        {
            data: {
                id: "score3",
                element: <AiFillStar />,
                picked: false
            },
            style: {
                width: 25,
                height: 25,
                top: 15,
                left: 510,
            }
        }
    ]);

    const [lifes, setLifes] = useState([
        {
            data: {
                id: "life1",
                element: <BsHeartFill />,
                picked: false,
            },
            style: {
                width: 25,
                height: 25,
                top: 160,
                left: 300,
            }
        }
    ])

    const [keys, setKeys] = useState([
        {
            data: {
                id: "key1",
                element: <GiKey />,
                picked: false,
            },
            style: {
                width: 25,
                height: 25,
                top: 455,
                left: 935,
            }
        }
    ])

    const mainObject = {
        width: 20,
        height: 20,
        left: 50,
        top: 250 - 20 / 2,
    }

    const boardObject = {
        width: 1000,
        height: 500,
    }
    let audio = new Audio();
    useEffect(() => {
        setPerson(mainObject);
        audio.src = "./sounds/darkness.mp3";
        audio.volume = 0.8;
        audio.loop = true;
        audio.play();
    }, []);

    useEffect(() => {
        const personKeyDown = document.body.onkeydown = (e) => {
            setIsKeyPressed({
                pressed: true,
                key: e.key,
            })
        }

        document.body.onkeyup = (e) => {
            if (["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)) {
                setIsKeyPressed({ pressed: false, key: e.key })
            }
        }

        return () => {
            document.body.removeEventListener("keydown", personKeyDown);
        }
    }, []);


    const [int, setInt] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            if (isKeyPressed.pressed) {
                setPhisics({ ...phisics, moveSpeed: phisics.defaultMoveSpeed });
                switch (isKeyPressed.key) {
                    case "ArrowRight":
                        moveRight();
                        break;
                    case "ArrowDown":
                        moveBottom();
                        break;
                    case "ArrowLeft":
                        moveLeft();
                        break;
                    case "ArrowUp":
                        moveTop();
                        break;
                }
            } else if (isKeyPressed.pressed === false && phisics.moveSpeed > phisics.defaultMoveSpeed) {
                switch (isKeyPressed.key) {
                    case "ArrowRight":
                        surfRight();
                        break;
                    case "ArrowLeft":
                        surfLeft();
                        break;
                    case "ArrowUp":
                        surfTop();
                        break;
                    case "ArrowDown":
                        surfBottom();
                        break;
                }
            }
            setInt(int > 1000 ? int + 1 : 0);
            animateWallHorisontally("animWall1", 690, 640, -0.4);
            animateWallVertically("animWall2", -40, 0, 0.2);
        }, 10);

        return () => clearInterval(interval);
    }, [int, person, phisics, isKeyPressed]);

    const [int2, setInt2] = useState(0);
    useEffect(() => {
        const screamArray = ["./sounds/laugh1.mp3", "./sounds/laugh2.mp3", "./sounds/laugh3.mp3", "./sounds/laugh4.mp3",
            "./sounds/scarrySound1.mp3", "./sounds/scarrySound2.mp3", "./sounds/iSeeYou.mp3"];

        const interval = setInterval(() => {
            screamAudio.src = screamArray[Math.floor(Math.random() * 7)];
            screamAudio.volume = 0.4;
            screamAudio.play();
            setInt2(int2 > 10 ? 0 : int2 + 1);
        }, 20000);

        return () => clearInterval(interval);
    }, [int2]);

    useEffect(() => {
        if (personLife <= 0) {
            gameOver();
        }
    }, [personLife])

    const winGame = () => {
        setIsGameStarted(false);
        setYouWin(true);
        setGameOver(false);
        audio.pause();
        screamAudio.pause();
    }
    const gameOver = () => {
        setGameOver(true);
        setYouWin(false);
        setIsGameStarted(false);
    }
    const pickUpScore = (id) => {
        const _scores = [...scores];
        _scores.find(x => x.data.id === id).data.picked = true;
        setPickedScores(pickedScores + 1);
        setScores(_scores);
    }

    const pickUpLife = (id) => {
        const _lifes = [...lifes];
        _lifes.find(x => x.data.id === id).data.picked = "true";
        setPersonLife(personLife + 1);
        setLifes(_lifes);
    }
    const pickUpKey = (id) => {
        const _keys = [...keys];
        _keys.find(x => x.data.id === id).data.picked = true;
        setPickedKey(pickedKey + 1);
        setKeys(_keys);
    }

    const moveRight = () => {
        const _person = { ...person };
        const _phisics = { ...phisics };
        const walls = document.querySelectorAll(".wall");
        const scores = document.querySelectorAll(".score");

        let left = _person.left;

        walls.forEach(wall => {
            const wallBottom = parseInt(wall.style.height) + parseInt(wall.style.top);
            const wallRight = parseInt(wall.style.width) + parseInt(wall.style.left);
            const wallLeft = parseInt(wall.style.left);
            const wallTop = parseInt(wall.style.top);
            if ((_person.top > wallTop && _person.top < wallBottom) && (_person.left <= wallRight && _person.left >= wallLeft)) {
                left = 50;
                _person.top = 250 - 20 / 2;
                _phisics.moveSpeed = _phisics.defaultMoveSpeed;
                setPersonLife(personLife - 1);
            }
        })
        scores.forEach(score => {
            const scoreBottom = parseInt(score.style.height) + parseInt(score.style.top);
            const scoreRight = parseInt(score.style.width) + parseInt(score.style.left);
            const scoreLeft = parseInt(score.style.left);
            const scoreTop = parseInt(score.style.top);
            if ((_person.top > scoreTop && _person.top < scoreBottom) && (_person.left <= scoreRight && _person.left + _person.width >= scoreLeft)) {
                pickUpScore(score.id);
            }
        })

        const keys = document.querySelectorAll(".key");
        keys.forEach(key => {
            const keyBottom = parseInt(key.style.height) + parseInt(key.style.top);
            const keyRight = parseInt(key.style.width) + parseInt(key.style.left);
            const keyLeft = parseInt(key.style.left);
            const keyTop = parseInt(key.style.top);
            if ((_person.top > keyTop && _person.top < keyBottom) && (_person.left <= keyRight && _person.left + _person.width >= keyLeft)) {
                pickUpKey(key.id);
            }
        })

        if (pickedKey > 0) {
            const door = document.querySelector(".door");
            const doorBottom = parseInt(door.style.height) + parseInt(door.style.top);
            const doorRight = parseInt(door.style.width) + parseInt(door.style.left);
            const doorLeft = parseInt(door.style.left);
            const doorTop = parseInt(door.style.top);
            if ((_person.top > doorTop && _person.top < doorBottom) && (_person.left <= doorRight && _person.left + _person.width >= doorLeft)) {
                winGame();
            }
        }

        if (left >= boardObject.width - _person.width) {
            left = boardObject.width - _person.width;
        } else {
            _phisics.moveSpeed += 0.3;
            left += _phisics.moveSpeed;
        }

        _person.left = left;

        setPerson(_person);
        setPhisics(_phisics);
    }
    const surfRight = () => {
        const _person = { ...person };
        const _phisics = { ...phisics };

        let left = _person.left;

        const walls = document.querySelectorAll(".wall");
        walls.forEach(wall => {
            const wallBottom = parseInt(wall.style.height) + parseInt(wall.style.top);
            const wallRight = parseInt(wall.style.width) + parseInt(wall.style.left);
            const wallLeft = parseInt(wall.style.left);
            const wallTop = parseInt(wall.style.top);
            if ((_person.top + _person.height > wallTop && _person.top < wallBottom) && (_person.left + _person.width > wallLeft && _person.left < wallRight)) {
                left = 50;
                _person.top = 250 - 20 / 2;
                _phisics.moveSpeed = _phisics.defaultMoveSpeed;
                setPersonLife(personLife - 1);
            }
        })

        const scores = document.querySelectorAll(".score");
        scores.forEach(score => {
            const scoreBottom = parseInt(score.style.height) + parseInt(score.style.top);
            const scoreRight = parseInt(score.style.width) + parseInt(score.style.left);
            const scoreLeft = parseInt(score.style.left);
            const scoreTop = parseInt(score.style.top);
            if ((_person.top > scoreTop && _person.top < scoreBottom) && (_person.left <= scoreRight && _person.left + _person.width >= scoreLeft)) {
                pickUpScore(score.id);
            }
        })

        const keys = document.querySelectorAll(".key");
        keys.forEach(key => {
            const keyBottom = parseInt(key.style.height) + parseInt(key.style.top);
            const keyRight = parseInt(key.style.width) + parseInt(key.style.left);
            const keyLeft = parseInt(key.style.left);
            const keyTop = parseInt(key.style.top);
            if ((_person.top > keyTop && _person.top < keyBottom) && (_person.left <= keyRight && _person.left + _person.width >= keyLeft)) {
                pickUpKey(key.id);
            }
        })
        if (pickedKey > 0) {
            const door = document.querySelector(".door");
            const doorBottom = parseInt(door.style.height) + parseInt(door.style.top);
            const doorRight = parseInt(door.style.width) + parseInt(door.style.left);
            const doorLeft = parseInt(door.style.left);
            const doorTop = parseInt(door.style.top);
            if ((_person.top > doorTop && _person.top < doorBottom) && (_person.left <= doorRight && _person.left + _person.width >= doorLeft)) {
                winGame();
            }
        }

        if (left > boardObject.width - _person.width) {
            left = boardObject.width - _person.width;
            _phisics.moveSpeed = _phisics.defaultMoveSpeed;
        } else if (_phisics.moveSpeed > _phisics.defaultMoveSpeed) {
            _phisics.moveSpeed -= 0.1;
            left += _phisics.moveSpeed;
        } else {
            _phisics.moveSpeed = _phisics.defaultMoveSpeed;
        }

        _person.left = left;

        setPerson(_person);
        setPhisics(_phisics);
    }
    const moveLeft = () => {
        const _person = { ...person };
        const _phisics = { ...phisics };

        let left = _person.left;

        const walls = document.querySelectorAll(".wall");
        walls.forEach(wall => {
            const wallBottom = parseInt(wall.style.height) + parseInt(wall.style.top);
            const wallRight = parseInt(wall.style.width) + parseInt(wall.style.left);
            const wallLeft = parseInt(wall.style.left);
            const wallTop = parseInt(wall.style.top);
            if ((_person.top > wallTop && _person.top < wallBottom) && (_person.left <= wallRight && _person.left + _person.width / 2 >= wallLeft)) {
                left = 50;
                _person.top = 250 - 20 / 2;
                _phisics.moveSpeed = _phisics.defaultMoveSpeed;
                setPersonLife(personLife - 1);
            }
        })

        const scores = document.querySelectorAll(".score");
        scores.forEach(score => {
            const scoreBottom = parseInt(score.style.height) + parseInt(score.style.top);
            const scoreRight = parseInt(score.style.width) + parseInt(score.style.left);
            const scoreLeft = parseInt(score.style.left);
            const scoreTop = parseInt(score.style.top);
            if ((_person.top > scoreTop && _person.top < scoreBottom) && (_person.left <= scoreRight && _person.left + _person.width / 2 >= scoreLeft)) {
                pickUpScore(score.id);
            }
        })

        const lifes = document.querySelectorAll(".life");
        lifes.forEach(life => {
            const lifeBottom = parseInt(life.style.height) + parseInt(life.style.top);
            const llifeRight = parseInt(life.style.width) + parseInt(life.style.left);
            const lifeLeft = parseInt(life.style.left);
            const lifeTop = parseInt(life.style.top);
            if ((_person.top > lifeTop && _person.top < lifeBottom) && (_person.left <= llifeRight && _person.left + _person.width / 2 >= lifeLeft)) {
                pickUpLife(life.id);
            }
        })
        const keys = document.querySelectorAll(".key");
        keys.forEach(key => {
            const keyBottom = parseInt(key.style.height) + parseInt(key.style.top);
            const keyRight = parseInt(key.style.width) + parseInt(key.style.left);
            const keyLeft = parseInt(key.style.left);
            const keyTop = parseInt(key.style.top);
            if ((_person.top > keyTop && _person.top < keyBottom) && (_person.left <= keyRight && _person.left + _person.width / 2 >= keyLeft)) {
                pickUpKey(key.id);
            }
        })

        if (left <= 0) {
            left = 0;
        } else {
            _phisics.moveSpeed += 0.3;
            left -= _phisics.moveSpeed;
        }

        _person.left = left;

        setPerson(_person);
        setPhisics(_phisics);
    }
    const surfLeft = () => {
        const _person = { ...person };
        const _phisics = { ...phisics };

        let left = _person.left;

        const walls = document.querySelectorAll(".wall");
        walls.forEach(wall => {
            const wallBottom = parseInt(wall.style.height) + parseInt(wall.style.top);
            const wallRight = parseInt(wall.style.width) + parseInt(wall.style.left);
            const wallLeft = parseInt(wall.style.left);
            const wallTop = parseInt(wall.style.top);
            if ((_person.top + _person.height > wallTop && _person.top < wallBottom) && (_person.left > wallLeft && _person.left < wallRight)) {
                left = 50;
                _person.top = 250 - 20 / 2;
                _phisics.moveSpeed = _phisics.defaultMoveSpeed;
                setPersonLife(personLife - 1);
            }
        })

        const scores = document.querySelectorAll(".score");
        scores.forEach(score => {
            const scoreBottom = parseInt(score.style.height) + parseInt(score.style.top);
            const scoreRight = parseInt(score.style.width) + parseInt(score.style.left);
            const scoreLeft = parseInt(score.style.left);
            const scoreTop = parseInt(score.style.top);
            if ((_person.top > scoreTop && _person.top < scoreBottom) && (_person.left <= scoreRight && _person.left + _person.width / 2 >= scoreLeft)) {
                pickUpScore(score.id);
            }
        })
        const lifes = document.querySelectorAll(".life");
        lifes.forEach(life => {
            const lifeBottom = parseInt(life.style.height) + parseInt(life.style.top);
            const lifeRight = parseInt(life.style.width) + parseInt(life.style.left);
            const lifeLeft = parseInt(life.style.left);
            const lifeTop = parseInt(life.style.top);
            if ((_person.top > lifeTop && _person.top < lifeBottom) && (_person.left <= lifeRight && _person.left + _person.width / 2 >= lifeLeft)) {
                pickUpLife(life.id);
            }
        })
        const keys = document.querySelectorAll(".key");
        keys.forEach(key => {
            const keyBottom = parseInt(key.style.height) + parseInt(key.style.top);
            const keyRight = parseInt(key.style.width) + parseInt(key.style.left);
            const keyLeft = parseInt(key.style.left);
            const keyTop = parseInt(key.style.top);
            if ((_person.top > keyTop && _person.top < keyBottom) && (_person.left <= keyRight && _person.left + _person.width / 2 >= keyLeft)) {
                pickUpKey(key.id);
            }
        })

        if (left <= 0) {
            left = 0;
            _phisics.moveSpeed = _phisics.defaultMoveSpeed;
        } else if (_phisics.moveSpeed > _phisics.defaultMoveSpeed) {
            _phisics.moveSpeed -= 0.1;
            left -= _phisics.moveSpeed;
        } else {
            _phisics.moveSpeed = _phisics.defaultMoveSpeed;
        }

        _person.left = left;

        setPerson(_person);
        setPhisics(_phisics);
    }
    const moveTop = () => {
        const _person = { ...person };
        const _phisics = { ...phisics };
        let top = _person.top;

        const walls = document.querySelectorAll(".wall");
        walls.forEach(wall => {
            const wallBottom = parseInt(wall.style.height) + parseInt(wall.style.top);
            const wallRight = parseInt(wall.style.width) + parseInt(wall.style.left);
            const wallLeft = parseInt(wall.style.left);
            const wallTop = parseInt(wall.style.top);
            if (((_person.left > wallLeft && _person.left < wallRight) && (_person.top <= wallBottom && _person.top > wallTop))) {
                _person.left = 50;
                top = 250 - 20 / 2;
                _phisics.moveSpeed = _phisics.defaultMoveSpeed;
                setPersonLife(personLife - 1);
            }
        })

        const scores = document.querySelectorAll(".score");
        scores.forEach(score => {
            const scoreBottom = parseInt(score.style.height) + parseInt(score.style.top);
            const scoreRight = parseInt(score.style.width) + parseInt(score.style.left);
            const scoreLeft = parseInt(score.style.left);
            const scoreTop = parseInt(score.style.top);
            if (((_person.left > scoreLeft && _person.left < scoreRight) && (_person.top <= scoreBottom && _person.top > scoreTop))) {
                pickUpScore(score.id);
            }
        })
        const lifes = document.querySelectorAll(".life");
        lifes.forEach(life => {
            const lifeBottom = parseInt(life.style.height) + parseInt(life.style.top);
            const lifeRight = parseInt(life.style.width) + parseInt(life.style.left);
            const lifeLeft = parseInt(life.style.left);
            const lifeTop = parseInt(life.style.top);
            if (((_person.left > lifeLeft && _person.left < lifeRight) && (_person.top <= lifeBottom && _person.top > lifeTop))) {
                pickUpLife(life.id);
            }
        })
        const keys = document.querySelectorAll(".key");
        keys.forEach(key => {
            const keyBottom = parseInt(key.style.height) + parseInt(key.style.top);
            const keyRight = parseInt(key.style.width) + parseInt(key.style.left);
            const keyLeft = parseInt(key.style.left);
            const keyTop = parseInt(key.style.top);
            if (((_person.left > keyLeft && _person.left < keyRight) && (_person.top <= keyBottom && _person.top > keyTop))) {
                pickUpKey(key.id);
            }
        })

        if (pickedKey > 0) {
            const door = document.querySelector(".door");
            const doorBottom = parseInt(door.style.height) + parseInt(door.style.top);
            const doorRight = parseInt(door.style.width) + parseInt(door.style.left);
            const doorLeft = parseInt(door.style.left);
            const doorTop = parseInt(door.style.top);
            if (((_person.left > doorLeft && _person.left < doorRight) && (_person.top <= doorBottom && _person.top > doorTop))) {
                winGame();
            }
        }

        if (top <= 0) {
            top = 0;
        } else {
            _phisics.moveSpeed += 0.3;
            top -= phisics.moveSpeed;
        }

        _person.top = top;

        setPerson(_person);
        setPhisics(_phisics);
    }
    const surfTop = () => {
        const _person = { ...person };
        const _phisics = { ...phisics };

        let top = _person.top;

        const walls = document.querySelectorAll(".wall");
        walls.forEach(wall => {
            const wallBottom = parseInt(wall.style.height) + parseInt(wall.style.top);
            const wallRight = parseInt(wall.style.width) + parseInt(wall.style.left);
            const wallLeft = parseInt(wall.style.left);
            const wallTop = parseInt(wall.style.top);
            if (((_person.left + _person.width > wallLeft && _person.left < wallRight) && (_person.top <= wallBottom && _person.top > wallTop))) {
                _person.left = 50;
                top = 250 - 20 / 2;
                _phisics.moveSpeed = _phisics.defaultMoveSpeed;
                setPersonLife(personLife - 1);
            }
        })

        const scores = document.querySelectorAll(".score");
        scores.forEach(score => {
            const scoreBottom = parseInt(score.style.height) + parseInt(score.style.top);
            const scoreRight = parseInt(score.style.width) + parseInt(score.style.left);
            const scoreLeft = parseInt(score.style.left);
            const scoreTop = parseInt(score.style.top);
            if (((_person.left > scoreLeft && _person.left < scoreRight) && (_person.top <= scoreBottom && _person.top > scoreTop))) {
                pickUpScore(score.id);
            }
        })

        const lifes = document.querySelectorAll(".life");
        lifes.forEach(life => {
            const lifeBottom = parseInt(life.style.height) + parseInt(life.style.top);
            const lifeRight = parseInt(life.style.width) + parseInt(life.style.left);
            const lifeLeft = parseInt(life.style.left);
            const lifeTop = parseInt(life.style.top);
            if (((_person.left > lifeLeft && _person.left < lifeRight) && (_person.top <= lifeBottom && _person.top > lifeTop))) {
                pickUpLife(life.id);
            }
        })

        const keys = document.querySelectorAll(".key");
        keys.forEach(key => {
            const keyBottom = parseInt(key.style.height) + parseInt(key.style.top);
            const keyRight = parseInt(key.style.width) + parseInt(key.style.left);
            const keyLeft = parseInt(key.style.left);
            const keyTop = parseInt(key.style.top);
            if (((_person.left > keyLeft && _person.left < keyRight) && (_person.top <= keyBottom && _person.top > keyTop))) {
                pickUpKey(key.id);
            }
        })

        if (pickedKey > 0) {
            const door = document.querySelector(".door");
            const doorBottom = parseInt(door.style.height) + parseInt(door.style.top);
            const doorRight = parseInt(door.style.width) + parseInt(door.style.left);
            const doorLeft = parseInt(door.style.left);
            const doorTop = parseInt(door.style.top);
            if (((_person.left > doorLeft && _person.left < doorRight) && (_person.top <= doorBottom && _person.top > doorTop))) {
                winGame();
            }
        }

        if (top <= 0) {
            top = 0;
            _phisics.moveSpeed = _phisics.defaultMoveSpeed;
        } else if (_phisics.moveSpeed > _phisics.defaultMoveSpeed) {
            _phisics.moveSpeed -= 0.1;
            top -= _phisics.moveSpeed;
        } else {
            _phisics.moveSpeed = _phisics.defaultMoveSpeed;
        }

        _person.top = top;

        setPerson(_person);
        setPhisics(_phisics);
    }
    const moveBottom = () => {
        const _person = { ...person };
        const _phisics = { ...phisics };

        let top = _person.top;

        const walls = document.querySelectorAll(".wall");
        walls.forEach(wall => {
            const wallBottom = parseInt(wall.style.height) + parseInt(wall.style.top);
            const wallRight = parseInt(wall.style.width) + parseInt(wall.style.left);
            const wallLeft = parseInt(wall.style.left);
            const wallTop = parseInt(wall.style.top);
            if (((_person.left > wallLeft && _person.left < wallRight) && (_person.top <= wallBottom && _person.top + _person.width > wallTop))) {
                _person.left = 50;
                top = 250 - 20 / 2;
                _phisics.moveSpeed = _phisics.defaultMoveSpeed;
                setPersonLife(personLife - 1);
            }
        })

        const scores = document.querySelectorAll(".score");
        scores.forEach(score => {
            const scoreBottom = parseInt(score.style.height) + parseInt(score.style.top);
            const scoreRight = parseInt(score.style.width) + parseInt(score.style.left);
            const scoreLeft = parseInt(score.style.left);
            const scoreTop = parseInt(score.style.top);
            if (((_person.left > scoreLeft && _person.left < scoreRight) && (_person.top <= scoreBottom && _person.top + _person.width > scoreTop))) {
                pickUpScore(score.id);
            }
        })
        const keys = document.querySelectorAll(".key");
        keys.forEach(key => {
            const keyBottom = parseInt(key.style.height) + parseInt(key.style.top);
            const keyRight = parseInt(key.style.width) + parseInt(key.style.left);
            const keyLeft = parseInt(key.style.left);
            const keyTop = parseInt(key.style.top);
            if (((_person.left > keyLeft && _person.left < keyRight) && (_person.top <= keyBottom && _person.top + _person.width > keyTop))) {
                pickUpKey(key.id);
            }
        })

        if (top >= boardObject.height - _person.height) {
            top = boardObject.height - _person.height;
        } else {
            _phisics.moveSpeed += 0.3;
            top += phisics.moveSpeed;
        }

        _person.top = top;

        setPerson(_person);
        setPhisics(_phisics);
    }
    const surfBottom = () => {
        const _person = { ...person };
        const _phisics = { ...phisics };

        let top = _person.top;

        const walls = document.querySelectorAll(".wall");
        walls.forEach(wall => {
            const wallBottom = parseInt(wall.style.height) + parseInt(wall.style.top);
            const wallRight = parseInt(wall.style.width) + parseInt(wall.style.left);
            const wallLeft = parseInt(wall.style.left);
            const wallTop = parseInt(wall.style.top);
            if (((_person.left > wallLeft && _person.left < wallRight) && (_person.top <= wallBottom && _person.top + _person.height > wallTop))) {
                _person.left = 50;
                top = 250 - 20 / 2;
                _phisics.moveSpeed = _phisics.defaultMoveSpeed;
                setPersonLife(personLife - 1);
            }
        })

        const scores = document.querySelectorAll(".score");
        scores.forEach(score => {
            const scoreBottom = parseInt(score.style.height) + parseInt(score.style.top);
            const scoreRight = parseInt(score.style.width) + parseInt(score.style.left);
            const scoreLeft = parseInt(score.style.left);
            const scoreTop = parseInt(score.style.top);
            if (((_person.left > scoreLeft && _person.left < scoreRight) && (_person.top <= scoreBottom && _person.top + _person.width > scoreTop))) {
                pickUpScore(score.id);
            }
        })

        const keys = document.querySelectorAll(".key");
        keys.forEach(key => {
            const keyBottom = parseInt(key.style.height) + parseInt(key.style.top);
            const keyRight = parseInt(key.style.width) + parseInt(key.style.left);
            const keyLeft = parseInt(key.style.left);
            const keyTop = parseInt(key.style.top);
            if (((_person.left > keyLeft && _person.left < keyRight) && (_person.top <= keyBottom && _person.top + _person.width > keyTop))) {
                pickUpKey(key.id);
            }
        })

        if (top >= boardObject.height - _person.height) {
            top = boardObject.height - _person.height;
            _phisics.moveSpeed = _phisics.defaultMoveSpeed;
        } else if (_phisics.moveSpeed > _phisics.defaultMoveSpeed) {
            _phisics.moveSpeed -= 0.1;
            top += _phisics.moveSpeed;
        } else {
            _phisics.moveSpeed = _phisics.defaultMoveSpeed;
        }

        _person.top = top;

        setPerson(_person);
        setPhisics(_phisics);
    }

    const animateWallHorisontally = (id, from, to, speed) => {
        const wall = document.getElementById(id);
        const dataAnimate = wall.getAttribute("data-animate");
        const wallLeft = parseFloat(wall.style.left);
        if (dataAnimate === "-1") {
            wall.style.left = (wallLeft + speed) + "px";
            if (wallLeft <= to) {
                wall.setAttribute("data-animate", "1");
            }
        } else {
            wall.style.left = (wallLeft - speed) + "px";
            if (wallLeft >= from) {
                wall.setAttribute("data-animate", "-1")
            }
        }

    }
    const animateWallVertically = (id, from, to, speed) => {
        const wall = document.getElementById(id);
        const dataAnimate = wall.getAttribute("data-animate");
        const wallTop = parseFloat(wall.style.top);
        if (dataAnimate === "-1") {
            wall.style.top = (wallTop + speed) + "px";
            if (wallTop >= to) {
                wall.setAttribute("data-animate", "1");
            }
        } else {
            wall.style.top = (wallTop - speed) + "px";
            if (wallTop <= from) {
                wall.setAttribute("data-animate", "-1")
            }
        }

    }

    return (
        <>
            <div className="game_info">
                <div className="life_container">
                    {Array.from({ length: 4 }, (v, k) => {
                        return (
                            <div key={k} className="life_block" style={{ color: k + 1 <= personLife ? "#cc2a2a" : "#151515" }}>
                                <BsHeartFill />
                            </div>
                        )
                    })}
                </div>
                <div className="score_container">
                    {Array.from({ length: 3 }, (v, k) => {
                        return (
                            <div key={k} className="score_block" style={{ color: k + 1 <= pickedScores ? "#28c037" : "#151515" }}>
                                <AiFillStar />
                            </div>
                        )
                    })}
                </div>
                <div className="key_container">
                    {Array.from({ length: 1 }, (v, k) => {
                        return (
                            <div key={k} className="key_block" style={{ color: k + 1 <= pickedKey ? "#ffd000" : "#151515" }}>
                                <GiKey />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="board_container">
                <div className='board' style={boardObject}>
                    <div id='person' className="main_object" style={person && person}>
                        <div className="shadow"></div>
                    </div>
                    <div className="wall" style={{ width: 150, height: 230, top: 0, left: 0 }}><div className="wall_img"></div></div>
                    <div className="wall" style={{ width: 30, height: 500, top: 0, left: 0 }}><div className="wall_img"></div></div>
                    <div className="wall" style={{ width: 500, height: 50, top: 0, left: 0 }}><div className="wall_img"></div></div>
                    <div className="wall" style={{ width: 200, height: 230, top: 270, left: 0 }}><div className="wall_img"></div></div>
                    <div className="wall" style={{ width: 200, height: 190, top: 270, left: 440 }}><div className="wall_img"></div></div>
                    <div id='animWall1' data-animate="-1" className="wall" style={{ width: 200, height: 100, top: 360, left: 690 }}><div className="wall_img"></div></div>
                    <div className="wall" style={{ width: 100, height: 230, top: 270, left: 790 }}><div className="wall_img"></div></div>
                    <div className="wall" style={{ width: 90, height: 140, top: 90, left: 200 }}><div className="wall_img"></div></div>
                    <div className="wall" style={{ width: 140, height: 60, top: 90, left: 290 }}><div className="wall_img"></div></div>
                    <div className="wall" style={{ width: 70, height: 80, top: 150, left: 360 }}><div className="wall_img"></div></div>
                    <div className="wall" style={{ width: 70, height: 200, top: 230, left: 250 }}><div className="wall_img"></div></div>
                    <div className="wall" style={{ width: 40, height: 70, top: 430, left: 360 }}><div className="wall_img"></div></div>
                    <div className="wall" style={{ width: 150, height: 40, top: 390, left: 250 }}><div className="wall_img"></div></div>
                    <div className="wall" style={{ width: 40, height: 120, top: 230, left: 360 }}><div className="wall_img"></div></div>
                    <div className="wall" style={{ width: 100, height: 30, top: 270, left: 640 }}><div className="wall_img"></div></div>
                    <div className="wall" style={{ width: 30, height: 100, top: 200, left: 710 }}><div className="wall_img"></div></div>
                    <div className="wall" style={{ width: 290, height: 30, top: 200, left: 710 }}><div className="wall_img"></div></div>
                    <div className="wall" style={{ width: 100, height: 30, top: 270, left: 640 }}><div className="wall_img"></div></div>
                    <div className="wall" style={{ width: 190, height: 180, top: 50, left: 480 }}><div className="wall_img"></div></div>
                    <div id='animWall2' data-animate="-1" className="wall" style={{ width: 190, height: 200, top: -40, left: 710 }}><div className="wall_img"></div></div>
                    <div id='door1' className="door" style={{ width: 45, height: 45, top: 10, left: 955 }}><GiDoorway /></div>
                    {scores.filter(x => !x.data.picked).map((x, i) => {
                        return (
                            <div id={x.data.id} key={i} className="score" style={x.style}>{x.data.element}</div>
                        )
                    })}
                    {lifes.filter(x => !x.data.picked).map((x, i) => {
                        return (
                            <div id={x.data.id} key={i} className="life" style={x.style}>{x.data.element}</div>
                        )
                    })}
                    {keys.filter(x => !x.data.picked).map((x, i) => {
                        return (
                            <div id={x.data.id} key={i} className="key" style={x.style}>{x.data.element}</div>
                        )
                    })}
                </div>
            </div >
        </>
    )
}



export default Game