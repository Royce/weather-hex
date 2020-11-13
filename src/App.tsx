import React from "react";
import { RecoilRoot } from "recoil";
import { WiDaySunnyOvercast } from "react-icons/wi";

import "./App.css";
import { Tile } from "./hex/Tile";
import { cubeCoordToPixel, neighbors, ring } from "./hex/coords";

function App() {
  const scale = 40;
  const origin: [number, number, number] = [0, 0, 0];
  const cells = [origin, ...neighbors(origin), ...ring(origin, 2)];
  return (
    <RecoilRoot>
      <svg
        width={400}
        height={400}
        viewBox="-200 -200 400 400"
        style={{ border: "1px solid black" }}
      >
        {cells.map((coord) => {
          const [cx, cy] = cubeCoordToPixel(coord, scale);
          return (
            <Tile cx={cx} cy={cy} r={scale - 2}>
              <WiDaySunnyOvercast size={scale - 2} />
            </Tile>
          );
        })}
      </svg>
    </RecoilRoot>
  );
}

export default App;
