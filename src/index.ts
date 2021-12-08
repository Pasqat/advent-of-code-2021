import * as fs from "fs";
import * as path from "path";

const input = fs
  .readFileSync(path.resolve(__dirname, "day8.input"), "utf8")
  .trim()
  .split("\n")
  .map((line) =>
    line
      .trim()
      .split("|")
      .map((signal) =>
        signal
          .trim()
          .split(" ")
          .map((e) => e.split("").sort().join(""))
      )
  );

let sum: number = 0;
// console.log(input);

for (let line of input) {
  let signalPattern: string[] = line[0];
  let outputValue: string[] = line[1];
  let digitString = "";
  const signal = new Array(7).fill(null);

  while (signal.includes(null)) {
    for (let i = 0; i < signalPattern.length; i++) {
      let pattern = signalPattern[i];
      let reSeven = signal[7] ? new RegExp(`[${signal[7]}]`, "g") : null;
      let reOne = signal[1] ? new RegExp(`[${signal[1]}]`, "g") : null;
      let reThree = signal[3] ? new RegExp(`[${signal[3]}]`, "g") : null;
      let reNine = signal[9] ? new RegExp(`[${signal[9]}]`, "g") : null;
      let reFive = signal[5] ? new RegExp(`[${signal[5]}]`, "g") : null;
      let reFour = signal[4] ? new RegExp(`[${signal[4]}]`, "g") : null;

      if (pattern.length === 2) signal[1] = pattern;
      if (pattern.length === 3) signal[7] = pattern;
      if (pattern.length === 4) signal[4] = pattern;
      if (pattern.length === 7) signal[8] = pattern;

      if (pattern.length === 5) {
        if (reSeven && pattern.match(reSeven)?.length === 3)
          signal[3] = pattern;
        // console.log("abdef".match(/[bde]/g));
        if (reOne) {
          // console.log(pattern.match(reOne)?.length === 2);
        }
        if (
          reOne &&
          reFour &&
          reSeven &&
          pattern.match(reOne)?.length === 1 &&
          pattern.match(reFour)?.length === 3 &&
          pattern.match(reSeven)?.length === 2
        ) {
          signal[5] = pattern;
        }
        if (signal[5] && signal[3] && !signal.includes(pattern))
          signal[2] = pattern;
      }

      if (pattern.length === 6) {
        if (reFour && reSeven && pattern.match(reFour)?.length === 4 && pattern.match(reSeven)?.length === 3) signal[9] = pattern;
        if (reFive && reSeven && pattern.match(reFive)?.length === 5 && pattern.match(reSeven)?.length === 2 ) signal[6] = pattern;
        if (signal[9] && signal[6] && !signal.includes(pattern))
          signal[0] = pattern;
      }
    }
  }

  for (let i = 0; i < outputValue.length; i++) {
    let char = signal.indexOf(outputValue[i]).toString();
    // console.log(char, outputValue[i]);
    digitString = digitString + char;
  }

  // console.log(signal);

  sum += parseInt(digitString);
  // console.log(digitString);
}

console.log(sum);
