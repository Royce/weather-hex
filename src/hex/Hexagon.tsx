import React from "react";

export type CenterAndRadius = { cx: number; cy: number; r: number };

export function hexPointsString({ cx, cy, r }: CenterAndRadius) {
  var points: string[] = [];

  for (var theta = 0; theta < Math.PI * 2; theta += Math.PI / 3) {
    points.push(
      (cx + r * Math.sin(theta)).toString() +
        "," +
        (cy + r * Math.cos(theta)).toString()
    );
  }

  return points.join(" ");
}

export function Hexagon(
  props: CenterAndRadius &
    Pick<
      React.SVGAttributes<SVGPolygonElement>,
      "stroke" | "strokeWidth" | "fill" | "fillOpacity" | "onClick"
    >
) {
  return <polygon points={hexPointsString(props)} {...props} />;
}
