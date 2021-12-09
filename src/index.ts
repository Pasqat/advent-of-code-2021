import * as fs from "fs";
import * as path from "path";

function isInBound(data: number[][], h: number, w: number): Boolean {
  const width: number = data[0].length;
  const height: number = data.length;

  return h >= 0 && h < height && w >= 0 && w < width;
}

function isWalkable(data: number[][], h: number, w: number): Boolean {
  return isInBound(data, h, w) && data[h][w] < 9;
}

function walk(data: number[][], h: number, w: number): number {
  if (!isWalkable(data, h, w)) {
    return 0;
  }

  data[h][w] = 9;
  let dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  return (
    1 +
    dirs.reduce(function (sum, dir) {
      return sum + walk(data, h + dir[0], w + dir[1]);
    }, 0)
  );
}

function main() {
  const data: number[][] = fs
    .readFileSync(path.resolve(__dirname, "day9.input"), "utf8")
    .trim()
    .split("\n")
    .map((line) => line.split("").map(Number));
  const width = data[0].length;
  const height = data.length;
  let basinCollection: number[] = [];

  console.log(width, height);

  for (let h = 0; h < height; h++) {
    for (let w = 0; w < width; w++) {
      basinCollection.push(walk(data, h, w));
    }
  }

  console.log(basinCollection.sort((a, b) => b - a).splice(0, 3).reduce((a, b) => a * b));
}

main();
