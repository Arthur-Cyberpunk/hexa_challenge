import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../contexts/gameContext";
import ScoreLocalStorage from "../../hooks/scoreLocalStorage";
import SideMenu from "../SideMenu";
import "./styles.scss";

const ModalGame = () => {
  const [currentColor, setCurrentColor] = useState("");
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const totalTime = 10;
  const progress = (timeLeft / totalTime) * 100;

  const [highScore, setHighScore] = ScoreLocalStorage("high_score");

  const { colorTime, active, setActive, setSecondsChoose, setColors, secondsLeft, setSecondsLeft } =
    useContext(GameContext);

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const startGame = () => {
    if (secondsLeft === 0) {
      setColors([]);
      setSecondsLeft(4);
    }

    const correctColor = generateRandomColor();
    const randomColor1 = generateRandomColor();
    const randomColor2 = generateRandomColor();

    const randomOptions = [correctColor, randomColor1, randomColor2];
    randomOptions.sort(() => Math.random() - 0.5);

    setCurrentColor(correctColor);
    setOptions(randomOptions);
    setActive(true);
  };

  const checkAnswer = (selectedColor) => {
    setTimeLeft(totalTime);

    colorTime(selectedColor, currentColor);

    if (selectedColor === currentColor) {
      setScore(score + 5);
    } else if (selectedColor === undefined) {
      setScore(score - 2);
    } else {
      setScore(score - 1);
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
    }
  };

  const handleCleanLocalStorage = () => {
    localStorage.clear();
    resetGame();
    setColors([]);
    setHighScore("");
  };

  useEffect(() => {
    let seconds;
    if (secondsLeft > 0 && active) {
      seconds = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      resetGame();
      setActive(false);

      if (highScore < score) {
        setHighScore(score);
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
            <p className="score">High Score {highScore}</p>
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
              <li key={index} onClick={() => checkAnswer(hexaColor)}>
                {hexaColor}
              </li>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="resetAllData">
        <p onClick={handleCleanLocalStorage}>Reset all data</p>
      </div>
    </div>
  );
};

export default ModalGame;
