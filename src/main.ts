import { transformData } from "./functions";
import { defaultValues } from "./data";
import { navbarResultsScroll } from "./components/navbar-results";
import { createNavEvents} from "./components/main-navbar";
import { runEmissionCharts } from "./charts/draw-charts";

import { updateObj } from "./update"; 


var objValues = {...defaultValues}

console.log(updateObj(objValues));



const resultObj = transformData(defaultValues);
console.log(resultObj);

// console.log(createFleetByTech(resultObj.N));

// (() => {
//   console.log("Page fully loaded.");
// })();

(() => {
  runEmissionCharts(resultObj);
})();
createNavEvents();
navbarResultsScroll();

window.addEventListener("load", () => {
  // console.log("Page fully loaded.");
  // const resultObj = transformData(defaultValues);
  
  // createNavEvents();
  // navbarResultsScroll();
  // await runAnalysisCharts(resultObj);
  //console.log(resultObj);
})

