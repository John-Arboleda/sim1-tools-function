
const co2Options = {
  chartArea: { width: '75%' },
  legend: {position: 'bottom', maxLines: 3},
  hAxis: {
    //minValue: 'auto',
    title: 'Periodo (años)',
    titleTextStyle: {
      italic: false,
    },
    format: '####',
  },
  vAxis: {
    title: 'Emisiones (Toneladas de CO2e)',
    ticks: 'auto',
    titleTextStyle: {
      italic: false,
    }
  },
}

const emissionsOptions = {
  chartArea: { width: '75%' },
  hAxis: {
    minValue: 'auto',
    title: 'Periodo (años)',
    titleTextStyle: {
      italic: false,
    },
    format: '####',
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
    },
    format: '####',
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

const buyFleetOptions = {
  chartArea: { width: '75%', height: 200, top: 100 },
  hAxis: {
    minValue: 'auto',
    // title: 'Periodo (años)',
    titleTextStyle: {
      italic: false,
    },
    textPosition: 'none',
    format: '####',
  },
  isStacked: true,
  legend: {position: 'none', maxLines: 3},
  vAxis: {
    title: 'Número de vehículos\nadquiridos',
    ticks: 'auto',
    titleTextStyle: {
      italic: false,
    },
    minValue: 0,
    maxValue: 20000,
  },
  annotations: {
    alwaysOutside: true,
    textStyle: {
      fontSize: 8,
      color: '#000',
      // auraColor: '#888'
    },
    stem: {
      length: -5,
    }
  },
};

const sellFleetOptions = {
  chartArea: { width: '75%', height: 200, top: 0 },
  hAxis: {
    minValue: 'auto',
    title: 'Periodo (años)',
    titleTextStyle: {
      italic: false,
    },
    format: '####',
  },
  isStacked: true,
  legend: {position: 'bottom', maxLines: 3},
  vAxis: {
    title: 'Número de vehículos\nvendidos',
    ticks: 'auto',
    titleTextStyle: {
      italic: false,
    },
    maxValue: 0,
    minValue: -20000,
  },
  annotations: {
    alwaysOutside: true,
    textStyle: {
      fontSize: 8,
      color: '#000',
      // auraColor: '#888'
    },
    stem: {
      length: -10,
    }
  },
};

export { sellFleetOptions, buyFleetOptions, fleetOptions, emissionsOptions, co2Options }