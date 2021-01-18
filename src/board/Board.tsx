import React from "react";
import { useSetRecoilState } from "recoil";

import { Cell } from "./Cell";
import { all } from "./cellCoords";
import { selectedState } from "./selectedState";

function Board({ scale }: { scale: number }) {
  const setSelected = useSetRecoilState(selectedState);

  const width = scale * 10;

  return (
    <svg
      width={width}
      height={width}
      viewBox={[-width / 2, -width / 2, width, width].join(" ")}
    >
      <rect
        width={width}
        height={width}
        fill={"white"}
        x={-width / 2}
        y={-width / 2}
        onClick={() => setSelected(null)}
      />

      {all.map((coord) => (
        <Cell key={coord.join(",")} coord={coord} scale={scale} />
      ))}
    </svg>
  );
}

export default Board;
