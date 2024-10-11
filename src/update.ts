import { getStaticInputValues, setStaticValues, setStaticObjValues, setStaticInputValues } from "./components/static-inputs";
import { drawChartFunctions } from "./charts/draw-charts";
import { transformData } from "./functions";
import { defaultValues } from "./data";

const staticInputCollection = document.getElementsByClassName('static-input') as HTMLCollection;

var objValues = {...defaultValues}

function updateObj(dataObj: any){

  const staticObj = getStaticInputValues(staticInputCollection);

  dataObj = setStaticValues(staticObj, dataObj);

  return dataObj;
}

// Function to draw the active panel
function drawActivePanel(resultObj: any){

  const panelNodes = document.querySelectorAll('.panel');

  // Use a for...of loop to iterate over elements
  for (const panel of panelNodes) {
    if (!panel.classList.contains('d-none')) {

      const panelId = panel.id;
      
      const func = drawChartFunctions[panelId];
      if (func) {
        func(resultObj);
      }
    }
  }
}

// Function to attach change event listeners to inputs
function drawChartsOnInput(): void {
  const staticInputCollection = document.getElementsByClassName('static-input');

  for (let i = 0; i < staticInputCollection.length; i++) {
    const input = staticInputCollection[i];

    if (input instanceof HTMLInputElement) {
      input.addEventListener('change', async () => {
        try {
          objValues = updateObj(objValues);
          const resultObj = await transformData(objValues);
          drawActivePanel(resultObj);
        } catch (error) {
          console.error('Failed to process input change:', error);
        }
      });
    }
  }
}

////

// function drawChartsOnInput(){
  
//   for(let input of staticInputCollection){

//     if (input instanceof HTMLInputElement) {

//       input.addEventListener('change', async () => {

//         objValues = updateObj(objValues);

//         console.log(objValues);
        
//         const resultObj = await transformData(objValues);

//         console.log(resultObj);

//         drawActivePanel(resultObj);
//       })
//     }
//   }
// }



function updateComponents(dataObj: any){

  // Update Static Inputs
  const staticObj = getStaticInputValues(staticInputCollection);

  const updatedStaticObj = setStaticObjValues(staticObj, dataObj);

  setStaticInputValues(staticInputCollection, updatedStaticObj);
}


export { updateObj, updateComponents, objValues, drawChartsOnInput }