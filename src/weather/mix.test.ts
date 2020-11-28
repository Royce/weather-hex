import { mixes } from "./mix";

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

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "sky": "overcast",
        "temperature": "warm",
        "water": Array [
          "heavy rain",
          "lightning",
        ],
        "wind": "breeze",
      },
      Object {
        "sky": "overcast",
        "temperature": "warm",
        "water": Array [
          "heavy rain",
        ],
        "wind": "breeze",
      },
      Object {
        "sky": "overcast",
        "temperature": "warm",
        "water": Array [
          "light rain",
          "lightning",
        ],
        "wind": "breeze",
      },
      Object {
        "sky": "overcast",
        "temperature": "warm",
        "water": Array [
          "light rain",
        ],
        "wind": "breeze",
      },
    ]
  `);
});
