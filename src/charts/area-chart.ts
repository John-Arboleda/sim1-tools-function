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
interface ChartOptions {
  chartArea: {
      width: string;
  };
  hAxis: {
      minValue: string;
      title: string;
      titleTextStyle: {
          italic: boolean;
      };
  };
  isStacked: (boolean|String);
  legend: {
      position: string;
      maxLines: number;
  };
  vAxis: {
      title: string;
      ticks: (string|Number[]);
      titleTextStyle: {
          italic: boolean;
      };
  };
}

function createDataTable(
  dataObj: DataObj,
  dataFunction: DataFunction) {

  const [ header, ...rest ] = dataFunction(dataObj);

  const dataTable = new google.visualization.DataTable();

  header.forEach(columnName => {
    dataTable.addColumn('number', columnName);
  })

  dataTable.addRows(rest);

  return dataTable
}

function multipleAreaChart(
  dataObj: DataObj,
  dataFunction: DataFunction,
  id_element: string,
  chartOptions: ChartOptions
): void {
  // let data = google.visualization.arrayToDataTable(dataFunction(dataJson));
  let data = createDataTable(dataObj, dataFunction);

  const chart = new google.visualization.AreaChart(document.getElementById(id_element));

  const percent_button = document.getElementById('emissions_percent_button') as HTMLButtonElement;

  const options = { ...chartOptions }

  percent_button.addEventListener('click', () => {
    if (options.isStacked == 'percent') {
      percent_button.innerHTML = 'Porcentajes';
      options.isStacked = true;
      options.vAxis.ticks = 'auto';
    } else {
      percent_button.innerHTML = 'Valores';
      options.isStacked = 'percent';
      options.vAxis.ticks = [0, 0.25, 0.50, 0.75, 1];
    }
    chart.draw(data, options);
  });

  const select_technology = document.getElementById('emissions_select_tech') as HTMLSelectElement;
  const select_size = document.getElementById('emissions_select_size') as HTMLSelectElement;

  function updateDataChart(){
    const techKeys: number[] = select_technology.value.split("").map((a: String) => Number(a));
    const sizeKeys: number[] = select_size.value.split("").map((a: String) => Number(a));;

    data = google.visualization.arrayToDataTable(dataFunction(dataObj, techKeys, sizeKeys));
    chart.draw(data, options);
  }

  select_technology.addEventListener('change', updateDataChart);
  select_size.addEventListener('change', updateDataChart);

  chart.draw(data, options);
}

export { multipleAreaChart }