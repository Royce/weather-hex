import { mixes } from "./mix";
import { Weather } from "./options";

const description = ({ temperature, wind, sky, water }: Weather) =>
  `${water.join(", ")}: ${temperature}, ${wind}, ${sky}`;

test("mix to: rain, lightning: warm, breeze, overcast", () => {
  const result = mixes(
    {
      temperature: "hot",
      sky: "overcast",
      wind: "calm",
      water: ["heavy rain"],
    },
    { temperature: "cool", sky: "overcast", wind: "gale", water: ["lightning"] }
  );

  expect(result.map(description)).toMatchInlineSnapshot(`
    Array [
      "light rain, lightning: warm, breeze, overcast",
      "light rain: warm, breeze, overcast",
    ]
  `);
});

test("mix to light snow", () => {
  const result = mixes(
    {
      temperature: "freezing",
      sky: "overcast",
      wind: "gale",
      water: ["heavy snowfall"],
    },
    { temperature: "cool", sky: "overcast", wind: "calm", water: ["fog"] }
  );

  expect(result.map(description)).toMatchInlineSnapshot(`
    Array [
      "light snowfall: freezing, breeze, overcast",
    ]
  `);
});

test("light-rain+ / light-rain+", () => {
  const result = mixes(
    {
      temperature: "cool",
      sky: "overcast",
      wind: "calm",
      water: ["light rain", "fog"],
    },
    {
      temperature: "cool",
      sky: "overcast",
      wind: "breeze",
      water: ["light rain", "lightning"],
    }
  );

  // I expect that there is nothing weird like HAIL.
  // It should be rain or fog or lightning or nothing.
  expect(result.map(description)).toMatchInlineSnapshot(`
    Array [
      "light rain: cool, calm, overcast",
      "fog: cool, calm, overcast",
      "dry: cool, calm, overcast",
      "light rain: cool, breeze, overcast",
      "lightning: cool, breeze, overcast",
      "dry: cool, breeze, overcast",
    ]
  `);
});

test("lightning storm  mix  clear skies", () => {
  const result = mixes(
    {
      temperature: "cool",
      sky: "clear",
      wind: "calm",
      water: ["dry"],
    },
    {
      temperature: "cool",
      sky: "overcast",
      wind: "gale",
      water: ["heavy rain", "lightning"],
    }
  );

  // Light rain!
  // No lightning, because not overcast.
  expect(result.map(description)).toMatchInlineSnapshot(`
    Array [
      "light rain: cool, breeze, light clouds",
    ]
  `);
});
