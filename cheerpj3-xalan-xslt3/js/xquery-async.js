async function xquery(input, xquery, inputType, inputUri, xqueryUri) {

  if (saxonInitialized) {
    
    inputUri = inputUri || 'urn:from-string';
    xqueryUri = xqueryUri || 'urn:from-string';
    
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
				var streamSource = await new StreamSource(await new StringReader(input), inputUri);
				
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
      await xqueryCompiler.setBaseURI(await new URI(xqueryUri));
		  var xqueryExecutable = await xqueryCompiler.compile(xquery);
    }
    catch (e) {
      if (e instanceof SaxonApiException) {
        postMessage({ type: 'error', message: 'Compiling your XQuery failed: ' + await e.getMessage()  + ' (Line ' + await e.getLineNumber() + ')' });
      }
      else if (e instanceof Error) {
        postMessage({ type: 'error', message: 'Compiling your XQuery failed: ' + e.message });
      }
      return;			
    }

    try {
		  var xquerySelector = await xqueryExecutable.load();

		  await xquerySelector.setContextItem(contextItem);

		  var stringWriter = await new StringWriter;
		 
		  var destination = await saxonProcessor.newSerializer();
		  
		  await destination.setOutputWriter(stringWriter);
			
		  await xquerySelector.run(destination);

		  var stringResult = await stringWriter.toString();

		  postMessage({ type : 'result', task: 'xquery',  results : [stringResult] });

	  }
	  catch (e) {
 		  console.log('Error evaluating XQuery');
      if (e instanceof SaxonApiException) {
        postMessage({ type: 'error', message: 'Error evaluating XQuery: ' + await e.getMessage() + ' (Line ' + await e.getLineNumber() + ')' });
        await e.printStackTrace();
      }
      else if (e instanceof JException) {
        postMessage({ type : 'error', message : 'Error evaluating XQuery' + await e.getMessage() });
        await e.printStackTrace();
      }
      else if (e instanceof Error) {
        postMessage({ type: 'error', message: 'Error evaluating XQuery: ' + e.message });
      }
    }
  }
  else {
	  console.log('Wait for Saxon HE library to be loaded.');
  }
    
}

async function xqueryUrls(inputUrl, xqueryUrl, inputType) {

  if (saxonInitialized) {
	var contextItem = null;
	if (inputType === 'JSON') {
		try {
			contextItem = await jsonDocFunction.call(saxonProcessor, await new XdmAtomicValue(inputUrl));
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
			var streamSource = await new StreamSource(inputUrl);
			
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
      var config = await saxonProcessor.getUnderlyingConfiguration();
      var moduleURIResolver = await xqueryCompiler.getModuleURIResolver();
      if (moduleURIResolver == null) {
        moduleURIResolver = await config.getStandardModuleURIResolver();
      }
      var moduleStreamSources = await moduleURIResolver.resolve(null, null, [xqueryUrl]);
      var moduleStreamSource = moduleStreamSources[0];
      var characterChecker = await config.getValidCharacterChecker();
      var xquery = await QueryReader.readSourceQuery(config, moduleStreamSource, characterChecker);
      await xqueryCompiler.setBaseURI(await new URI(await moduleStreamSource.getSystemId()));
      var xqueryExecutable = await xqueryCompiler.compile(xquery);
    }
    catch (e) {
      if (e instanceof SaxonApiException) {
        postMessage({ type: 'error', message: 'Compiling your XQuery failed: ' + await e.getMessage()  + ' (Line ' + await e.getLineNumber() + ')' });
      }
      else if (e instanceof Error) {
        postMessage({ type: 'error', message: 'Compiling your XQuery failed: ' + e.message });
      }
      return;			
    }

    try {
		  var xquerySelector = await xqueryExecutable.load();

		  await xquerySelector.setContextItem(contextItem);

		  var stringWriter = await new StringWriter;
		 
		  var destination = await saxonProcessor.newSerializer();
		  
		  await destination.setOutputWriter(stringWriter);
			
		  await xquerySelector.run(destination);

		  var stringResult = await stringWriter.toString();

		  postMessage({ type : 'result', task: 'xquery',  results : [stringResult] });

	  }
	  catch (e) {
 		  console.log('Error evaluating XQuery');
      if (e instanceof SaxonApiException) {
        postMessage({ type: 'error', message: 'Error evaluating XQuery: ' + await e.getMessage() + ' (Line ' + await e.getLineNumber() + ')' });
        await e.printStackTrace();
      }
      else if (e instanceof JException) {
        postMessage({ type : 'error', message : 'Error evaluating XQuery' + await e.getMessage() });
        await e.printStackTrace();
      }
      else if (e instanceof Error) {
        postMessage({ type: 'error', message: 'Error evaluating XQuery: ' + e.message });
      }
    }
  }
  else {
	  console.log('Wait for Saxon HE library to be loaded.');
  }
    
}