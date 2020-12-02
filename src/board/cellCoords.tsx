import { neighbors, ring, CubeCoord, addCoord } from "../hex/coords";

const origin: CubeCoord = [0, 0, 0];

export const all = [origin, ...neighbors(origin), ...ring(origin, 2)];

export const primaries = [
  origin,
  ...neighbors(origin).map((c) => addCoord(c, c)),
];
