async function transform(input, xslt, inputType, resultsSelect) {

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
        var xsltExecutable = await xsltCompiler.compile(await new StreamSource(await new StringReader(xslt)));
		  }
		  catch (e) {
				var result = 'Compiling your XSLT failed: ' + await e.getMessage();

				postMessage({ type: 'error', message: result });
				return;
		  }

		  var xslt30Transformer = await xsltExecutable.load30();

		  if (contextItem !== null) {
        await xslt30Transformer.setGlobalContextItem(contextItem);
		  }
		  
		  var stringWriter = await new StringWriter();
		  
		  var destination = await xslt30Transformer.newSerializer(stringWriter);
		  
		  if (contextItem === null) {
			  try {
          await xslt30Transformer.callTemplate(null, destination);
			  }
			  catch (e) {
          var result = 'Running your initial template failed: ' + await e.getMessage() + ' (Line ' + await e.getLineNumber() + ')';

          postMessage({ type: 'error', message: result });
          return;
			  }
		  }
		  else {
			  try {
          await xslt30Transformer.applyTemplates(contextItem, destination);
			  }
			  catch (e) {
          var result = 'Applying your XSLT against the XML failed: ' + await e.getMessage() + ' (Line ' + await e.getLineNumber() + ')';

          postMessage({ type: 'error', message: result });
          return;
			  }
		  }
		  
		  var stringResult = await stringWriter.toString();
		  
		  postMessage({ type : 'result', task: 'transform',  results : [stringResult] });

	}
  else {
	  console.log('Wait for Saxon HE library to be loaded.');
  }

}