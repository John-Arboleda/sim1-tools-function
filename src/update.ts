import { getStaticInputValues, setStaticValues, setStaticObjValues, setStaticInputValues } from "./components/static-inputs";

const staticInputCollection = document.getElementsByClassName('static-input') as HTMLCollection;

function updateObj(dataObj: any){

  const staticObj = getStaticInputValues(staticInputCollection);

  console.log(staticObj);

  dataObj = setStaticValues(staticObj, dataObj);

  return dataObj;
}

function updateComponents(dataObj: any){

  // Update Static Inputs
  const staticObj = getStaticInputValues(staticInputCollection);

  const updatedStaticObj = setStaticObjValues(staticObj, dataObj);

  setStaticInputValues(staticInputCollection, updatedStaticObj);
}


export { updateObj, updateComponents }