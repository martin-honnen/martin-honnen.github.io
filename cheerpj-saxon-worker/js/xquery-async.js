async function xquery(input, xquery, inputType) {

  if (saxonInitialized) {
x	  var contextItem = null;
	  if (inputType === 'JSON') {
			try {
				contextItem = await jsonBuilder.parseJson(input);
			}
			catch (e) {
        if (e instanceof SaxonApiException) {
				  postMessage({ type: 'error', message: 'Parsing your JSON failed: ' + await e.getMessage()  + ' (Line ' + await e.getLineNumber() + ')' });
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
				  postMessage({ type: 'error', message: 'Parsing your XML failed: ' + await e.getMessage()  + ' (Line ' + await e.getLineNumber() + ')' });
        }
        else if (e instanceof Error) {
          postMessage({ type: 'error', message: 'Parsing your XML failed: ' + e.message });
        }
				return;			
			}
	  }	

    try {
		  var xqueryExecutable = await xqueryCompiler.compile(xquery);

		  var xquerySelector = await xqueryExecutable.load();

		  await xquerySelector.setContextItem(contextItem);

		  var stringWriter = await new StringWriter;
		 
		  var destination = await saxonProcessor.newSerializer();
		  
		  await destination.setOutputWriter(stringWriter);
			
		  await xquerySelector.run(destination);

		  var stringResult = await stringWriter.toString(); //await  CheerpJ3Helper.javaToString(stringWriter);

		  //setDocument(resultEditor, stringResult, 'xml');

		  //writeResult(window.frames['current-result-frame'], stringResult);
		  postMessage({ type : 'result', task: 'xquery',  results : [stringResult] });

	  }
	  catch (e) {
 		  console.log('Error evaluating XQuery');
      if (e instanceof SaxonApiException) {
        postMessage({ type: 'error', message: 'Error evaluating XPath: ' + await e.getMessage() + ' (Line ' + await e.getLineNumber() + ')' });
        await e.printStackTrace();
      }
      else if (e instanceof JException) {
        postMessage({ type : 'error', message : 'Error evaluating XPath' + await e.getMessage() });
        await e.printStackTrace();
      }
      else if (e instanceof Error) {
        postMessage({ type: 'error', message: 'Error evaluating XPath: ' + e.message });
      }
    }
  }
  else {
	  console.log('Wait for Saxon HE library to be loaded.');
  }
    
}
