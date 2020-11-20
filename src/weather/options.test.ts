import {
  all,
  availableSkyAndWind,
  availableTemperatures,
  availableWater,
  Weather,
} from "./options";

test("generate all useful weather permutations", () => {
  const options = all()
    .map(
      ({ temperature, wind, sky, water }) =>
        `${water.join(", ")}: ${temperature}, ${wind}, ${sky}`
    )
    .sort();

  expect(options).toMatchSnapshot();
});

test("restrict available temperatures (fog)", () => {
  const available = availableTemperatures({ water: ["fog"] });

  expect(available).toMatchInlineSnapshot(`
    Array [
      "cool",
    ]
  `);
});

test("restrict available temperatures (dry)", () => {
  const available = availableTemperatures({ water: ["dry"] });

  expect(available).toMatchInlineSnapshot(`
    Array [
      "hot",
      "warm",
      "cool",
      "freezing",
    ]
  `);
});

test("do NOT restrict temperatures with temperature", () => {
  const weather: Partial<Weather> = { temperature: "hot" };
  const available = availableTemperatures(weather);

  expect(available).toMatchInlineSnapshot(`
    Array [
      "hot",
      "warm",
      "cool",
      "freezing",
    ]
  `);
});

test("restrict available water (hot)", () => {
  const available = availableWater({ temperature: "hot" })
    .map((water) => water.join(", "))
    .sort();

  expect(available).toMatchInlineSnapshot(`
    Array [
      "dry",
      "light rain",
    ]
  `);
});

test("restrict available water (clear/calm)", () => {
  const available = availableWater({ sky: "clear", wind: "calm" })
    .map((water) => water.join(", "))
    .sort();

  expect(available).toMatchInlineSnapshot(`
    Array [
      "dry",
      "fog",
    ]
  `);
});

test("restrict available water (freezing)", () => {
  const available = availableWater({ temperature: "freezing" })
    .map((water) => water.join(", "))
    .sort();

  expect(available).toMatchInlineSnapshot(`
    Array [
      "dry",
      "hail",
      "heavy snowfall",
      "light snowfall",
    ]
  `);
});

test("all available sky/wind (hot)", () => {
  const available = availableSkyAndWind({ temperature: "hot" })
    .map(({ wind, sky }) => `${wind}, ${sky}`)
    .sort();

  expect(available).toMatchInlineSnapshot(`
    Array [
      "breeze, clear",
      "breeze, light clouds",
      "breeze, overcast",
      "calm, clear",
      "calm, light clouds",
      "calm, overcast",
      "gale, clear",
      "gale, light clouds",
      "gale, overcast",
    ]
  `);
});

test("restrict available sky/wind (light snow)", () => {
  const available = availableSkyAndWind({ water: ["light snowfall"] })
    .map(({ wind, sky }) => `${wind}, ${sky}`)
    .sort();

  expect(available).toMatchInlineSnapshot(`
    Array [
      "breeze, light clouds",
      "breeze, overcast",
      "calm, light clouds",
      "calm, overcast",
    ]
  `);
});
