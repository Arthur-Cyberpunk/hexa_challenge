import { useEffect, useState } from "react";
import "./styles.scss";

const ModalGame = () => {
  const [currentColor, setCurrentColor] = useState('');
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(2);
  const [active, setActive] = useState(false);

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const startGame = () => {
    if (secondsLeft === 0) {
        setSecondsLeft(2)
    }
    
    const correctColor = generateRandomColor();
    const randomColor1 = generateRandomColor();
    const randomColor2 = generateRandomColor();

    const randomOptions = [correctColor, randomColor1, randomColor2];
    randomOptions.sort(() => Math.random() - 0.5);

    setCurrentColor(correctColor);
    setOptions(randomOptions);
    setActive(true)
  }

  const checkAnswer = (selectedColor) => {
    console.log(currentColor)
    console.log(selectedColor)
    
    if (selectedColor === currentColor) {
      setScore(score + 5);
    } else if (selectedColor !== currentColor) {
        setScore(score - 1);
    }
    startGame();
  }

  useEffect(() => {
    let seconds;
    if (secondsLeft > 0 && active) {
        seconds = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setCurrentColor('');
      setActive(false)
    }

    return () => clearTimeout(seconds);
  }, [secondsLeft, active]);

  const restartGame = () => {
    setCurrentColor('');
    setOptions([]);
    setScore(0);
    setSecondsLeft(2);
    startGame();
    setActive(true)
  }

  return (
    <div className="container">
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
            <p className="score">High Score 20</p>
            <p className="score">{`Score ${score ? score : "-"}`}</p>
          </div>
        </div>
        <div className="boxColor" style={{backgroundColor: currentColor}}>
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
