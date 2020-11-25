import React from "react";
import {
  atom,
  atomFamily,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

import { IconTile } from "../weather/IconTile";
import { neighbors, ring, CubeCoord } from "../hex/coords";
import { Weather } from "../weather/options";

const origin: CubeCoord = [0, 0, 0];
const cells = [origin, ...neighbors(origin), ...ring(origin, 2)];

export const selectedState = atom<CubeCoord | null>({
  key: "selected",
  default: null,
});

export const cellState = atomFamily<Partial<Weather>, CubeCoord>({
  key: "_cell",
  default: (coord) => ({}),
});

function Cell({ coord, scale }: { coord: CubeCoord; scale: number }) {
  const [selected, setSelected] = useRecoilState(selectedState);
  const weather = useRecoilValue(cellState(coord));

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
}

function Board({ scale }: { scale: number }) {
  const setSelected = useSetRecoilState(selectedState);

  const width = scale * 10;

  return (
    <svg
      width={width}
      height={width}
      viewBox={[-width / 2, -width / 2, width, width].join(" ")}
      style={{ border: "1px solid black" }}
    >
      <rect
        width={width}
        height={width}
        fill={"white"}
        x={-width / 2}
        y={-width / 2}
        onClick={() => setSelected(null)}
      />

      {cells.map((coord) => (
        <Cell key={coord.join(",")} coord={coord} scale={scale} />
      ))}
    </svg>
  );
}

export default Board;
