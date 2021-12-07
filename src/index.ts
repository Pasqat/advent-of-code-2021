import * as fs from "fs";
import * as path from "path";

console.time('time')
const input = fs
  .readFileSync(path.resolve(__dirname, "day7.input"), "utf8")
  .trim()
  .split(",")
  .map(Number);

let fuelSum: number = 0;
let max: number = Math.max(...input);

for (let i = 0; i <= max; i++) {
  const fuel: number = input.reduce((a, b) => {
    const step = b > i ? b - i : i - b;
    const factor =
      step % 2 === 0
        ? (step / 2) * step + step / 2
        : Math.ceil(step / 2) * step;
    return a + factor;
  }, 0);
  if (i === 0) {
    fuelSum = fuel;
  }
  if (fuel < fuelSum) {
    fuelSum = fuel;
  }
}
console.timeEnd('time')

console.log(fuelSum);
