import React from "react";

import { Hexagon } from "./Hexagon";

type TileProps = {
  cx: number;
  cy: number;
  r: number;
  children: JSX.Element;
};
export function Tile({ children, cx, cy, r }: TileProps) {
  const iconSize = r;

  return (
    <React.Fragment>
      <Hexagon
        cx={cx}
        cy={cy}
        r={r}
        strokeWidth="2px"
        stroke="black"
        fillOpacity={0}
      />
      <circle cx={cx} cy={cy} r={2} fill="red" />
      <g transform={`translate(${cx - iconSize / 2},${cy - iconSize / 2})`}>
        {children}
      </g>
    </React.Fragment>
  );
}
