import * as fs from "fs";
import * as path from "path";

function isInBound(data: number[][], x: number, y: number) {
  const width = data[0].length;
  const height = data.length;

  return x >= 0 && x < data[0].length && y >= 0 && y < data.length;
}

function canFlash(data: number[][], x: number, y: number) {
  // const width = data[0].length;
  // const height = data.length;

  if (isInBound(data, x, y) && data[y][x] === 9) {
    return true;
  }
}

function canIncrease(
  data: number[][],
  x: number,
  y: number,
  flashed: number[][]
) {
  let isFlashed = flashed.find(([y1, x1]) => x1 === x && y1 === y)
    ? true
    : false;
  if (isInBound(data, x, y) && !isFlashed) {
    return true;
  }
  return false;
}

let flashed: number[][] = [];

function flash(data: number[][], x: number, y: number): number {
  if (!canFlash(data, x, y) && !canIncrease(data, x, y, flashed)) {
    return 0;
  }

  if (canFlash(data, x, y)) {
    data[y][x] = 0;
    flashed.push([y, x]);
    let dirs = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [1, -1],
      [1, 0],
      [1, 1],
      [0, -1],
      [0, 1],
    ];

    return (
      1 +
      dirs.reduce((sum, dir) => {
        return sum + flash(data, x + dir[0], y + dir[1]);
      }, 0)
    );
  } else if (canIncrease(data, x, y, flashed)) {
    data[y][x] += 1;
    return 0;
  }
  return 0;
}

function main() {
  const data: number[][] = fs
    .readFileSync(path.join(__dirname, "day11.input"), "utf8")
    .trim()
    .split("\n")
    .map((line) => line.split("").map(Number));

  // let flashed: number[][] = [];
  let flashes: number = 0;

  for (let i = 0; i < 100; i++) {
    flashed = [];
    for (let y = 0; y < data.length; y++) {
      for (let x = 0; x < data[0].length; x++) {
        flashes += flash(data, x, y);
      }
    }
  }
  console.log("there where a total of:", flashes);
}

main();
