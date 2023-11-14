function transform(input, xslt, inputType, resultsSelect) {

  if (!autoEvaluation)
	  setDocument(resultEditor, "Processing your XSLT...", "text");

  saxonWorker.postMessage({ task: 'transform', data : { input : input, code: xslt, inputType: inputType }});
/*   if (saxonInitialized) {
	  try {
		  var contextItem = null;
		  
		  if (inputType === 'JSON') {
			try {
				contextItem = await jsonBuilder.parseJson(input);
			}
			catch (e) {
				var result = 'Parsing your JSON failed: ' + await e.toString() + ' ' + await e.getMessage();
				setDocument(resultEditor, result, 'text');
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
				setDocument(resultEditor, result, 'text');
				return;				
			}
		  }	
		  
		  try {
			var xsltExecutable = await xsltCompiler.compile(await new StreamSource(await new StringReader(xslt)));
		  }
		  catch (e) {
				var result = 'Compiling your XSLT failed: ' + await e.toString() + ' ' + await e.getMessage();
				setDocument(resultEditor, result, 'text');
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
				var result = 'Running your initial template failed: ' + await e.toString() + ' ' + await e.getMessage();
				setDocument(resultEditor, result, 'text');
				return;
			  }
		  }
		  else {
			  try {
				await xslt30Transformer.applyTemplates(contextItem, destination);
			  }
			  catch (e) {
				var result = 'Applying your XSLT against the XML failed: ' + await e.toString() + ' ' + await e.getMessage();
				setDocument(resultEditor, result, 'text');
				return;
			  }
		  }
		  
		  var stringResult = await stringWriter.toString();  //await CheerpJ3Helper.javaToString(stringWriter);

		  setDocument(resultEditor, stringResult, 'xml');

		  writeResult(window.frames['current-result-frame'], stringResult);
	  }
	  catch (e) {
		  console.log(e);
		  console.log(await e.toString(), await e.getMessage());
		  debugger
	  }
  }
  else {
	  console.log('Wait for Saxon HE library to be loaded.');
	  alert('Wait for Saxon HE library to be loaded.');

  } */

}