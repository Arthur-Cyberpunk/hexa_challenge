import { useContext, useEffect } from "react";
import HistoricColorLocalStorage from '../../hooks/historicColorLocalStorage';
import SVGCheck from "../../icons/SVGCheck";
import SVGWrong from "../../icons/SVGWrong";
import "./styles.scss";

import { GameContext } from "../../contexts/gameContext";

const SideMenu = () => {
  const { colors, active } = useContext(GameContext);

  const [color, setColor] = HistoricColorLocalStorage("colorAndTime");

  useEffect (() => {
    if (active)
    setColor(colors)
  }, [colors, setColor])

  console.log(color)

  return (
    <div className="containerSideMenu">
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
      {color ? (
              <div className="boxInfo">
              {color.map((colors, index) => {
                return (
                  <div className="answers">
                    <div
                      className="color"
                      style={{ backgroundColor: `${colors.selectedColor}` }}
                    >
                      <p key={index} className="hexaColor">
                        {colors.selectedColor}
                      </p>
                    </div>
                    <div
                      className={`color ${colors.currentColor ? "" : "active"}`}
                      style={{ backgroundColor: `${colors.currentColor}` }}
                    >
                      <p key={index} className="hexaColor">
                        {colors.currentColor ? colors.currentColor : ""}
                      </p>
                    </div>
                    <span className="seconds">
                      {colors.currentColor ? <SVGWrong /> : <SVGCheck />}
                      {colors.secondsChoose}s
                    </span>
                  </div>
                );
              })}
            </div>
      ) : (
        <></>
      )}

    </div>
  );
};

export default SideMenu;
