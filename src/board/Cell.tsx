import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { IconTile } from "../weather/IconTile";
import { CubeCoord } from "../hex/coords";
import { selectedState } from "./selectedState";
import { cellState } from "./cellState";

export function Cell({ coord, scale }: { coord: CubeCoord; scale: number }) {
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
