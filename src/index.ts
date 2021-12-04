import * as fs from "fs";
import * as path from "path";

function bingo() {
  const table = fs
    .readFileSync(path.join(__dirname, "day4.input"), "utf8")
    .split("\n\n");
  const numbers = table[0].split(",").map((n) => Number(n));

  const boards = table
    .slice(1, table.length)
    .filter((e) => e !== "")
    .map((board) =>
      board
        .trim()
        .split("\n")
        .map((line) =>
          line
            .split(" ")
            .filter((n) => n !== "")
            .map((n) => Number(n))
        )
    );

  let resultBoard: number[][][] = Array.from(boards);
  let winningNumber = 0;

  loop0: for (let n = 0; n < numbers.length; n++) {
    loop1: for (let b = 0; b < boards.length; b++) {
      loop2: for (let i = 0; i < boards[b].length; i++) {
        loop3: for (let j = 0; j < boards[b][i].length; j++) {
          let column: number[] = boards[b].map((e) => e[j]);

          if (column.length === 5 && column.every((i) => i === 0)) {
            winningNumber = numbers[n - 1];
            const re = resultBoard[b]
              .flatMap((e) => e)
              .reduce((a, c) => a + c, 0);

            console.log(re * winningNumber, re, winningNumber, resultBoard[b]);
            break loop0;
          }

          if (resultBoard[b][i].every((i) => i === 0)) {
            winningNumber = numbers[n];
            const re = resultBoard[b]
              .flatMap((e) => e)
              .reduce((a, c) => a + c, 0);

            console.log(re * winningNumber, re, winningNumber, resultBoard[b]);
            break loop0;
          }

          if (numbers[n] === boards[b][i][j]) {
            resultBoard[b][i][j] = 0;
          }
        }
      }
    }
  }
}

bingo();
