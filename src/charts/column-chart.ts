interface DataObj {
  WTTX: number[][][];
  TTWX: number[][][];
}

// Define an interface for the data function
interface DataFunction {
  (dataObj: DataObj): number[][];
  (arg0: any, arg1: any, arg2: any): any;
}

// Define an interface for the chart options
// interface ChartOptions {
//   chartArea: {
//       width: string;
//   };
//   hAxis: {
//       minValue: number | string | undefined;
//       title: string;
//       titleTextStyle: {
//           italic: boolean;
//       };
//   };
//   isStacked: boolean | "percent";
//   legend: {
//       position: string;
//       maxLines: number;
//   };
//   vAxis: {
//       title: string;
//       ticks: number[] | string |undefined;
//       titleTextStyle: {
//           italic: boolean;
//       };
//   };
// }

function createDataTable(
  dataObjProp: number[][][],
  dataFunction: any,
  header: string[],
  techKeys: number[] = [0, 1, 2, 3, 4],
  sizeKeys: number[] = [0, 1]
): google.visualization.DataTable {

  const dataRows = dataFunction(dataObjProp, techKeys, sizeKeys);

  const dataTable = new google.visualization.DataTable();

  const [ period, ...keys ] = header;

  const filteredKeys = techKeys.map((k: number) => keys[k]);

  [ period, ...filteredKeys ].forEach(columnName => {
    dataTable.addColumn('number', columnName);
  })

  dataTable.addRows(dataRows);

  return dataTable
}

function multipleColumnChart(
  dataObj: number[][][],
  dataFunction: any,
  id_element: string,
  chartOptions: any, // Fix options interface
  header: string[]
): void {
  let data = createDataTable(dataObj, dataFunction, header);

  const container = document.getElementById(id_element) as HTMLElement;

  const chart = new google.visualization.ColumnChart(container);

  const percent_button = document.getElementById('fleet_percent_button') as HTMLButtonElement;

  const options = { ...chartOptions };

  const { minValue, maxValue } = chartOptions.vAxis;

  percent_button.addEventListener('click', () => {
    if (options.isStacked == 'percent') {
      percent_button.innerHTML = 'Porcentajes';
      options.isStacked = true;
      options.vAxis.minValue = minValue;
      options.vAxis.maxValue = maxValue;
    } else {
      percent_button.innerHTML = 'Valores';
      options.isStacked = 'percent';
      options.vAxis.minValue = 0;
      options.vAxis.maxValue = 0;
    }
    chart.draw(data, options);
  });

  const select_technology = document.getElementById('fleet_select_tech') as HTMLSelectElement;
  const select_size = document.getElementById('fleet_select_size') as HTMLSelectElement;

  function updateDataChart(){
    const techKeys: number[] = select_technology.value.split("").map((a: String) => Number(a));
    const sizeKeys: number[] = select_size.value.split("").map((a: String) => Number(a));
    data = createDataTable(dataObj, dataFunction, header, techKeys, sizeKeys);
    chart.draw(data, options);
  }

  select_technology.addEventListener('change', updateDataChart);
  select_size.addEventListener('change', updateDataChart);

  chart.draw(data, options);
}

export { multipleColumnChart }