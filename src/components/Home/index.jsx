import { useState } from "react";
import paletaColors from "../../assets/paletaColors.png";
import shield from "../../assets/shield.png";
import skull from "../../assets/skull.png";
import sword from "../../assets/sword.png";
import TutorialModal from '../TutorialModal';
import "./styles.scss";

const Home = () => {
    const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="containerHome">
      <div className="boxTitleColors">
        <img className="paletaColors" src={paletaColors} alt="Paleta Colors" />
        <h1 className="title">
          Welcome to <br /> Hexa Challenge
        </h1>
      </div>
      <div className="options">
        <label htmlFor="nickName">Nickname:</label>
        <input
          className="nickNameInput"
          type="text"
          name="nickName"
          id="nickName"
          placeholder="Enter your nickname"
        />
        <div className="difficult">
          <span className="titleLevels">Choose your difficult level</span>
          <div className="boxOptions">
            <p className="difficultLevel">Easy </p>{" "}
            <img className="iconsDaora" src={shield} alt="" />
          </div>
          <div className="boxOptions">
            <p className="difficultLevel">Normal</p>{" "}
            <img className="iconsDaora" src={sword} alt="" />
          </div>
          <div className="boxOptions">
            <p className="difficultLevel">Hard</p>{" "}
            <img className="iconsDaora" src={skull} alt="" />
          </div>
        </div>
        <p className="tutorial" onClick={() => setModalOpen(true)}>Tutorial</p>
      </div>
      {modalOpen ? (
        <TutorialModal setModalOpen={setModalOpen} />
      ) : (
        <></>
      )}
      
    </div>
  );
};

export default Home;
