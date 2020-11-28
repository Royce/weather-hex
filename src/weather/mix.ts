import _ from "lodash";
import {
  ok,
  skyScale,
  temperatureScale,
  Water,
  Weather,
  windScale,
  waterList,
  WaterGroup,
} from "./options";

export function mix(a: Weather, b: Weather): Weather {
  const options = mixes(a, b);
  return _.sample(options) as Weather;
}

const adjacentWater: { [K in Water]?: Water[] } = {
  "heavy rain": ["heavy rain", "light rain"],
  "light rain": _.without(waterList, "heavy snowfall", "light snowfall"),
  "heavy snowfall": ["heavy snowfall", "light snowfall"],
  "light snowfall": _.without(waterList, "heavy rain", "light rain"),
  dry: _.without(waterList, "heavy snowfall", "heavy rain"),
  lightning: ["lightning", "dry"],
  hail: ["hail", "dry"],
  fog: ["fog", "dry"],
};

export function mixes(a: Weather, b: Weather): Weather[] {
  var x: [Water, Water][] = [];

  const [a1, a2] = a.water.map((w) => adjacentWater[w] || waterList);
  const [b1, b2] = b.water.map((w) => adjacentWater[w] || waterList);

  for (const w1 of _.intersection(a1, b1)) {
    for (const w2 of a2 && b2 ? _.intersection(a2, b2) : a2 || b2 || ["dry"]) {
      x.push(_.sortBy([w1, w2]) as [Water, Water]);
    }
  }

  for (const w1 of b2 ? _.intersection(a1, b2) : a1) {
    for (const w2 of a2 ? _.intersection(a2, b1) : b1) {
      x.push(_.sortBy([w1, w2]) as [Water, Water]);
    }
  }

  const waterPairs = _.chain(x)
    .map<WaterGroup>(([item1, item2]) =>
      item1 === "dry" && item2
        ? [item2]
        : item2 === "dry"
        ? [item1]
        : item1 === item2
        ? [item1]
        : [item1, item2]
    )
    .uniqWith(_.isEqual)
    .value();

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
        for (const water of waterPairs) {
          const weather: Weather = { temperature, wind, sky, water };
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
