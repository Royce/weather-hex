import _ from "lodash";
import {
  ok,
  skyScale,
  temperatureScale,
  Water,
  Weather,
  windScale,
} from "./options";
import { uniquePairs } from "./uniquePairs";

export function mix(a: Weather, b: Weather): Weather {
  const options = mixes(a, b);
  return _.shuffle(options)[0];
}

export function mixes(a: Weather, b: Weather): Weather[] {
  const waterList: Water[] = _.uniq(["dry", ...a.water, ...b.water]);
  const temperatures = mixUsingScale(
    a.temperature,
    b.temperature,
    temperatureScale
  );
  const winds = mixUsingScale(a.wind, b.wind, windScale);
  const skies = mixUsingScale(a.sky, b.sky, skyScale);

  var list: Weather[] = [];
  for (const temperature of temperatures) {
    for (const wind of winds) {
      for (const sky of skies) {
        for (const water of waterList) {
          const weather = { temperature, wind, sky, water: [water] };
          if (ok(weather)) list.push(weather);
        }
        for (const waterPair of uniquePairs(waterList)) {
          const weather = { temperature, wind, sky, water: waterPair };
          if (ok(weather, { skipWaterExclusiveTest: false }))
            list.push(weather);
        }
      }
    }
  }

  return list;
}

function mixUsingScale<T>(a: T, b: T, scale: T[]): [T] | [T, T] {
  if (a === b) return [a];

  const average = (scale.indexOf(a) + scale.indexOf(b)) / 2;

  if (Math.floor(average) === Math.ceil(average)) {
    return [scale[Math.floor(average)]];
  } else {
    return [scale[Math.floor(average)], scale[Math.ceil(average)]];
  }
}
