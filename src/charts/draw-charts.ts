import { multipleAreaChart } from "./area-chart";
import { multipleColumnChart } from "./column-chart";

import { createDataAreaEmis, createFleetByTech } from "./chart-functions";

function runAnalysisCharts(dataObj: {  WTTX: number[][][], TTWX: number[][][], N: number[][][] }) {
  google.charts.load('current', { packages: ['corechart', 'bar', 'table', 'controls'] });
  return new Promise<void>((resolve) => {
    google.charts.setOnLoadCallback(() => {
      drawAnalysisCharts(dataObj);
      resolve();
    });
  });
}

function drawAnalysisCharts(dataObj: {  WTTX: number[][][], TTWX: number[][][], N: number[][][] }) {
  
  const emisHeader: string[] = ['Periodo', 'Well-to-Tank', 'Tank-to-Wheel']
  multipleAreaChart(dataObj, createDataAreaEmis, 'area_chart_div', emissionsOptions, emisHeader);

  const fleetHeader: string[] = ['Periodo', 'Diesel Actual', 'Diesel Nuevo', 'Gas', 'Eléctrico', 'Hidrógeno']
  multipleColumnChart(dataObj.N, createFleetByTech, 'fleet_column_chart', fleetOptions, fleetHeader);
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

const fleetOptions = {
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
    title: 'Número de vehículos',
    ticks: 'auto',
    titleTextStyle: {
      italic: false,
    },
    minValue: 'auto',
    mixValue: 'auto',
  },
  annotations: {
    alwaysOutside: false,
    textStyle: {
      fontSize: 8,
      color: '#000',
      // auraColor: '#888'
    },
    stem: {
      length: 0,
    }
  },
};

export { runAnalysisCharts }