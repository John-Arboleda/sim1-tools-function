import { transformData } from "./functions";
import { defaultValues } from "./data";
import { navbarResultsScroll } from "./components/navbar-results";
import { createNavEvents } from "./components/sidebar";
import { drawChart } from "./charts/line-chart";

const resultObj = transformData(defaultValues);

console.log(resultObj);

document.addEventListener("DOMContentLoaded", function() {

  createNavEvents();
  navbarResultsScroll();
  drawChart();

})