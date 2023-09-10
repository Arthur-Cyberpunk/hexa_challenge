import ModalGame from "../src/components/ModalGame";
import "./styles/globals.scss";

import GameProvider from "./contexts/gameContext";

function App() {
  return (
    <GameProvider>
      <ModalGame></ModalGame>
    </GameProvider>
  );
}

export default App;
