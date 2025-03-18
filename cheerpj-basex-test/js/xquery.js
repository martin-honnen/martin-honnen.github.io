function xquery(input, xquery, inputType, codeBaseURI, inputBaseURI, resultsSelect) {

  if (!autoEvaluation)
    setDocument(resultEditor, "Processing your XQuery...", "text");
  
  basexWorker.postMessage({ task: 'xquery', data : { input : input, code: xquery, inputType: inputType, xqueryBaseURI: codeBaseURI, inputBaseURI: inputBaseURI }});
    
}
