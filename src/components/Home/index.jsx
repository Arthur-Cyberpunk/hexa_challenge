import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import paletaColors from "../../assets/paletaColors.png";
import shield from "../../assets/shield.png";
import skull from "../../assets/skull.png";
import sword from "../../assets/sword.png";
import { GameContext } from "../../contexts/gameContext";
import DifficultyLocalStorage from "..//../store/difficultyLocalStorage";
import TutorialModal from "../TutorialModal";
import "./styles.scss";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { nickName, setNickName, chooseDifficulty, setChooseDifficulty } =
    useContext(GameContext);

  const [difficultyStorage, setDifficultyStorage] =
    DifficultyLocalStorage("difficulty");

  const takeDifficuties = (props) => {
    setChooseDifficulty(props);
    setDifficultyStorage(props);
  };

  return (
    <div className="containerHome">
      <div className="boxTitleColors">
        <img className="paletaColors" src={paletaColors} alt="Paleta Colors" />
        <h1 className="title">
          Welcome to <br /> Hexa Challenge
        </h1>
      </div>
      <Link to={chooseDifficulty ? "/game" : "#"}>
        <button className="startButton">Start</button>
      </Link>
      <div className="options">
        <label htmlFor="nickName">Nickname:</label>
        <input
          className="nickNameInput"
          type="text"
          name="nickName"
          id="nickName"
          placeholder="Enter your nickname"
          maxlength="5"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
        />
        <div className="difficulty">
          <span className="titleLevels">Choose your difficult level</span>
          <div className="boxOptions">
            <p
              className="difficultyLevel"
              onClick={() => takeDifficuties("easy")}
            >
              Easy{" "}
            </p>{" "}
            {chooseDifficulty === "easy" ? (
              <img className="iconsDifficulty" src={shield} alt="" />
            ) : (
              <></>
            )}
          </div>
          <div className="boxOptions">
            <p
              className="difficultyLevel"
              onClick={() => takeDifficuties("medium")}
            >
              Medium
            </p>{" "}
            {chooseDifficulty === "medium" ? (
              <img className="iconsDifficulty" src={sword} alt="" />
            ) : (
              <></>
            )}
          </div>
          <div className="boxOptions">
            <p
              className="difficultyLevel"
              onClick={() => takeDifficuties("hard")}
            >
              Hard
            </p>{" "}
            {chooseDifficulty === "hard" ? (
              <img className="iconsDifficulty" src={skull} alt="" />
            ) : (
              <></>
            )}
          </div>
        </div>
        <p className="tutorial" onClick={() => setModalOpen(true)}>
          Tutorial
        </p>
      </div>
      {modalOpen ? <TutorialModal setModalOpen={setModalOpen} /> : <></>}
    </div>
  );
};

export default Home;
