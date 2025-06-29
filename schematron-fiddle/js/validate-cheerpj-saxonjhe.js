function validate(xml, schematron, schxsltVersion) {

  if (!autoEvaluation)
    setDocument(resultEditor, "Processing your Schematron...", "text");

  saxonWorker.postMessage({ task: 'schematron', data : { input : xml, schematron: schematron, schxsltVersion: schxsltVersion } });

}


