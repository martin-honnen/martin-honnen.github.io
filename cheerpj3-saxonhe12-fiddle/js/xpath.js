function xpath(input, xpathCode, inputType, codeBaseURI, inputBaseURI, resultsSelect) {

  if (!autoEvaluation)	
    setDocument(resultEditor, "Evaluating your XPath...", "text");

  saxonWorker.postMessage({ task: 'xpath', data : { input : input, code: xpathCode, inputType: inputType, xpathBaseURI: codeBaseURI, inputBaseURI: inputBaseURI }});
}
