async function xpath(input, xpathCode, inputType, resultsSelect) {

  if (saxonInitialized) {
	  var contextItem = null;
	  if (inputType === 'JSON') {
			try {
				contextItem = await jsonBuilder.parseJson(input);
			}
			catch (e) {
        if (e instanceof SaxonApiException) {
				  postMessage({ type: 'error', message: 'Parsing your JSON failed: ' + await e.getMessage() });
        }
        else if (e instanceof Error) {
          postMessage({ type: 'error', message: 'Parsing your JSON failed: ' + e.message });
        }
				return;
			}
	  }
	  else if (inputType === 'XML') {
			try {
				var streamSource = await new StreamSource(await new StringReader(input));
				
				contextItem = await docBuilder.build(streamSource);
			}
			catch (e) {
        if (e instanceof SaxonApiException) {
				  postMessage({ type: 'error', message: 'Parsing your XML failed: ' + await e.getMessage() });
        }
        else if (e instanceof Error) {
          postMessage({ type: 'error', message: 'Parsing your XML failed: ' + e.message });
        }
				return;			
			}
	  }	
    
    try {
      var xpathResult = await xpathProcessor.evaluate(xpathCode, contextItem);   
      
      var stringResult = await xpathResult.toString();
      
      postMessage({ type : 'result', task: 'xpath',  results : [stringResult] });
    }
    catch (e1) {
 		  console.log('Error evaluating XPath');
      if (e1 instanceof SaxonApiException) {
        postMessage({ type: 'error', message: 'Error evaluating XPath: ' + await e1.getMessage() + ' (Line ' + await e1.getLineNumber() + ')' });
        await e1.printStackTrace();
      }
      else if (e1 instanceof JException) {
        postMessage({ type : 'error', message : 'Error evaluating XPath' + await e1.getMessage() });
        await e1.printStackTrace();
      }
      else if (e1 instanceof Error) {
        postMessage({ type: 'error', message: 'Error evaluating XPath: ' + e1.message });
      }
    }  
  }
  else {
	  console.log('Wait for Saxon HE library to be loaded.');
  }

}