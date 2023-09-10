import { useContext } from "react";
import SVGCheck from "../../icons/SVGCheck";
import "./styles.scss";

import { GameContext } from "../../contexts/gameContext";

const SideMenu = () => {
  const { colors } = useContext(GameContext);

  console.log(colors)

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
                <div className="color" style={{ backgroundColor: `${color.selectedColor}` }}>
                  <p key={index} className="hexaColor" >
                    {color.selectedColor}
                  </p>
                </div>
                <span className="seconds">
                  <SVGCheck />
                  {color.secondsChoose}
                </span>
              </div>
            );
          })}
        </div>
    </div>
  );
};

export default SideMenu;
