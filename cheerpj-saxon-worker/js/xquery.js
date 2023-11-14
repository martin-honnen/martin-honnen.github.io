function xquery(input, xquery, inputType, resultsSelect) {

  if (!autoEvaluation)
    setDocument(resultEditor, "Processing your XQuery...", "text");
  
  saxonWorker.postMessage({ task: 'xquery', data : { input : input, code: xquery, inputType: inputType }});
    
}