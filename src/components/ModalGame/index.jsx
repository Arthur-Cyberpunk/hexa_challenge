import "./styles.scss";

const ModalGame = () => {
  return (
    <div className="container">
      <div className="boxGuessColor">
        <h1 className="title">Guess the color</h1>
        <div className="boxTime">
          <p className="time">Remaning <br /> Time (s) <br /> 30</p>
          <p className="time">Restart</p>
          <div className="boxScore">
            <p className="score">High Score 20</p>
            <p className="score">Score -</p>
          </div>
        </div>
        <div className="boxColor">
          <button>Start</button>
        </div>
      </div>
    </div>
  );
};

export default ModalGame;
