export function uniquePairs<T>(options: T[]) {
  let pairs: [T, T][] = [];

  for (let i = 0; i < options.length; i++) {
    for (let j = 0; j < options.length; j++) {
      if (i !== j && i < j) pairs.push([options[i], options[j]]);
    }
  }

  return pairs;
}
