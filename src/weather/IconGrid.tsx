import React from "react";
import _ from "lodash/fp";

import { all, Weather } from "./options";
import Icon from "./Icon";

export function IconGrid() {
  const list = _.uniqBy<Weather>(
    ({ sky, wind, water }) => [sky, wind, ...water].join(" "),
    all()
  );

  return (
    <div
      style={{ display: "grid", grid: "auto-flow 100px / repeat(4, 120px)" }}
    >
      {list.map((item) => (
        <div
          style={{
            flexDirection: "column",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Icon weather={item} size={30} />
          <div>{item.sky}</div>
          <div>{item.wind}</div>
          <div>{item.water.join(", ")}</div>
        </div>
      ))}
    </div>
  );
}
