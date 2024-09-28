
function simpleLineChart(
  dataObj: any,
  dataFunction: any,
  id_element: string,
  chartOptions: any,
  header: string[]
) {

  const arrSavedCO2: number[][] = dataFunction(dataObj);

  const dataArr: (string|number)[][] = [
    header, ...arrSavedCO2
  ]

  const dataTable = google.visualization.arrayToDataTable(dataArr);

  const container = document.getElementById(id_element) as HTMLElement;

  const chart = new google.visualization.LineChart(container);

  chart.draw(dataTable, chartOptions);
}

export { simpleLineChart };