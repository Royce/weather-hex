import React, { useState } from "react";
import { RecoilRoot } from "recoil";

import "./App.css";
import { IconTile } from "./weather/IconTile";
import { neighbors, ring, CubeCoord } from "./hex/coords";
import Picker from "./weather/Picker";
import { Weather } from "./weather/options";

const origin: CubeCoord = [0, 0, 0];
const cells = [origin, ...neighbors(origin), ...ring(origin, 2)];

function App() {
  const scale = 40;

  const [weather, setWeather] = useState<Partial<Weather>>({});
  const [selected, setSelected] = useState<CubeCoord | null>(null);

  return (
    <RecoilRoot>
      <svg
        width={400}
        height={400}
        viewBox="-200 -200 400 400"
        style={{ border: "1px solid black" }}
      >
        {cells.map((coord) => {
          return (
            <IconTile
              key={coord.toString()}
              coord={coord}
              weather={weather}
              highlight={coord === selected}
              scale={scale}
              onClick={() => setSelected(coord)}
            />
          );
        })}
      </svg>

      {selected && <Picker weather={weather} setWeather={setWeather} />}
    </RecoilRoot>
  );
}

export default App;
