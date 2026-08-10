async function schematronValidate(input, schematron, inputUri, xsltUri, outputUri) {

  if (mausotronInitialized) {
    
    try {
      cheerpOSAddStringFile("/str/schematron.sch", schematron);
      cheerpOSAddStringFile("/str/sample.xml", input);
      await mainClass.main(["validate", "--verbose", "/str/schematron.sch", "/str/sample.xml"]);
    }
    catch (e) {
      postMessage({ 'type': 'error', message: 'Schematron validation of your XML failed: ' + (typeof e === 'string' ? e : await e.getMessage()) });
      return;
    }

  }
  else {
    console.log('Wait for Mausotron library to be loaded.');
  }


}