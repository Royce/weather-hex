import _ from "lodash";

import { uniquePairs } from "./uniquePairs";

export type Temperature = "hot" | "warm" | "cool" | "freezing";
const temperatureScale: Temperature[] = ["hot", "warm", "cool", "freezing"];

export type Wind = "calm" | "breeze" | "gale";
const windScale: Wind[] = ["calm", "breeze", "gale"];

export type Sky = "overcast" | "light clouds" | "clear";
const skyScale: Sky[] = ["overcast", "light clouds", "clear"];

export type Water =
  | "light rain"
  | "heavy rain"
  | "hail"
  | "light snowfall"
  | "heavy snowfall"
  | "lightning"
  | "frost"
  | "fog"
  | "humid"
  | "dry";
const waterList: Water[] = [
  "light rain",
  "heavy rain",
  "hail",
  "light snowfall",
  "heavy snowfall",
  "lightning",
  "frost",
  "fog",
  "humid",
  "dry",
];

export type WeatherValue = Temperature | Wind | Sky | Water;

const requires: { [K in Water]?: WeatherValue[] } = {
  hail: ["cool", "freezing"],
  "light snowfall": ["freezing"],
  "heavy snowfall": ["freezing"],
  humid: ["hot", "warm"],
  frost: ["freezing"],
  fog: ["cool"],
  lightning: ["overcast"],
};

const excludes: { [K in Water]?: WeatherValue[] } = {
  "light rain": ["clear", "freezing", "heavy rain"],
  "heavy rain": ["hot", "clear", "freezing"],
  hail: ["clear"],
  "light snowfall": ["clear"],
  "heavy snowfall": ["clear", "light clouds"],
  lightning: ["calm", "freezing", "hot"],
  fog: ["breeze", "gale", "heavy rain"],
  humid: ["gale"],
};

const exclusive: Water[] = ["dry", "light snowfall", "heavy snowfall"];

export type Weather = {
  temperature: Temperature;
  wind: Wind;
  sky: Sky;
  water: Water[];
};

function ok({ temperature, wind, sky, water: waterList }: Weather): boolean {
  const matches = (test: WeatherValue) =>
    test === temperature ||
    test === wind ||
    test === sky ||
    _.includes(waterList, test);

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
