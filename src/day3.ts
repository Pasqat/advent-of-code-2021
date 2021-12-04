import { arrFromFile } from "./arr-from-file";

const arr = arrFromFile("day3.input");
const gammaRate: number[] = [];

function powerConsumption() {
  let countOne = 0;
  let countZero = 0;

  for (let i = 0; i < arr[i].length; i++) {
    for (let j = 0; j < arr.length; j++) {
      const bit: number = +arr[j][i];
      bit === 1 ? countOne++ : countZero++;
    }

    countOne > countZero ? gammaRate.push(1) : gammaRate.push(0);
    countOne = 0;
    countZero = 0;
  }

  const epsilonRate = gammaRate.map((b) => (b === 1 ? 0 : 1));

  const gammaRateInt = parseInt(gammaRate.join(""), 2);
  const epsilonRateInt = parseInt(epsilonRate.join(""), 2);

  console.log(gammaRateInt * epsilonRateInt);
  return gammaRateInt * epsilonRateInt;
}

function generatorRating(a: number, b: number): number {
  let countOne = 0;
  let countZero = 0;
  let newArr = [...arr];

  for (let i = 0; i < arr[i].length; i++) {
    if(newArr.length === 1) break 

    for (let j = 0; j < newArr.length; j++) {
      const bit: number = +newArr[j][i];
      bit === 1 ? countOne++ : countZero++;
    }

    if (countOne > countZero || countOne === countZero) {
      newArr = newArr.filter((el) => {
        return +el[i] === a;
      });
    }
    if (countOne < countZero) {
      newArr = newArr.filter((el) => {
        return +el[i] === b;
      });
    }

    countOne = 0;
    countZero = 0;
  }


  const rating = parseInt(newArr.join(""), 2);

  return rating;
}

function lifeSupportRating() {
  const oxy: number = generatorRating(1, 0);
  const cO: number = generatorRating(0, 1);

  const result: number = oxy * cO;

  console.log(result);
  return result;
}

lifeSupportRating();
