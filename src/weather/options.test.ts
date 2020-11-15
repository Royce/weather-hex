import { all } from "./options";

test("generate all useful weather permutations", () => {
  const options = all();

  expect(
    JSON.stringify(
      options
        .map(
          ({ temperature, wind, sky, water }) =>
            `${water.join(", ")}: ${temperature}, ${wind}, ${sky}`
        )
        .sort(),
      null,
      2
    )
  ).toMatchSnapshot();
});
