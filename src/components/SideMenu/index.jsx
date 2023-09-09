import SVGCheck from "../../icons/SVGCheck";
import SVGWrong from "../../icons/SVGWrong";
import "./styles.scss";

const SideMenu = () => {
  return (
    <div className="containerr">
      <span className="title">Current/Lastest game</span>
      <div className="boxSubTitles">
        <p>
          Guessed <br /> Color
        </p>
        <p>
          Correct <br /> Color
        </p>
        <p>Score</p>
      </div>
      <div className="boxInfo">
        <div className="color">
          <p className="hexaColor">#b9bfc9</p>
        </div>
        <span className="seconds">
          <SVGCheck />
          2s
        </span>
      </div>
      <div className="boxInfo">
        <div className="color">
          <p className="hexaColor">#b9bfc9</p>
        </div>
        <span className="seconds">
          <SVGWrong />
          5s
        </span>
      </div>
      
    </div>
  );
};

export default SideMenu;
