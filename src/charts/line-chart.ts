import { dataSavedCO2 } from "./chart-functions";
import { defaultValues } from "../data";
import { transformData } from "../functions";


google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  const dataObj = transformData(defaultValues);

  const arrSavedCO2: number[][] = dataSavedCO2(dataObj);

  let dataArr: (string|number)[][] = [
    ['Periodo', 'Operacional', 'Renovación', 'Total'],
    ...arrSavedCO2
  ]

  var dataTable = google.visualization.arrayToDataTable(dataArr);

  var options = {
    title: 'Company Performance',
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('saved-co2'));

  chart.draw(dataTable, options);
}

export { drawChart };