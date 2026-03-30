function validate(xml, schematron, schxsltVersion) {

  if (!autoEvaluation)
    setDocument(resultEditor, "Processing your Schematron...", "text");

  phoenixmlWorker.postMessage({ task: 'schematron', data : { input : xml, schematron: schematron, schxsltVersion: schxsltVersion } });

}


