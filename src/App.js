import { Route, Routes } from "react-router-dom";
import Home from "../src/components/Home";
import ModalGame from "../src/components/ModalGame";

import "./styles/globals.scss";

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="game" element={<ModalGame />} />
      </Routes>
    </>
  );
}

export default App;
