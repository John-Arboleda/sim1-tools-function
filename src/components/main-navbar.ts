import { drawChartFunctions } from "../charts/draw-charts";
import { transformData } from "../functions";
// import { defaultValues } from "../data";
import { objValues } from "../update";



async function createNavEvents(): Promise<void> {

  const resultObj = await transformData(objValues);

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

      const prefixId = panelId.replace('-panel', '');

      const func = drawChartFunctions[prefixId];
      if (func) {
        func(resultObj);
      }
    });
  });
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