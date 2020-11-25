import React from "react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";

import "./App.css";
import Picker from "./weather/Picker";
import Board, { selectedState, cellState } from "./board/Board";

function PickerForSelectedCell() {
  const selected = useRecoilValue(selectedState);
  const [weather, setWeather] = useRecoilState(
    cellState(selected || [NaN, NaN, NaN])
  );

  return (
    <React.Fragment>
      {selected && <Picker weather={weather} setWeather={setWeather} />}
    </React.Fragment>
  );
}

function App() {
  return (
    <RecoilRoot>
      <Board scale={40} />
      <PickerForSelectedCell />
    </RecoilRoot>
  );
}

export default App;
