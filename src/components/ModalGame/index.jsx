import { useState } from "react";
import "./styles.scss";

const ModalGame = () => {
  const [color, setColor] = useState([]);
  const [appearColor, setAppear] = useState(false);

  const randomColors = () => {
    for (let i = 0; i < 3; i++) {
      const hex = ((Math.random() * 0xffffff) << 0).toString(16);
      setColor((prevArray) => [...prevArray, `#${hex}`]);
    }
    setAppear(true)
  };

  const handleClick = (value) => {
    alert(`Você clicou em: ${value}`);
  };

  const restart = () => {
    setColor([''])
    setAppear(false)
  }

  return (
    <div className="container">
      <div className="boxGuessColor">
        <h1 className="title">Guess the color</h1>
        <div className="boxTime">
          <p className="time">
            Remaning <br /> Time (s) <br /> 30
          </p>
          <span className="restartGame" onClick={restart}>Restart</span>
          <div className="boxScore">
            <p className="score">High Score 20</p>
            <p className="score">Score -</p>
          </div>
        </div>
        <div className="boxColor">
          <button className="start" onClick={randomColors}>
            Start
          </button>
        </div>
        {appearColor ? (
          <div className="boxRandomColors">
            {color.map((hexaColor, index) => (
              <li key={index} onClick={() => handleClick(hexaColor)}>{hexaColor}</li>
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
