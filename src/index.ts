import * as fs from "fs";
import * as path from "path";

const input: string[] = fs
  .readFileSync(path.resolve(__dirname, "day9.txt"), "utf8")
  .trim()
  .split("\n");

let sum: number = 0;
let lowestList: number[] = [];
let basinList: number[][] = []

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    let current: number = +input[i][j];
    let right: number = input[i][j + 1] ? +input[i][j + 1] : Infinity;
    let left: number = input[i][j - 1] ? +input[i][j - 1] : Infinity;
    let up: number = input[i - 1] ? +input[i - 1][j] : Infinity;
    let down: number = input[i + 1] ? +input[i + 1][j] : Infinity;

    let lowest = Math.min(current, right, left, up, down);

    if (current === lowest && lowest !== 9) {
      lowestList.push(lowest);
      lowest = lowest + 1;
      sum += lowest;
    }
  }
}

console.log(sum, lowestList);
