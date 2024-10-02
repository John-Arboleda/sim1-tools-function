import { multipleAreaChart } from "./area-chart";
import { multipleColumnChart } from "./column-chart";
import { simpleLineChart } from "./line-chart";

import { createDataAreaEmis, createFleetByTech, dataPropNegative, maxValueVAxis, createDataAreaCost, dataSavedCO2, createDataQfuel } from "./chart-functions";

import { sellFleetOptions, buyFleetOptions, fleetOptions, emissionsOptions, co2Options, dieselOptions } from "./chart-options";

interface DataObj {
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

function runEmissionCharts(dataObj: DataObj) {
  google.charts.load('current', { packages: ['corechart', 'bar', 'table', 'controls'] });
  return new Promise<void>((resolve) => {
    google.charts.setOnLoadCallback(() => {
      drawEmissionsCharts(dataObj);
      resolve();
    });
  });
}

function drawEmissionsCharts(dataObj: DataObj): void {
  
  const co2Header = ['Periodo', 'Operacional', 'Renovación', 'Total'];
  simpleLineChart(dataObj, dataSavedCO2, 'saved-co2', co2Options, co2Header)

  const emisHeader: string[] = ['Periodo', 'Well-to-Tank', 'Tank-to-Wheel']
  multipleAreaChart(dataObj, createDataAreaEmis, 'area_chart_div', 'emissions', emissionsOptions, emisHeader);


}

function runFleetCharts(dataObj: DataObj) {
  google.charts.load('current', { packages: ['corechart', 'bar', 'table', 'controls'] });
  return new Promise<void>((resolve) => {
    google.charts.setOnLoadCallback(() => {
      drawFleetCharts(dataObj);
      resolve();
    });
  });
}

function drawFleetCharts(dataObj: DataObj): void {

  const vAxisMaxValue = maxValueVAxis(dataObj);
  sellFleetOptions.vAxis.minValue = -vAxisMaxValue;
  buyFleetOptions.vAxis.maxValue = vAxisMaxValue;

  const negPropD = dataPropNegative(dataObj.D);
  multipleColumnChart(dataObj.G, createFleetByTech, 'buy_column_chart', buyFleetOptions, techTypeHeader);

  multipleColumnChart(negPropD, createFleetByTech, 'sell_column_chart', sellFleetOptions, techTypeHeader);

  multipleColumnChart(dataObj.N, createFleetByTech, 'fleet_column_chart', fleetOptions, techTypeHeader);

  multipleColumnChart(dataObj.OLD, createFleetByTech, 'old_column_chart', fleetOptions, techTypeHeader);
}

function runCostsCharts(dataObj: DataObj) {
  google.charts.load('current', { packages: ['corechart', 'bar', 'table', 'controls'] });
  return new Promise<void>((resolve) => {
    google.charts.setOnLoadCallback(() => {
      drawCostsCharts(dataObj);
      resolve();
    });
  });
}

function drawCostsCharts(dataObj: DataObj): void {

  const costHeader: string[] = ['Periodo', 'Ingresos por Carbon Tax', 'Subsidio o penalización de combustible', 'Subsidio o penalización de los activos']
  multipleAreaChart(dataObj, createDataAreaCost, 'cost_area_chart', 'costs', emissionsOptions, costHeader);

}

function runEnergyCharts(dataObj: DataObj) {
  google.charts.load('current', { packages: ['corechart', 'bar', 'table', 'controls'] });
  return new Promise<void>((resolve) => {
    google.charts.setOnLoadCallback(() => {
      drawEnergyCharts(dataObj);
      resolve();
    });
  });
}

function drawEnergyCharts(dataObj: DataObj): void {

  const vehHeader: string[] = ['Periodo', 'C2', 'C3S3'];
  multipleAreaChart(dataObj.QFUEL[0], createDataQfuel, 'current_diesel_area_chart', 'energy', dieselOptions, vehHeader);
  multipleAreaChart(dataObj.QFUEL[1], createDataQfuel, 'new_diesel_area_chart', 'energy', dieselOptions, vehHeader);
  multipleAreaChart(dataObj.QFUEL[2], createDataQfuel, 'gas_area_chart', 'energy', dieselOptions, vehHeader);
  multipleAreaChart(dataObj.QFUEL[3], createDataQfuel, 'electric_area_chart', 'energy', dieselOptions, vehHeader);
  multipleAreaChart(dataObj.QFUEL[4], createDataQfuel, 'hydrogen_area_chart', 'energy', dieselOptions, vehHeader);
}


export { runEmissionCharts, runFleetCharts, runCostsCharts, runEnergyCharts }