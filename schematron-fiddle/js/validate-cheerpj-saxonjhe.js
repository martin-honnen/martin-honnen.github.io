function validate(xml, schematron, resultsSelect, schxltVersion) {

  if (!autoEvaluation)
    setDocument(resultEditor, "Processing your Schematron...", "text");

  saxonWorker.postMessage({ task: 'schematron', data : { input : xml, schematron: schematron, schxltVersion: schxltVersion } });

}


