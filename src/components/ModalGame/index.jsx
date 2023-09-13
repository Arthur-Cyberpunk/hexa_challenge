import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "../../contexts/gameContext";
import NickNameLocalStorage from "../../store/nickNameLocalStorage";
import ScoreLocalStorage from "../../store/scoreLocalStorage";
import SideMenu from "../SideMenu";
import "./styles.scss";

const ModalGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const totalTime = 10;
  const progress = (timeLeft / totalTime) * 100;

  const [highScore, setHighScoreStorage] = ScoreLocalStorage("high_score");
  const [nickNameStorage, setNickNameStorage] =
    NickNameLocalStorage("nick_name");

  const {
    colorTime,
    active,
    setActive,
    setSecondsChoose,
    setColors,
    secondsLeft,
    setSecondsLeft,
    currentColor,
    setCurrentColor,
    options,
    setOptions,
    startGame,
    chooseDifficulty,
    setChooseDifficulty,
    nickName,
  } = useContext(GameContext);

  const checkAnswer = (selectedColor) => {
    setTimeLeft(totalTime);

    colorTime(selectedColor, currentColor);

    if (selectedColor === currentColor) {
      setScore(score + 5);
      setSecondsLeft(secondsLeft + 3);
    } else if (selectedColor === undefined) {
      setScore(score - 2);
    } else {
      setScore(score - 1);
      setSecondsLeft(secondsLeft - 3);
    }

    startGame();
  };

  const resetGame = () => {
    setCurrentColor("");
    setOptions([]);
    setScore(0);
    setTimeLeft(totalTime);
    setSecondsChoose(0);
  };

  const restartGame = () => {
    if (active) {
      resetGame();
      setColors([]);
      startGame();
      setActive(true);
      setSecondsLeft(30);
    }
  };

  const handleCleanLocalStorage = () => {
    localStorage.clear();
    resetGame();
    setColors([]);
    setHighScoreStorage("");
    setNickNameStorage("");
    setChooseDifficulty('')
    setSecondsLeft(10);
    setActive(false);
  };

  useEffect(() => {
    let seconds;
    if (secondsLeft > 0 && active) {
      seconds = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
    } else if (secondsLeft <= 0) {
      resetGame();
      setActive(false);
      setSecondsLeft(0);

      if (highScore < score) {
        setHighScoreStorage(score);
        setNickNameStorage(nickName);
      }
    }

    return () => clearTimeout(seconds);
  }, [secondsLeft, active]);

  useEffect(() => {
    if (active) {
      const timer = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          setTimeLeft(totalTime);
          checkAnswer();
        }
      }, 1000);

      setSecondsChoose(10 - timeLeft);
      return () => {
        clearInterval(timer);
      };
    }
  }, [active, timeLeft]);

  return (
    <div className="container">
      <SideMenu></SideMenu>
      <div className="boxGuessColor">
        <h1 className="title">Guess the color</h1>
        <div className="boxTime">
          <p className="time">
            Remaning <br /> Time (s) <br /> {secondsLeft}
          </p>
          <span
            className={`restartGame ${active ? "active" : ""}`}
            style={{ cursor: !active ? "not-allowed" : "pointer" }}
            onClick={restartGame}
          >
            Restart
          </span>
          <div className="boxScore">
            <p className="score">High Score: {highScore}</p>
            <p className="nickName">Nickname: {nickNameStorage}</p>
            <p className="score">{`Score ${score ? score : "-"}`}</p>
          </div>
        </div>
        <div className="timer-container">
          <div className="timer-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="boxColor" style={{ backgroundColor: currentColor }}>
          <button
            className={`start ${active ? "active" : ""}`}
            onClick={startGame}
          >
            Start
          </button>
        </div>
        {active ? (
          <div className="boxRandomColors">
            {options.map((hexaColor, index) => (
              <li
                className={`${
                  chooseDifficulty === "easy"
                    ? "active"
                    : chooseDifficulty === "medium"
                    ? "active2"
                    : "active3"
                }`}
                key={index}
                onClick={() => checkAnswer(hexaColor)}
              >
                {hexaColor}
              </li>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="backHome">
        <Link to='/' onClick={handleCleanLocalStorage}>
        <p>Back to home</p>
        </Link>
      </div>
      <div className="resetAllData">
        <p onClick={handleCleanLocalStorage}>Reset all data</p>
      </div>
    </div>
  );
};

export default ModalGame;
