import { transformData } from "./functions";
import { defaultValues } from "./data";
import { navbarResultsScroll } from "./components/navbar-results";
import { createNavEvents} from "./components/main-navbar";
import { drawChart } from "./charts/line-chart";
import { runAnalysisCharts } from "./charts/draw-charts";



const resultObj = transformData(defaultValues);

() => {
  console.log(resultObj);
}
async () => {
  await runAnalysisCharts(resultObj)
  
}
// createNavEvents();
// navbarResultsScroll();

document.addEventListener("load", () => {
  const resultObj = transformData(defaultValues);
  
  //createNavEvents();
  // navbarResultsScroll();
  // drawChart();
  // await runAnalysisCharts(resultObj);
  console.log(resultObj);
})