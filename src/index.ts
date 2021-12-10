import * as fs from "fs";
import * as path from "path";

function main() {
  const data = fs
    .readFileSync(path.join(__dirname, "day10.txt"), "utf8")
    .trim()
    .split("\n")
    .map((line) => line.split(""))

}

main();
