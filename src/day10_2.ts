import * as fs from "fs";
import * as path from "path";

const mismatch = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
};

const closigChar = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

type Point = {
  ")": number;
  "]": number;
  "}": number;
  ">": number;
};

const points: Point = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

function filterIncomplete(data: string[][]) {
  let incompletData: string[][] = [];

  data.forEach((row) => {
    let stack: string[] = [];
    let isCorrupted: Boolean = false;

    row.forEach((char) => {
      if (char === "(" || char === "[" || char === "{" || char === "<") {
        stack.push(char);
      } else if (char === ")" || char === "]" || char === "}" || char === ">") {
        if (stack.length === 0) {
          return (isCorrupted = true);
        } else {
          const last = stack.pop();
          if (mismatch[char] !== last) {
            return (isCorrupted = true);
          }
        }
      }
    });
    if (stack.length > 0 && !isCorrupted) {
      return incompletData.push(row);
    }
  });

  return incompletData;
}

function closingChar(data: string[][]) {
  let scoreTable: number[] = [];

  data.forEach((row) => {
    let score: number = 0;
    let stack: string[] = [];
    let closingStack: string[] = [];

    row.forEach((char) => {
      if (char === "(" || char === "[" || char === "{" || char === "<") {
        stack.push(char);
        closingStack.unshift(closigChar[char]);
      } else if (char === ")" || char === "]" || char === "}" || char === ">") {
        if (stack.length === 0) {
          return;
        } else {
          stack.pop();
          closingStack.shift();
        }
      }
    });
    for (let char of closingStack) {
      score = score * 5;
      score += points[char as keyof Point];
    }

    scoreTable.push(score);
  });
  scoreTable.sort((a, b) => a - b);

  return scoreTable[(scoreTable.length - 1) / 2];
}

function main() {
  const data = fs
    .readFileSync(path.join(__dirname, "day10.input"), "utf8")
    .trim()
    .split("\n")
    .map((line) => line.split(""));

  let incompleteData = filterIncomplete(data);

  let middleScore = closingChar(incompleteData);

  console.log(middleScore);
}

main();
