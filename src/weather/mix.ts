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

const adjacentWater: { [K in Water]: Water[] } = {
  "heavy rain": ["heavy rain", "light rain"],
  "light rain": _.without(waterList, "heavy snowfall", "light snowfall"),
  "heavy snowfall": ["heavy snowfall", "light snowfall"],
  "light snowfall": _.without(
    waterList,
    "heavy rain",
    "light rain",
    "lightning"
  ),
  dry: _.without(waterList, "heavy snowfall", "heavy rain"),
  lightning: ["lightning", "dry"],
  hail: ["hail", "dry"],
  fog: ["fog", "dry"],
};

type Pair<T> = [T, T];

function expandWaterCombo([w1, w2]: Pair<Water | undefined>) {
  const list: Water[] =
    !w1 && !w2
      ? ["dry"]
      : w1 === w2
      ? [w1 as Water]
      : (w1 === "dry" && !w2) || (w2 === "dry" && !w1)
      ? ["dry", "light rain", "light snowfall"]
      : _.intersection(adjacentWater[w1 || "dry"], adjacentWater[w2 || "dry"]);

  console.log(`**${i + 1000}`, [w1, w2], list);
  return list;
}

var i = 0;
export function mixes(a: Weather, b: Weather): Weather[] {
  i++;

  const combo: Pair<Pair<Water | undefined>>[] = [
    [
      [a.water[0], b.water[0]],
      [a.water[1], b.water[1]],
    ],
    [
      [a.water[0], b.water[1]],
      [b.water[0], a.water[1]],
    ],
  ];

  var x: [Water, Water][] = [];
  for (const [p1, p2] of combo) {
    for (const w1 of expandWaterCombo(p1)) {
      for (const w2 of expandWaterCombo(p2)) {
        x.push(_.sortBy([w1, w2]) as [Water, Water]);
      }
    }
  }

  console.log(`**${i + 1000}`, x);

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
