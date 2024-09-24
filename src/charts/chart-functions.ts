import { defaultValues } from "../data";


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
    const dataPeriod:  number[] = [t, SAVED1[t], SAVED2[t], CO2SAVED[t]]
    dataArr.push(dataPeriod);
  }

  return dataArr;
}

function sumPeriod(
  dataProp: number[][][],
  t: number,
  typeKeys: number[] = [0, 1],
  sizeKeys: number[] = [0, 1, 2, 3, 4]
): number {
  let result: number = 0;

  // Iterate over the specified 'sizeKeys'
  for (let i = 0; i < sizeKeys.length; i++) {
    let sizeKey = sizeKeys[i];

    // Iterate over the specified 'typeKeys'
    for (let v = 0; v < typeKeys.length; v++) {
      let typeKey = typeKeys[v];

      // Add the value at the specified indices to the result
      result += dataProp[sizeKey][typeKey][t];
    }
  }

  return result;
}


function sumDataObj(
  dataProp: number[][][],
  typeKeys: number[] = [0, 1],
  sizeKeys: number[] = [0 , 1, 2, 3, 4]
): number[] {

  const dataArr: number[] = new Array(T).fill(0);

  return dataArr.map((t, j) => sumPeriod(dataProp, j, typeKeys, sizeKeys));
}


function createDataAreaEmis(
  dataObj: {  WTTX: number[][][], TTWX: number[][][] },
  typeKeys: number[] = [0, 1],
  sizeKeys: number[] = [0 , 1, 2, 3, 4]
  
): number[][] {
  
  const { WTTX, TTWX } = dataObj

  const sumWTTX: number[] = sumDataObj(WTTX, typeKeys, sizeKeys);
  const sumTTWX: number[] = sumDataObj(TTWX, typeKeys, sizeKeys);
  
  const dataArr:  number[][] = [];

  for(let t = 0; t < T; t++){
    const dataPeriod:  number[] = [t, sumWTTX[t], sumTTWX[t]];
    dataArr.push(dataPeriod);
  }

  return dataArr;
}

export { dataSavedCO2, createDataAreaEmis }