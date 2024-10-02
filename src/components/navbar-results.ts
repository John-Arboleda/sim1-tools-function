
function navbarResultsScroll(): void {
  const mainPanel = document.getElementById('main-panel') as HTMLElement;
  // Get the navbar
  const emissionsResultNavbar = document.getElementById('emissions-result-navbar') as HTMLElement;
  const fleetResultNavbar = document.getElementById('fleet-result-navbar') as HTMLElement;
  const costsResultNavbar = document.getElementById('costs-result-navbar') as HTMLElement;
  const energyResultNavbar = document.getElementById('energy-result-navbar') as HTMLElement;

  // Add the sticky class to the navbar when you reach its scroll position.
  // Remove "sticky" when you leave the scroll position
  function makeStickyNavbar(navbar: HTMLElement): void {
    // Get the offset position of the navbar
    const sticky: number = navbar.offsetTop;

    if (mainPanel.scrollTop > sticky) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  }

  // When the user scrolls the page, execute makeStickyNavbar
  mainPanel.onscroll = function (): void { 
    makeStickyNavbar(emissionsResultNavbar); 
    makeStickyNavbar(fleetResultNavbar); 
    makeStickyNavbar(costsResultNavbar); 
    makeStickyNavbar(energyResultNavbar); 
  };
}

export { navbarResultsScroll };