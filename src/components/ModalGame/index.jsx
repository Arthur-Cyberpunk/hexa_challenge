import { useEffect, useState } from "react";
import "./styles.scss";

const ModalGame = () => {
  const [color, setColor] = useState([]);
  const [appearColor, setAppear] = useState(false);
  const [seconds, setSeconds] = useState(5);
  const [isActive, setIsActive] = useState(false);

  const randomColors = () => {
    for (let i = 0; i < 3; i++) {
      const hex = ((Math.random() * 0xffffff) << 0).toString(16);
      setColor((prevArray) => [...prevArray, `#${hex}`]);
    }
    setAppear(true);
    setIsActive(true);
  };

  const handleClick = (value) => {
    alert(`Você clicou em: ${value}`);
  };

  const restart = () => {
    setColor([]);
    setAppear(false);
    setIsActive(false);
    setSeconds(5)
  };

  useEffect(() => {
    let intervalId;

    if (isActive && seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      setIsActive(false);
      clearInterval(intervalId);
      restart();
      setSeconds(5)
    }

    return () => clearInterval(intervalId);
  }, [isActive, seconds]);

  return (
    <div className="container">
      <div className="boxGuessColor">
        <h1 className="title">Guess the color</h1>
        <div className="boxTime">
          <p className="time">
            Remaning <br /> Time (s) <br /> {seconds}
          </p>
          <span
            className={`restartGame ${isActive ? "active" : ""}`}
            onClick={restart}
          >
            Restart
          </span>
          <div className="boxScore">
            <p className="score">High Score 20</p>
            <p className="score">Score -</p>
          </div>
        </div>
        <div className="boxColor">
          <button
            className={`start ${isActive ? "active" : ""}`}
            onClick={randomColors}
          >
            Start
          </button>
        </div>
        {appearColor ? (
          <div className="boxRandomColors">
            {color.map((hexaColor, index) => (
              <li key={index} onClick={() => handleClick(hexaColor)}>
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
