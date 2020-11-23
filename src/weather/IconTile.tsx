import React from "react";

import Icon from "./Icon";
import { Weather } from "./options";
import { temperatureColor } from "./temperatureColor";

import { cubeCoordToPixel, CubeCoord } from "../hex/coords";
import { Hexagon } from "../hex/Hexagon";

type TileProps = {
  coord: CubeCoord;
  weather: Partial<Weather>;
  highlight: boolean;
  scale: number;
  onClick: () => void;
};

export function IconTile({
  coord,
  weather,
  highlight = false,
  scale,
  onClick,
}: TileProps) {
  const [cx, cy] = cubeCoordToPixel(coord, scale);
  const r = scale - 2;

  return (
    <React.Fragment>
      <g transform={`translate(${cx - r / 2},${cy - r / 2})`}>
        <Icon weather={weather} size={r} />
      </g>
      <Hexagon
        cx={cx}
        cy={cy}
        r={r}
        strokeWidth={highlight ? "2px" : "1px"}
        stroke={highlight ? "black" : "grey"}
        fillOpacity={0.1}
        fill={temperatureColor(weather)}
        onClick={onClick}
      />
    </React.Fragment>
  );
}
