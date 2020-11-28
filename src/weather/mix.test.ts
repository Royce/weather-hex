import { mixes } from "./mix";
import { Weather } from "./options";

const description = ({ temperature, wind, sky, water }: Weather) =>
  `${water.join(", ")}: ${temperature}, ${wind}, ${sky}`;

test("mix to: heavy rain, lightning: warm, breeze, overcast", () => {
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
      "heavy rain, lightning: warm, breeze, overcast",
      "heavy rain: warm, breeze, overcast",
      "light rain, lightning: warm, breeze, overcast",
      "light rain: warm, breeze, overcast",
    ]
  `);
});
