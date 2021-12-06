import * as fs from "fs";
import * as path from "path";

// PART 2 - from a solution find on the web 😢

const input: number[] = fs
  .readFileSync(path.join(__dirname, "day6.input"), "utf8")
  .trim()
  .split(",")
  .map((e) => Number(e));

let fishCounts = {
  0: input.filter((v) => v === 0).length,
  1: input.filter((v) => v === 1).length,
  2: input.filter((v) => v === 2).length,
  3: input.filter((v) => v === 3).length,
  4: input.filter((v) => v === 4).length,
  5: input.filter((v) => v === 5).length,
  6: input.filter((v) => v === 6).length,
  7: input.filter((v) => v === 7).length,
  8: input.filter((v) => v === 8).length,
};

for (let i = 0; i < 256; i++) {
  const zeroFish = fishCounts[0];
  fishCounts[0] = fishCounts[1];
  fishCounts[1] = fishCounts[2];
  fishCounts[2] = fishCounts[3];
  fishCounts[3] = fishCounts[4];
  fishCounts[4] = fishCounts[5];
  fishCounts[5] = fishCounts[6];
  fishCounts[6] = fishCounts[7] + zeroFish;
  fishCounts[7] = fishCounts[8];
  fishCounts[8] = zeroFish;
}

let output = Object.values(fishCounts).reduce((a: number,b: number) => a+b)

console.log(output)

// PART 1 - my own
// const initialPopulation: number[] = fs
//   .readFileSync(path.join(__dirname, "day6.txt"), "utf8")
//   .trim()
//   .split(",")
//   .map((e) => Number(e));
// let day = 0;
// let previousPopulation: number[][] = [[...initialPopulation]];
// let finalPopulation: number[][] = [[]];

// function lanterfish(days: number) {
//   if (day === days) return;
//   finalPopulation = [];

//   let bufferChunk: number[] = [];

//   // console.log("-.-.-.-.-.-.-.-.-");
//   for (let i = 0; i < previousPopulation.length; i++) {
//     let newTimer: number = 0;
//     const chunks = previousPopulation[i];
//     const newChunk = [];

//     for (let j = 0; j < chunks.length; j++) {
//       const internalTimer = chunks[j];

//       if (internalTimer === 0) {
//         newChunk.push(6);
//         newTimer++;
//       }
//       if (internalTimer > 0) {
//         newChunk.push(internalTimer - 1);
//       }
//     }
//     if (newTimer > 0) {
//       for (let i = 0; i < newTimer; i++) {
//         newChunk.length > 79 ? bufferChunk.push(8) : newChunk.push(8);
//       }
//     }

//     while (newChunk.length < 80 && bufferChunk.length !== 0) {
//       const shiftElement: number = bufferChunk.shift()!;
//       newChunk.push(shiftElement);
//     }

//     finalPopulation.push(newChunk);
//   }

//   if (bufferChunk.length > 0) {
//     finalPopulation.push(bufferChunk);
//   }

//   // console.log(`day ${day}: ${finalPopulation}`);
//   day++;
//   previousPopulation = [...finalPopulation];
//   // console.log("b", previousPopulation);

//   lanterfish(days);
// }

// lanterfish(256);

// function countTotalFromChunks(chunks: number[][]) {
//   let count = 0;
//   for (let i of chunks) {
//     count = count + i.length;
//   }

//   return count;
// }
// console.log(
//   "There are: ",
//   countTotalFromChunks(finalPopulation),
//   " fish...SO MANY!"
// );
