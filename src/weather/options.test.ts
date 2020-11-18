import { all } from "./options";

test("generate all useful weather permutations", () => {
  const options = all()
    .map(
      ({ temperature, wind, sky, water }) =>
        `${water.join(", ")}: ${temperature}, ${wind}, ${sky}`
    )
    .sort();

  expect(options).toMatchSnapshot();
});
});
