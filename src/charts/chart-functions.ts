import * as d3 from "d3";

// import { defaultValues } from "../data";


// interface CO2Obj {
//   SAVED1: number[];  
//   SAVED2: number[];  
//   CO2SAVED: number[];
// }

const T: number = 26;

function dataSavedCO2(dataObj: {  SAVED1: number[], SAVED2: number[], CO2SAVED: number[] }): number[][]{
  
  const { SAVED1, SAVED2, CO2SAVED } = dataObj
  
  const dataArr:  number[][] = [];

  for(let t = 0; t < T; t++){
    const dataPeriod:  number[] = [t + 1, SAVED1[t], SAVED2[t], CO2SAVED[t]]
    dataArr.push(dataPeriod);
  }

  return dataArr;
}

function sumPeriod(
  dataProp: number[][][],
  t: number,
  techKeys: number[] = [0, 1, 2, 3, 4],
  sizeKeys: number[] = [0, 1]
): number {
  let result: number = 0;

  // Iterate over the specified 'sizeKeys'
  for (let i = 0; i < sizeKeys.length; i++) {
    let sizeKey = sizeKeys[i];

    // Iterate over the specified 'techKeys'
    for (let v = 0; v < techKeys.length; v++) {
      let techKey = techKeys[v];
      // Add the value at the specified indices to the result
      result += dataProp[techKey][sizeKey][t];
    }
  }

  return result;
}


function sumDataObj(
  dataProp: number[][][],
  techKeys: number[] = [0, 1, 2, 3, 4],
  sizeKeys: number[] = [0, 1]
): number[] {

  const dataArr: number[] = new Array(T).fill(0);

  return dataArr.map((_t, j) => sumPeriod(dataProp, j, techKeys, sizeKeys));
}


function createDataAreaEmis(
  dataObj: {  WTTX: number[][][], TTWX: number[][][] },
  techKeys: number[] = [0, 1, 2, 3, 4],
  sizeKeys: number[] = [0, 1]
): number[][] {
  
  const { WTTX, TTWX } = dataObj

  const sumWTTX: number[] = sumDataObj(WTTX, techKeys, sizeKeys);
  const sumTTWX: number[] = sumDataObj(TTWX, techKeys, sizeKeys);
  
  const dataArr:  number[][] = [];

  for(let t = 0; t < T; t++){
    const dataPeriod:  number[] = [t + 1, sumWTTX[t], sumTTWX[t]];
    dataArr.push(dataPeriod);
  }

  return dataArr;
}

//const fleetHeader: string[] = ['Periodo', 'Diesel Nuevo', 'Gas', 'Eléctrico', 'Hidrógeno', 'Diesel Actual']

function createFleetByTech(
  N: number[][][],
  techKeys: number[] = [0, 1, 2, 3, 4],
  sizeKeys: number[] = [0, 1]
): number[][] {
  
  const sumN: number[][] = [];

  techKeys.forEach((tech: number) => {
    sumN.push(sumDataObj(N, [tech], sizeKeys));
  })

  const transSumN = d3.transpose(sumN);
  
  const dataArr:  number[][] = [];

  for(let t = 0; t < T; t++){
    const dataPeriod:  number[] = [t + 1, ...transSumN[t]];
    dataArr.push(dataPeriod);
  }

  return dataArr;
}

export { dataSavedCO2, createDataAreaEmis, createFleetByTech }