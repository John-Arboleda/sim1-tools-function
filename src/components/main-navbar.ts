import { runEmissionCharts, runFleetCharts, runCostsCharts, runEnergyCharts, drawChartFunctions } from "../charts/draw-charts";
import { transformData } from "../functions";
// import { defaultValues } from "../data";
import { objValues } from "../update";

const resultObj = transformData(objValues);

function createNavEvents(): void {
  const navItems = document.querySelectorAll(".navbar-item");

  

  navItems.forEach((navItem: Element) => {
    navItem.addEventListener("click", () => {
      const mainNavbar = document.getElementById('main-navbar') as HTMLElement;
      const activeLink = mainNavbar.querySelector('.active') as HTMLElement;
      activeLink.classList.remove('active');
      
      

      const navLink = navItem.querySelector('.nav-link') as HTMLElement;
      navLink.classList.add('active');
    
      const id = navItem.getAttribute('id')!;
      const panelId = id.replace('nav-button', 'panel');
    
      const panels = document.querySelectorAll('.panel');
      panels.forEach((panel: Element) => {
        panel.classList.add('d-none');
      });
    
      const panelToShow = document.getElementById(panelId) as HTMLElement;
      panelToShow.classList.remove('d-none');

      const func = drawChartFunctions[panelId];
      if (func) {
        func(resultObj);
      }

      // if (panelId == "emissions-panel") {
      //   runEmissionCharts(resultObj);
      // } 
      
      // if (panelId == "fleet-panel") {
      //   runFleetCharts(resultObj);
      // } 
      
      // if (panelId == "costs-panel") {
      //   runCostsCharts(resultObj);
      // }

      // if (panelId == "energy-panel") {
      //   runEnergyCharts(resultObj);
      // }
    });
  });

  // const summaryButton = document.getElementById('summary-nav-button') as HTMLElement;

  // summaryButton.addEventListener('click', () => {
  //   runSummaryCharts();
  //   resizeSummaryPanel();
  // });
}

// function resizeSummaryPanel(): void {
//   const summaryPanel = document.getElementById('summary-panel') as HTMLElement;
//   window.addEventListener('resize', () => {
//     if (!summaryPanel.classList.contains('d-none')) {
//       runSummaryCharts();
//     }
//   });
// }

export { createNavEvents };