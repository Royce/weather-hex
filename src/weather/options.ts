import _ from "lodash";

import { uniquePairs } from "./uniquePairs";

export type Temperature = "hot" | "warm" | "cool" | "freezing";
export const temperatureScale: Temperature[] = [
  "hot",
  "warm",
  "cool",
  "freezing",
];

export type Wind = "calm" | "breeze" | "gale";
export const windScale: Wind[] = ["calm", "breeze", "gale"];

export type Sky = "overcast" | "light clouds" | "clear";
export const skyScale: Sky[] = ["overcast", "light clouds", "clear"];

export type Water =
  | "light rain"
  | "heavy rain"
  | "hail"
  | "light snowfall"
  | "heavy snowfall"
  | "lightning"
  | "fog"
  | "dry";
export const waterList: Water[] = [
  "light rain",
  "heavy rain",
  "hail",
  "light snowfall",
  "heavy snowfall",
  "lightning",
  "fog",
  "dry",
];

export type WeatherValue = Temperature | Wind | Sky | Water;

const requires: { [K in Water]?: WeatherValue[] } = {
  hail: ["cool", "freezing"],
  "light snowfall": ["freezing"],
  "heavy snowfall": ["freezing"],
  fog: ["cool"],
  lightning: ["overcast"],
};

const excludes: { [K in Water]?: WeatherValue[] } = {
  "light rain": ["clear", "gale", "freezing", "heavy rain"],
  "heavy rain": ["hot", "clear", "freezing"],
  hail: ["clear"],
  "light snowfall": ["clear", "gale"],
  "heavy snowfall": ["clear", "calm", "light clouds"],
  lightning: ["calm", "freezing", "hot"],
  fog: ["breeze", "gale", "heavy rain"],
};

const exclusive: Water[] = ["dry", "hail", "light snowfall", "heavy snowfall"];

export type Weather = {
  temperature: Temperature;
  wind: Wind;
  sky: Sky;
  water: Water[];
};

export function ok(
  { temperature, wind, sky, water: waterList }: Weather,
  { skipWaterExclusiveTest = true }: { skipWaterExclusiveTest?: boolean } = {}
): boolean {
  const matches = (test: WeatherValue) =>
    test === temperature ||
    test === wind ||
    test === sky ||
    _.includes(waterList, test);

  // Make sure water pairs do not contain items from the exclusive list
  if (!skipWaterExclusiveTest && waterList.length === 2) {
    if (exclusive.includes(waterList[0]) || exclusive.includes(waterList[0]))
      return false;
  }

  return _.every(waterList, (water) => {
    return (
      (excludes[water] === undefined ||
        _.every(excludes[water], (t) => !matches(t))) &&
      (requires[water] === undefined || _.some(requires[water], matches))
    );
  });
}

function _all(constraints?: Partial<Omit<Weather, "water">>) {
  var list: Weather[] = [];
  const temperatures = constraints?.temperature
    ? [constraints?.temperature]
    : temperatureScale;
  const winds = constraints?.wind ? [constraints?.wind] : windScale;
  const skies = constraints?.sky ? [constraints?.sky] : skyScale;

  for (const temperature of temperatures) {
    for (const wind of winds) {
      for (const sky of skies) {
        for (const water of exclusive) {
          const weather = { temperature, wind, sky, water: [water] };
          if (ok(weather)) list.push(weather);
        }
        for (const water of _.without(waterList, ...exclusive)) {
          const weather = { temperature, wind, sky, water: [water] };
          if (ok(weather)) list.push(weather);
        }
        for (const water of uniquePairs(_.without(waterList, ...exclusive))) {
          const weather = { temperature, wind, sky, water };
          if (ok(weather)) list.push(weather);
        }
      }
    }
  }

  return list;
}

export function all() {
  return _all();
}

export function availableTemperatures(constraints: Partial<Weather> = {}) {
  return _.chain(_all(_.omit(constraints, "temperature")))
    .filter(({ water }) => {
      return !constraints.water || _.isEmpty(_.xor(water, constraints.water));
    })
    .map("temperature")
    .uniq()
    .value();
}

export function availableWater(constraints: Partial<Weather> = {}) {
  return _.chain(_all(_.omit(constraints, "water")))
    .map("water")
    .uniqWith(_.isEqual)
    .value();
}

export function availableSkyAndWind(constraints: Partial<Weather> = {}) {
  return _.chain(_all(_.omit(constraints, ["sky", "wind"])))
    .filter(({ water }) => {
      return !constraints.water || _.isEmpty(_.xor(water, constraints.water));
    })
    .map(({ sky, wind }) => ({ sky, wind }))
    .uniqWith(_.isEqual)
    .value();
}
