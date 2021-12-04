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

  // iterate each extracted number
  loop0: for (let n = 0; n < numbers.length; n++) {
    // iterate each board
    loop1: for (let b = 0; b < boards.length; b++) {
      // iterate each row of the board
      loop2: for (let i = 0; i < boards[b].length; i++) {
        // iterate each number of the row
        loop3: for (let j = 0; j < boards[b][i].length; j++) {
          let column: number[] = boards[b].map((e) => e[j]);

          if (column.length === 5 && column.every((i) => i === 0)) {
            winningNumber = numbers[n - 1];
            const re = resultBoard[b]
              .flatMap((e) => e)
              .reduce((a, c) => a + c, 0);

            console.log("The winning number is", re * winningNumber);
            break loop0;
          }

          if (resultBoard[b][i].every((i) => i === 0)) {
            winningNumber = numbers[n];
            const re = resultBoard[b]
              .flatMap((e) => e)
              .reduce((a, c) => a + c, 0);

            console.log("The winning number is", re * winningNumber);
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

function bingoLooser() {
  const table = fs
    .readFileSync(path.join(__dirname, "day4.input"), "utf8")
    .split("\n\n");
  const numbers = table[0].split(",").map((n) => Number(n));

  let boards = table
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

  let resultBoards: number[][][] = Array.from(boards);
  let winningNumber = 0;
  let bufferBoards = [...resultBoards];

  // iterate each extracted number
  loop0: for (let n = 0; n < numbers.length; n++) {
    // iterate each board
    boards = [...bufferBoards]
    resultBoards = [...bufferBoards]
    loop1: for (let b = 0; b < boards.length; b++) {
      // iterate each row of the board
      loop2: for (let i = 0; i < boards[b].length; i++) {
        // iterate each number of the row
        loop3: for (let j = 0; j < boards[b][i].length; j++) {
          let column: number[] = boards[b].map((e) => e[j]);

          if (numbers[n] === boards[b][i][j]) {
            resultBoards[b][i][j] = 0;
          }

          // check if a column is winner
          if (column.length === 5 && column.every((i) => i === 0)) {
            if (boards.length !== 1) {
              bufferBoards.splice(b, 1);
              // resultBoards.splice(b, 1);
              console.log("splice a column for the board", b);
              continue loop1;
            }

            winningNumber = numbers[n];
            const re = resultBoards[b]
              .flatMap((e) => e)
              .reduce((a, c) => a + c, 0);

            console.log(
              "The looser number is",
              re * winningNumber,
              "row",
              resultBoards[b],
              re,
              winningNumber,
              "\n"
            );

            break loop0;
          }

          // check if a row is winner
          if (resultBoards[b][i].every((i) => i === 0)) {
            if (boards.length !== 1) {
              bufferBoards.splice(b, 1);
              // resultBoards.splice(b, 1);
              console.log("splice a row for the board", b);
              continue loop1;
            }

            winningNumber = numbers[n];
            const re = resultBoards[b]
              .flatMap((e) => e)
              .reduce((a, c) => a + c, 0);

            console.log(
              "The looser number is",
              re * winningNumber,
              "row",
              resultBoards[b],
              re,
              winningNumber,
              "\n"
            );

            break loop0;
          }
        }
      }
    }
  }
}

bingo();
bingoLooser();
