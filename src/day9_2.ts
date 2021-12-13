import * as fs from "fs";
import * as path from "path";

const illegalPoints = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const mismatch = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
};

function findIllegalChar(data: string[][]) {
  let sum: number = 0;

  data.forEach((row) => {
    let stack: string[] = [];
    row.forEach((char) => {
      if (char === "(" || char === "[" || char === "{" || char === "<") {
        stack.push(char);
      } else if (char === ")" || char === "]" || char === "}" || char === ">") {
        if (stack.length === 0) {
          console.log(illegalPoints[char]);
        } else {
          const last = stack.pop();
          if (mismatch[char] !== last) {
            return (sum += illegalPoints[char]);
          }
        }
      }
    });
  });

  return sum
}

function main() {
  const data = fs
    .readFileSync(path.join(__dirname, "day10.input"), "utf8")
    .trim()
    .split("\n")
    .map((line) => line.split(""));

  // const points = findIllegalChar(data);

  console.log(points);
}

main();
