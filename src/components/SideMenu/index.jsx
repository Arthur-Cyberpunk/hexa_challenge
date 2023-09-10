import { useContext } from "react";
import SVGCheck from "../../icons/SVGCheck";
import SVGWrong from "../../icons/SVGWrong";
import "./styles.scss";

import { GameContext } from "../../contexts/gameContext";

const SideMenu = () => {
  const { colors, secondsChoose } = useContext(GameContext);

  console.log(secondsChoose);

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
        {colors.map((color, index) => {
          return (
            <div className="answers">
              <div
                className="color"
                style={{ backgroundColor: `${color.selectedColor}` }}
              >
                <p key={index} className="hexaColor">
                  {color.selectedColor}
                </p>
              </div>
              <div
                className={`color ${color.currentColor ? "" : "active"}`}
                style={{ backgroundColor: `${color.currentColor}` }}
              >
                <p key={index} className="hexaColor">
                  {color.currentColor ? color.currentColor : ""}
                </p>
              </div>
              <span className="seconds">
                {color.currentColor ? <SVGWrong /> : <SVGCheck />}
                {color.secondsChoose}s
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
