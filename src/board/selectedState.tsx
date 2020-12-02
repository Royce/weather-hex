import { atom } from "recoil";
import { CubeCoord } from "../hex/coords";

export const selectedState = atom<CubeCoord | null>({
  key: "selected",
  default: null,
});
