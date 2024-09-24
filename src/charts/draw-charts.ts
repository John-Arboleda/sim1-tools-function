import { multipleAreaChart } from "./area-chart";

import { createDataAreaEmis } from "./chart-functions";

async function runAnalysisCharts(dataObj: {  WTTX: number[][][], TTWX: number[][][] }) {
  google.charts.load('current', { packages: ['corechart', 'bar', 'table', 'controls'] });
  return new Promise<void>((resolve) => {
    google.charts.setOnLoadCallback(() => {
      drawAnalysisCharts(dataObj);
      resolve();
    });
  });
}

function drawAnalysisCharts(dataObj: {  WTTX: number[][][], TTWX: number[][][] }) {
  
  multipleAreaChart(dataObj, createDataAreaEmis, 'area_chart_div', emissionsOptions);
}

const emissionsOptions = {
  chartArea: { width: '75%' },
  hAxis: {
    minValue: 'auto',
    title: 'Periodo (años)',
    titleTextStyle: {
      italic: false,
    }
  },
  isStacked: true,
  legend: {position: 'bottom', maxLines: 3},
  vAxis: {
    title: 'Emisiones (Toneladas de CO2e)',
    ticks: 'auto',
    titleTextStyle: {
      italic: false,
    }
  },
};

export { runAnalysisCharts }