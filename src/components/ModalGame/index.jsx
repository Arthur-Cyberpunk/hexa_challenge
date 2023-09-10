import { useContext, useEffect, useState } from "react";
import SideMenu from "../SideMenu";
import "./styles.scss";

import { GameContext } from "../../contexts/gameContext";

const ModalGame = () => {
  const [currentColor, setCurrentColor] = useState("");
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(15);
  const [timeLeft, setTimeLeft] = useState(10); // Tempo inicial em segundos
  const totalTime = 10; // Tempo total em segundos
  const progress = (timeLeft / totalTime) * 100;

  const { colorTime, active, setActive, setSecondsChoose, setColors } =
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
        setColors([])
      setSecondsLeft(15);
    }

    const correctColor = generateRandomColor();
    const randomColor1 = generateRandomColor();
    const randomColor2 = generateRandomColor();

    const randomOptions = [correctColor, randomColor1, randomColor2];
    randomOptions.sort(() => Math.random() - 0.5);

    setCurrentColor(correctColor);
    //setSecondsChoose(10 - timeLeft);
    setOptions(randomOptions);
    setActive(true);

  };

  const checkAnswer = (selectedColor) => {
    setTimeLeft(totalTime);
    //setSecondsChoose(( prevCount ) => prevCount + (10 - timeLeft))

    colorTime(selectedColor, currentColor, active);

    if (selectedColor === currentColor) {
      setScore(score + 5);
    } else if (selectedColor === undefined) {
      setScore(score - 2);
    } else {
      setScore(score - 1);
    }

    startGame();
  };

  useEffect(() => {
    let seconds;
    if (secondsLeft > 0 && active) {
      seconds = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
        //setSecondsChoose(+ 1)
      }, 1000);
    } else if (secondsLeft === 0) {
      setCurrentColor("");
      setOptions([]);
      setScore(0);
      setActive(false);
      setTimeLeft(totalTime);
      setSecondsChoose(0)

      if (highScore < score) {
        setHighScore(score);
      }
    }

    return () => clearTimeout(seconds);
  }, [secondsLeft, active]);

  const restartGame = () => {
    setCurrentColor("");
    setOptions([]);
    setScore(0);
    setSecondsLeft(30);
    startGame();
    setActive(true);
    setTimeLeft(totalTime);
    setColors([])
    setSecondsChoose(0)
  };

  useEffect(() => {
    const masterScore = localStorage.getItem("high_score");

    if (masterScore !== null) {
      setHighScore(masterScore);
    }
  }, []);

  useEffect(() => {
    if (highScore > 0) {
      localStorage.setItem("high_score", `${highScore}`);
    }
  }, [highScore]);

  useEffect(() => {
    if (active) {
      const timer = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);

        } else {
          // Quando o tempo atinge zero, reinicie instantaneamente
          setTimeLeft(totalTime);
          checkAnswer();
        }
      }, 1000);
      
      setSecondsChoose(10 - timeLeft)
      return () => {
        clearInterval(timer); // Limpa o temporizador quando o componente é desmontado
      };
    }
  }, [active, timeLeft, totalTime]);

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
    </div>
  );
};

export default ModalGame;
