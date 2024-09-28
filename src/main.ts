import { transformData } from "./functions";
import { defaultValues } from "./data";
import { navbarResultsScroll } from "./components/navbar-results";
import { createNavEvents} from "./components/main-navbar";
import { drawChart } from "./charts/line-chart";
import { runAnalysisCharts } from "./charts/draw-charts";
//import { createFleetByTech } from "./charts/chart-functions";

const resultObj = transformData(defaultValues);
console.log(resultObj);

// console.log(createFleetByTech(resultObj.N));

// (() => {
//   console.log("Page fully loaded.");
// })();

(() => {
  runAnalysisCharts(resultObj);
  
})();
createNavEvents();
navbarResultsScroll();

window.addEventListener("load", () => {
  // console.log("Page fully loaded.");
  // const resultObj = transformData(defaultValues);
  
  // createNavEvents();
  // navbarResultsScroll();
  drawChart();
  // await runAnalysisCharts(resultObj);
  //console.log(resultObj);
})

