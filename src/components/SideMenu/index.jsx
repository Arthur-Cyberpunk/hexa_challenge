import "./styles.scss";

const SideMenu = () => {
    return (
        <div className="containerr">
            <span className="title">Current/Lastest game</span>
            <div className="boxSubTitles">
                <p>GUESSED COLOR</p>
                <p>CORRECT COLOR</p>
                <p>SCORE</p>
            </div>
            <div className="boxInfo">
                <span className="color">COR</span>
                <span className="seconds">TEMPO</span>
            </div>
        </div>
    )
}

export default SideMenu
