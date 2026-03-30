function xpath(input, xpathCode, inputType, resultsSelect) {

  if (!autoEvaluation)	
    setDocument(resultEditor, "Evaluating your XPath...", "text");

  phoenixmlWorker.postMessage({ task: 'xpath', data : { input : input, code: xpathCode, inputType: inputType }});
}