import * as fs from "fs";
import * as path from "path";

function printDiagram(diagram: string[][] | number[][]) {
  for (let l of diagram) {
    let line: string = "";
    for (let w of l) {
      line = line + w;
    }
    console.log(line);
  }
  return;
}

function diagram() {
  const lineSegment = fs
    .readFileSync(path.join(__dirname, "day5.input"), "utf8")
    .trim()
    .split("\n")
    .map((lines) =>
      lines
        .trim()
        .split("->")
        .map((coor) => coor.split(",").map((e) => Number(e)))
    );

  // find max x and y to build the empty diagram
  let maxX: number = Math.max(
    ...lineSegment.flatMap((lineSegment) => lineSegment[0])
  );
  let maxY: number = Math.max(
    ...lineSegment.flatMap((lineSegment) => lineSegment[1])
  );
  let diagram = new Array(maxX + 1);
  for (let i = 0; i < diagram.length; i++) {
    diagram[i] = new Array(maxY + 1).fill(".");
  }

  for (let l = 0; l < lineSegment.length; l++) {
    const line = lineSegment[l];
    const segmentS = line[0];
    const segmentE = line[1];
    const x1 = segmentS[0];
    const x2 = segmentE[0];
    const y1 = segmentS[1];
    const y2 = segmentE[1];
    // console.log(x1, "->", x2, "...", y1, "->", y2);

    if (x1 === x2) {
      if (y1 > y2) {
        for (let i = y1; i >= y2; i--) {
          diagram[i][x1] === "." ? (diagram[i][x1] = 1) : diagram[i][x1]++;
        }
      } else if (y1 < y2) {
        for (let i = y1; i <= y2; i++) {
          diagram[i][x1] === "." ? (diagram[i][x1] = 1) : diagram[i][x1]++;
        }
      }
    }

    if (y1 === y2) {
      if (x1 > x2) {
        for (let i = x1; i >= x2; i--) {
          diagram[y1][i] === "." ? (diagram[y1][i] = 1) : diagram[y1][i]++;
        }
      }
      if (x1 < x2) {
        for (let i = x1; i <= x2; i++) {
          diagram[y1][i] === "." ? (diagram[y1][i] = 1) : diagram[y1][i]++;
        }
      }
    }

    if (x1 > x2 && y1 > y2) {
      console.log(x1, y1, "->", x2, y2);
    }

    if (Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
      // console.log("diag", x1, x2, y1, y2);

      if (x1 > x2) {
        let j = y1;
        // console.log("diag", x1, x2, y1, y2);
        for (let i = x1; i >= x2; i--) {
          if (y1 < y2) {
            diagram[j][i] === "." ? (diagram[j][i] = 1) : diagram[j][i]++;
            j++;
          }

          if (y1 > y2) {
            // console.log("x1>x2  y1>y2");
            diagram[j][i] === "." ? (diagram[j][i] = 1) : diagram[j][i]++;
            j--;
          }
        }
      }
      if (x1 < x2) {
        let j = y1;
        for (let i = x1; i <= x2; i++) {
          if (y1 < y2) {
            diagram[j][i] === "." ? (diagram[j][i] = 1) : diagram[j][i]++;
            j++;
          }
          if (y1 > y2) {
            diagram[j][i] === "." ? (diagram[j][i] = 1) : diagram[j][i]++;
            j--;
          }
        }
      }
    }
  }

  printDiagram(diagram);
  console.log(diagram.flatMap((e) => e).filter((e) => e > 1).length);
  return diagram;
}

diagram();
