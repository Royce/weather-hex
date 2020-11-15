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

export function all() {
  var list: Weather[] = [];

  for (const temperature of temperatureScale) {
    for (const wind of windScale) {
      for (const sky of skyScale) {
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
