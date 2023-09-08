import { useEffect, useState } from "react";
import "./styles.scss";

const ModalGame = () => {
  const [color, setColor] = useState([]);
  const [appearColor, setAppear] = useState(false);
  const [seconds, setSeconds] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');

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
    setSelectedColor('')
  };

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      console.log('alo')

      const randomIndex = Math.floor(Math.random() * color.length);
      setSelectedColor(color[randomIndex]);
    } else {
      clearInterval(intervalId);
      restart();
    }

    return () => clearInterval(intervalId);
  }, [isActive]);

  useEffect(() => {
    if (seconds === 0) {
        setIsActive(false);
    }
  }, [seconds])

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
        <div className="boxColor" style={{backgroundColor: selectedColor}}>
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
