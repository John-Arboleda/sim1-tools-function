import { multipleAreaChart } from "./area-chart";
import { multipleColumnChart } from "./column-chart";
import { simpleLineChart } from "./line-chart";

import { createDataAreaEmis, createFleetByTech, dataPropNegative, maxValueVAxis, createDataAreaCost, dataSavedCO2, createDataQfuel } from "./chart-functions";

import { sellFleetOptions, buyFleetOptions, fleetOptions, emissionsOptions, co2Options, dieselOptions } from "./chart-options";

interface ResultObj {
  SAVED1: number[],
  SAVED2: number[],
  CO2SAVED: number[],
  WTTX: number[][][],
  TTWX: number[][][],
  N: number[][][],
  G: number[][][],
  D: number[][][],
  OLD: number[][][],
  TCX: number[][][],
  VFCX: number[][][],
  VACX: number[][][],
  QFUEL: number[][][]
}

const techTypeHeader: string[] = ['Periodo', 'Diesel Actual', 'Diesel Nuevo', 'Gas', 'Eléctrico', 'Hidrógeno'];

function runEmissionCharts(resultObj: ResultObj) {
  google.charts.load('current', { packages: ['corechart', 'bar', 'table', 'controls'] });
  return new Promise<void>((resolve) => {
    google.charts.setOnLoadCallback(() => {
      drawEmissionsCharts(resultObj);
      resolve();
    });
  });
}

function drawEmissionsCharts(resultObj: ResultObj): void {
  
  const co2Header = ['Periodo', 'Operacional', 'Renovación', 'Total'];
  simpleLineChart(resultObj, dataSavedCO2, 'saved-co2', co2Options, co2Header)

  const emisHeader: string[] = ['Periodo', 'Well-to-Tank', 'Tank-to-Wheel']
  multipleAreaChart(resultObj, createDataAreaEmis, 'area_chart_div', 'emissions', emissionsOptions, emisHeader);


}

function runFleetCharts(resultObj: ResultObj) {
  google.charts.load('current', { packages: ['corechart', 'bar', 'table', 'controls'] });
  return new Promise<void>((resolve) => {
    google.charts.setOnLoadCallback(() => {
      drawFleetCharts(resultObj);
      resolve();
    });
  });
}

function drawFleetCharts(resultObj: ResultObj): void {

  const vAxisMaxValue = maxValueVAxis(resultObj);
  sellFleetOptions.vAxis.minValue = -vAxisMaxValue;
  buyFleetOptions.vAxis.maxValue = vAxisMaxValue;

  const negPropD = dataPropNegative(resultObj.D);
  multipleColumnChart(resultObj.G, createFleetByTech, 'buy_column_chart', buyFleetOptions, techTypeHeader);

  multipleColumnChart(negPropD, createFleetByTech, 'sell_column_chart', sellFleetOptions, techTypeHeader);

  multipleColumnChart(resultObj.N, createFleetByTech, 'fleet_column_chart', fleetOptions, techTypeHeader);

  multipleColumnChart(resultObj.OLD, createFleetByTech, 'old_column_chart', fleetOptions, techTypeHeader);
}

function runCostsCharts(resultObj: ResultObj) {
  google.charts.load('current', { packages: ['corechart', 'bar', 'table', 'controls'] });
  return new Promise<void>((resolve) => {
    google.charts.setOnLoadCallback(() => {
      drawCostsCharts(resultObj);
      resolve();
    });
  });
}

function drawCostsCharts(resultObj: ResultObj): void {

  const costHeader: string[] = ['Periodo', 'Ingresos por Carbon Tax', 'Subsidio o penalización de combustible', 'Subsidio o penalización de los activos']
  multipleAreaChart(resultObj, createDataAreaCost, 'cost_area_chart', 'costs', emissionsOptions, costHeader);

}

function runEnergyCharts(resultObj: ResultObj) {
  google.charts.load('current', { packages: ['corechart', 'bar', 'table', 'controls'] });
  return new Promise<void>((resolve) => {
    google.charts.setOnLoadCallback(() => {
      drawEnergyCharts(resultObj);
      resolve();
    });
  });
}

function drawEnergyCharts(resultObj: ResultObj): void {
  const vehHeader: string[] = ['Periodo', 'C2', 'C3S3'];
  multipleAreaChart(resultObj.QFUEL[0], createDataQfuel, 'current_diesel_area_chart', 'energy', dieselOptions, vehHeader);
  multipleAreaChart(resultObj.QFUEL[1], createDataQfuel, 'new_diesel_area_chart', 'energy', dieselOptions, vehHeader);
  multipleAreaChart(resultObj.QFUEL[2], createDataQfuel, 'gas_area_chart', 'energy', dieselOptions, vehHeader);
  multipleAreaChart(resultObj.QFUEL[3], createDataQfuel, 'electric_area_chart', 'energy', dieselOptions, vehHeader);
  multipleAreaChart(resultObj.QFUEL[4], createDataQfuel, 'hydrogen_area_chart', 'energy', dieselOptions, vehHeader);
}

const drawChartFunctions: { [key: string]: (resultObj: ResultObj) => void } = {
  'emissions-panel': runEmissionCharts,
  'fleet-panel': runFleetCharts,
  'costs-panel': runCostsCharts,
  'energy-panel': runEnergyCharts
};

export { runEmissionCharts, runFleetCharts, runCostsCharts, runEnergyCharts, drawChartFunctions }