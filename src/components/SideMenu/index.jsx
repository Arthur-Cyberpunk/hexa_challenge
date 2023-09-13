import { useContext, useEffect } from "react";
import SVGCheck from "../../icons/SVGCheck";
import SVGWrong from "../../icons/SVGWrong";
import ColorHistoryLocalStorage from "../../store/colorHistoryLocalStorage";
import "./styles.scss";

import { GameContext } from "../../contexts/gameContext";

const SideMenu = () => {
  const { colors, active, secondsLeft } = useContext(GameContext);

  const [color, setColor] = ColorHistoryLocalStorage("colorAndTime");

  useEffect(() => {
    if (active && secondsLeft >= 0) setColor(colors);
  }, [colors, setColor]);

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
                  style={{
                    backgroundColor: `${colors.selectedColor}`,
                    color: `${colors.textColor1}`,
                  }}
                >
                  <p key={index} className="hexaColor">
                    {colors.selectedColor}
                  </p>
                </div>
                <div
                  className={`color ${colors.currentColor ? "" : "active"}`}
                  style={{
                    backgroundColor: `${colors.currentColor}`,
                    color: `${colors.textColor2}`,
                  }}
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
