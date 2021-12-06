import * as fs from "fs";
import * as path from "path";

const initialPopulation: number[] = fs
  .readFileSync(path.join(__dirname, "day6.input"), "utf8")
  .trim()
  .split(",")
  .map((e) => Number(e));
let day = 0;
let previousPopulation: number[] = [...initialPopulation];
let finalPopulation: number[] = [];

function lanterfish(days: number) {
  if (day === days) return;
  finalPopulation = [];
  let newTimer: number = 0;

  for (let i = 0; i < previousPopulation.length; i++) {
    const internalTimer = previousPopulation[i];

    if (internalTimer === 0) {
      finalPopulation.push(6);
      newTimer++;
    }
    if (internalTimer > 0) {
      finalPopulation.push(internalTimer - 1);
    }
  }
  if (newTimer > 0) {
    for (let i = 0; i < newTimer; i++) {
      finalPopulation.push(8);
    }
  }

  // console.log(`day ${day}: ${finalPopulation}`);
  day++;
  previousPopulation = [...finalPopulation];

  lanterfish(days);
}

lanterfish(80);
console.log("There are: ", finalPopulation.length, " fish...SO MANY!");
