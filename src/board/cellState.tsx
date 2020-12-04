import _ from "lodash/fp";
import { atomFamily, selectorFamily } from "recoil";

import { neighbors, CubeCoord } from "../hex/coords";
import { Weather } from "../weather/options";
import { mix } from "../weather/mix";

import { primaries } from "./cellCoords";

const _cellState = atomFamily<Weather | null, CubeCoord>({
  key: "_cell",
  default: (coord) => null,
});

export const cellState = selectorFamily<Weather | null, CubeCoord>({
  key: "cell",
  get: (coord) => ({ get }) => {
    if (_.some((c) => _.isEqual(c, coord), primaries))
      return get(_cellState(coord));

    const [a, b] = _.intersectionWith(_.isEqual, neighbors(coord), primaries);
    const w1 = get(_cellState(a));
    const w2 = get(_cellState(b));

    return w1 && w2 && mix(w1, w2);
  },
  set: (coord) => ({ set }, value) => {
    if (_.some((c) => _.isEqual(c, coord), primaries))
      return set(_cellState(coord), value);

    throw new Error(`Can not set state at ${coord.join(",")}`);
  },
});
