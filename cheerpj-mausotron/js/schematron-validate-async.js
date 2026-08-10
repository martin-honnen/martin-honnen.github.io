async function schematronValidate(input, schematron, inputUri, xsltUri, outputUri) {

  if (mausotronInitialized) {
    
    try {
      cheerpOSAddStringFile("/str/schematron.sch", schematron);
      cheerpOSAddStringFile("/str/sample.xml", input);
      await mainClass.main("validate", "--verbose", input, schematron);
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