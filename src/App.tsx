import React from "react";
import { RecoilRoot } from "recoil";

import Board from "./board/Board";
import { CellWeatherEditor } from "./board/CellWeatherEditor";

function App() {
  return (
    <RecoilRoot>
      <Board scale={40} />
      <CellWeatherEditor />
    </RecoilRoot>
  );
}

export default App;
