import * as fs from "fs";
import * as path from "path";

function arrFromFile(src: string) {
  const arr = fs
    .readFileSync(path.join(__dirname, src), "utf8")
    .split("\n")
    .filter((x) => x.length);

  return arr;
}

export { arrFromFile };
