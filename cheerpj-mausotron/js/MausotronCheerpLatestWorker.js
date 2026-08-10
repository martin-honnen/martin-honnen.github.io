importScripts("https://cjrtnc.leaningtech.com/20260803_3439/loader.js");//importScripts("https://cjrtnc.leaningtech.com/20260129_2897/loader.js"); //https://cjrtnc.leaningtech.com/4.2/loader.js"); //"https://cjrtnc.leaningtech.com/3_20250414_1093/cj3loader.js"); //https://cjrtnc.leaningtech.com/3_20250330_890/cj3loader.js");//https://cjrtnc.leaningtech.com/3.1/cj3loader.js"); //importScripts("https://cjrtnc.leaningtech.com/3_20241216_574/cj3loader.js"); //importScripts("https://cjrtnc.leaningtech.com/3_20241213_572/cj3loader.js"); //importScripts("https://cjrtnc.leaningtech.com/3.0/cj3loader.js");

var filetypes = {
  '.xml': 'xml',
  '.sch': 'xml',
};

var lib = null;

var mainClass = null;

var mausotronInitialized = false;

(async () => {

  await cheerpjInit({version: 21});

  lib = await cheerpjRunLibrary("/app/cheerpj-mausotron/mausotron/mausotron-1.5.jar");

  console.log('Worker CheerpJ library initialized');

  postMessage({ type: 'message', message : 'hide', id : 'cheerpj-load-indicator' });

  mainClass = await lib.info.mausotron.Main;

  mausotronInitialized = true;

  importScripts("schematron-validate-async.js");

  console.log('Worker Mausotron initialized');

  postMessage({ type: 'message', message : 'hide', id : 'mausotron-load-indicator' });

})();

onmessage = async (e) => {
  var task = e.data.task;
  var data = e.data.data;
  if (task === 'schematron-validate') {
    await schematronValidate(data.input, data.code, data.inputType, data.inputBaseURI, data.xsltBaseURI);
  }
}
