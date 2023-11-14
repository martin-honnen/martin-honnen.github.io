async function xpath(input, xpathCode, inputType, resultsSelect) {

  if (saxonInitialized) {
	  var contextItem = null;
	  if (inputType === 'JSON') {
			try {
				contextItem = await jsonBuilder.parseJson(input);
			}
			catch (e) {
				var result = 'Parsing your JSON failed: ' + await e.toString() + ' ' + await e.getMessage();
				//setDocument(resultEditor, result, 'text');
				postMessage({ type: 'error', message: result });
				return;
			}
	  }
	  else if (inputType === 'XML') {
			try {
				var streamSource = await new StreamSource(await new StringReader(input));
				
				contextItem = await docBuilder.build(streamSource);
			}
			catch (e) {
				var result = 'Parsing your XML failed: ' + await e.toString() + ' ' + await e.getMessage();
				//setDocument(resultEditor, result, 'text');
				postMessage({ type: 'error', message: result });
				return;				
			}
	  }	
    
    try {
      var xpathResult = await xpathProcessor.evaluate(xpathCode, contextItem);
      
      
      var stringResult = await xpathResult.toString(); // await CheerpJ3Helper.javaToString(xpathResult);
      
      //setDocument(resultEditor, stringResult, 'xml');

      //writeResult(window.frames['current-result-frame'], stringResult);
      postMessage({ type : 'result', task: 'xpath',  results : [stringResult] });
    }
    catch (e1) {
 		  console.log('Error evaluating XPath');
      try {
        postMessage({ type: 'error', message: 'Error evaluating XPath: ' + e1 });
      }
      catch (e) {
        try {
          postMessage({ type : 'error', message : 'Error evaluating XPath' + await e1.getMessage() });
        }
        catch (e) {
          try {
            postMessage({ type : 'error', message : 'Error evaluating XPath' + await e1.toString() });
          }
          catch (e) {
            postMessage({ type : 'error', message : 'Error evaluating XPath' });
          }
        }
      }
   
		  //console.log(await e.toString(), await e.getMessage());
      try {
        await e1.printStackTrace();
      }
      catch (e) {}
    }  
  }
  else {
	  console.log('Wait for Saxon HE library to be loaded.');
  }

}