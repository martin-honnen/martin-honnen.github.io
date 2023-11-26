function xquery(input, xquery, inputType, resultsSelect) {

  if (!autoEvaluation)
    setDocument(resultEditor, "Processing your XQuery...", "text");
  
  saxonWorker.postMessage({ task: 'xquery', data : { input : input, code: xquery, inputType: inputType }});
    
}

function xqueryUrls(inputUrl, xqueryUrl, inputType, resultsSelect) {
  if (!autoEvaluation)
	  setDocument(resultEditor, "Processing your XSLT...", "text");

  saxonWorker.postMessage({ task: 'xquery-urls', data : { input : inputUrl, code: xqueryUrl, inputType: inputType }});  
}