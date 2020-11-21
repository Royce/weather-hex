export type CubeCoord = [number, number, number];
export type CartesianCoord = [number, number];

export function cubeCoordToPixel(
  [x, y, z]: CubeCoord,
  scale: number
): CartesianCoord {
  return [
    scale * (Math.sqrt(3) * x + (Math.sqrt(3) / 2) * z),
    ((scale * 3) / 2) * z,
  ];
}

export function addCoord(
  [x1, y1, z1]: CubeCoord,
  [x2, y2, z2]: CubeCoord
): CubeCoord {
  return [x1 + x2, y1 + y2, z1 + z2];
}

export const directions: CubeCoord[] = [
  [1, 0, -1],
  [1, -1, 0],
  [0, -1, 1],
  [-1, 0, 1],
  [-1, 1, 0],
  [0, 1, -1],
];

export function neighbors(coord: CubeCoord) {
  var neighbors: CubeCoord[] = [];

  for (let i = 0; i < directions.length; i++) {
    const direction = directions[i];
    neighbors.push(addCoord(coord, direction));
  }

  return neighbors;
}

export function ring(coord: CubeCoord, distance: number) {
  var neighbors: CubeCoord[] = [];
  var current = addCoord(coord, [-1 * distance, distance, 0]);

  for (let i = 0; i < directions.length; i++) {
    const direction = directions[i];
    for (let step = 1; step <= distance; step++) {
      current = addCoord(current, direction);
      neighbors.push(current);
    }
  }

  return neighbors;
}
