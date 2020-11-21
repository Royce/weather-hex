import React from "react";
import _ from "lodash";

import { all } from "./options";
import Icon from "./Icon";

export function IconGrid() {
  const list = _.chain(all())
    .map((w) => _.omit(w, "temperature"))
    .uniqWith(_.isEqual)
    .value();

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
