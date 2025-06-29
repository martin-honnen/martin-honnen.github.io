function validate(xml, schematron, resultsSelect, schxltVersion) {

  if (!autoEvaluation)
    setDocument(resultEditor, "Processing your Schematron...", "text");

  saxonWorker.postMessage({ task: 'schematron', data : { input : input, schematron: schematron, schxltVersion: schxltVersion } });

}


