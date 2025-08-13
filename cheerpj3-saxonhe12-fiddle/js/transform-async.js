async function transform(input, xslt, inputType, inputUri, xsltUri, outputUri) {

  if (saxonInitialized) {
    
    try {
      var results = await SaxonHelpers.runXsltTransformation(input, inputType, inputUri || 'urn:from-string', xslt, xsltUri || 'urn:from-string');
      
      //var results = await SaxonHelper.runXsltTransformation(input, inputType, baseInputUri, xslt, baseXsltUri, gistResolver !== null ? gistResolver : null);
      
      var resultDocuments = [];
      
      var size = results.length;
      
      for (var i = 0; i < size; i++) {
        var currentResult = results[i];
        var uri = await currentResult.getUri();
        var content = await currentResult.getContent();
        let suffix = uri.replace(/.*(\.[a-z]+)/gi, '$1').toLowerCase();
        let method = filetypes[suffix];
        resultDocuments.push({ uri: uri, content: content, method: method ? method : 'html' });
      }
      
      postMessage({ 'type': 'XSLT-Results', results: resultDocuments });

    }
    catch (e) {
      postMessage({ 'type': 'error', message: 'Executing your XSLT failed: ' + (typeof e === 'string' ? e : await e.getMessage()) });
      return;
    }

  }
  else {
    console.log('Wait for Saxon HE library to be loaded.');
  }

}

async function transform1(input, xslt, inputType, inputUri, xsltUri, outputUri) {

  inputUri = inputUri || 'urn:from-string';
  xsltUri = xsltUri || 'urn:from-string';
  outputUri = outputUri || 'file:/files/xslt-output';

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
      var xsltExecutable = await xsltCompiler.compile(await new StreamSource(await new StringReader(xslt), xsltUri));
    }
    catch (e) {
      if (e instanceof SaxonApiException) {
        postMessage({ type: 'error', message: 'Compiling your XSLT failed: ' + await e.getMessage() });
      }
      else if (e instanceof Error) {
        postMessage({ type: 'error', message: 'Parsing your XML failed: ' + e.message });
      }
      else if (e instanceof JException) {
        await e.printStackTrace();
      }
      return;
    }

    var xslt30Transformer = await xsltExecutable.load30();

    await xslt30Transformer.setBaseOutputURI(outputUri);

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


async function transformUrls(inputUrl, xsltUrl, inputType, resultsSelect) {

  if (saxonInitialized) {
  	  var contextItem = null;
  	  if (inputType === 'JSON') {
  			try {
  				contextItem = await jsonDocFunction.call(saxonProcessor, [await new XdmAtomicValue(inputUrl)]);
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
        var xsltExecutable = await xsltCompiler.compile(await new StreamSource(xsltUrl));
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