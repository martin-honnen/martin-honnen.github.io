function xquery(input, xquery, inputType, codeBaseURI, inputBaseURI, resultsSelect) {

  if (!autoEvaluation)
    setDocument(resultEditor, "Processing your XQuery...", "text");
  
  saxonWorker.postMessage({ task: 'xquery', data : { input : input, code: xquery, inputType: inputType, xqueryBaseURI: codeBaseURI, inputBaseURI: inputBaseURI }});
    
}

function xqueryUrls(inputUrl, xqueryUrl, inputType, resultsSelect) {
  if (!autoEvaluation)
	  setDocument(resultEditor, "Processing your XQuery...", "text");

  saxonWorker.postMessage({ task: 'xquery-urls', data : { input : inputUrl, code: xqueryUrl, inputType: inputType }});  
}
