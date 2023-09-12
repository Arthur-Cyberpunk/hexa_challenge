import SVGx from "../../icons/SVGx";
import "./styles.scss";

const TutorialModal = (props) => {
    const closeModal = () => {
        props.setModalOpen(false)
      }

  return (
    <div className="containerTutorialModal">
        
      <div>
        <span>Goals</span>
        <span className="iconX" onClick={closeModal}><SVGx /></span>
        <p>
          The game consists of matching as many colors as possible in 30s. When
          the game starts, a random color will appear and for it you must 3
          hexadecimal answer options appear. Being two incorrect, and one
          correct. Every round, a new color appears, and the player will have
          10s to respond and result in gain or loss of score and time: <br />{" "}
          <br /> - If the player does not respond in time, he loses 2 points.{" "}
          <br /> - If the player answers in time but wrong, you will lose 1
          point and 3 seconds. <br /> - If the player responds in time and
          correctly, you will earn 5 points and 3 seconds.
        </p>
      </div>
      <div>
        <span>Enter your nickname</span>
        <p>
          If you want to link your name to the high score, if you reach it,
          enter your name.
        </p>
      </div>
      <div>
        <span>Difficulty</span>
        <p>
          There are three difficulties: <br /> <br /> - Easy - 3 colors options.{" "}
          <br /> - Normal - 4 colors options. <br /> - Hard - 5 colors
          options.
        </p>
      </div>
    </div>
  );
};

export default TutorialModal;
