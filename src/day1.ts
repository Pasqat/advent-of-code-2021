import * as fs from "fs";
// import {arrFormFile} from './arr-from-file'

fs.readFile("./src/data1.txt", "utf8", function (err, data): number | void {
  if (err) {
    console.error(err);
    return;
  }
  const dataArr: Array<number> = data.split("\n").map((n) => +n);

  let count: number = 0;
  let newArr: number[] = [];

  for (let i = 2; i <= dataArr.length - 2; i++) {
    const sum = dataArr[i - 2] + dataArr[i - 1] + dataArr[i];
    newArr.push(sum)
    console.log(sum)
  }

  for (let i = 1; i <= newArr.length - 1; i++) {
    if (newArr[i] > newArr[i - 1]) count++;
  }

  return count;
});
