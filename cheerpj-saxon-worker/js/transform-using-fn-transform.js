async function transform(input, xslt, inputType, resultsSelect) {

  if (saxonInitialized) {
	  try {
		  var URI = await saxonhe.java.net.URI;
		  
		  var QName = await saxonhe.net.sf.saxon.s9api.QName;
		  
		  var xpathCompiler = await saxonProcessor.newXPathCompiler();
		  
		  var baseURI = await new URI('urn:from-string');
		  
		  await xpathCompiler.setBaseURI(baseURI);
		  
		  await xpathCompiler.declareNamespace('map', 'http://www.w3.org/2005/xpath-functions/map');
		  
		  await xpathCompiler.declareVariable(await new QName('xslt'));
		  
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
				var streamSource = await new StreamSource(await new StringReader(input)); //, await new URI('urn:from-string'));
				
				contextItem = await docBuilder.build(streamSource);
			}
			catch (e) {
				var result = 'Parsing your XML failed: ' + await e.toString() + ' ' + await e.getMessage();
				setDocument(resultEditor, result, 'text');
				return;				
			}
		  }	

		  if (contextItem === null) {
			var xpath = `let $result := transform(map { 'stylesheet-text' : $xslt, 'delivery-format' : 'serialized', 'base-output-uri' : 'file:///files/output' })
			             return map:for-each($result, function($uri, $serializedResult) { map { 'uri' : $uri, 'result' : $serializedResult } })`;
		  }
		  		  
		  else {
			await xpathCompiler.declareVariable(await new QName('context-item'));
			var xpath = `let $result := transform(map { 'stylesheet-text' : $xslt, 'delivery-format' : 'serialized', 'base-output-uri' : 'file:///files/output', 'initial-match-selection' : $context-item, 'global-context-item' : $context-item })
			             return map:for-each($result, function($uri, $serializedResult) { map { 'uri' : $uri, 'result' : $serializedResult } })`;
		  }
		  
		  var xpathExecutable = await xpathCompiler.compile(xpath);
		  
		  var xpathSelector = await xpathExecutable.load();
		  
		  var XdmAtomicValue = await saxonhe.net.sf.saxon.s9api.XdmAtomicValue;
		  
		  
		  
		  await xpathSelector.setVariable(await new QName('xslt'), await new XdmAtomicValue(xslt));
		  
		  if (contextItem !== null) {
			  await xpathSelector.setVariable(await new QName('context-item'), contextItem);
		  }
		  
		  try {
			  var result = await xpathSelector.evaluate();
			  
			  var responseData = { ResultType: 'transformation', ResultDocuments: [] };

			  var resultDocuments = [];
			  var size = await result.size();
			  for (var i = 0; i < size; i++) {
				var currentResult = await result.itemAt(i);
				var uri = await(await currentResult.get('uri')).toString();
				var content = await(await currentResult.get('result')).toString();
                let suffix = uri.replace(/.*(\.[a-z]+)/gi, '$1').toLowerCase();
                let method = filetypes[suffix];
                responseData.ResultDocuments.push({ uri: uri, content: content, method: method ? method : 'html' });
		      }
		  }
		  catch (e) {
			  var result = 'Executing your XSLT failed: '  + await e.toString() + ' ' + await e.getMessage();
			  setDocument(resultEditor, result, 'text');
			  return;
		  }


    //if ("output" in transformationResult) {
      //responseData.ResultDocuments.push({ uri: 'principal result', content: transformationResult.output, method: 'html' });
    //}


  resultsSelect.length = 0;

  if (responseData.ResultType === 'transformation') {
    responseData.ResultDocuments.forEach((result, index) => {
      resultsSelect.appendChild(new Option(result.uri, result.uri));
      if (index === 0) {
        writeResult(window.frames['current-result-frame'], result.content);
      }
    });

    resultsSelect.onchange = function (evt) {
      var selectedResult = responseData.ResultDocuments[this.selectedIndex];
      setDocument(resultEditor, selectedResult.content, selectedResult.method);

      if (document.getElementById('render-box').checked) {
        writeResult(window.frames['current-result-frame'], responseData.ResultDocuments[this.selectedIndex].content);
      }
    };

    setDocument(resultEditor, responseData.ResultDocuments[0].content, responseData.ResultDocuments[0].method);
  }

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

  }

}