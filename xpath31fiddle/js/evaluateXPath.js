function xpathEvaluate(input, xpath, inputType, resultsSelect) {

  var transformationResult;

  try {
    if (inputType === 'XML') {
      const xmlDoc = new DOMParser().parseFromString(input, 'application/xml');
      transformationResult = SaxonJS.XPath.evaluate(
        xpath,
        xmlDoc,
        {
          
        }
      );
    }
    else if (inputType === 'JSON') {
      transformationResult = SaxonJS.XPath.evaluate(
        `parse-json($json-input-string) ! (${xpath})`,
        [],
        {
          params: {
            'json-input-string': input
          }
        }
      );
    }
    else if (inputType === 'HTML') {
      var htmlDoc = new DOMParser().parseFromString(input, 'text/html');
      transformationResult = SaxonJS.XPath.evaluate(
        xpath,
        htmlDoc,
        {
          xpathDefaultNamespace: 'http://www.w3.org/1999/xhtml'
        }
      );
    }
    else if (inputType === 'None') {
      transformationResult = SaxonJS.XPath.evaluate(
        xpath,
        [],
        {
          
        }
      );
    }

    if (transformationResult instanceof Node) {
      if (transformationResult instanceof HTMLDocument) {
        const serializedResult = SaxonJS.serialize(transformationResult, { method: 'html' });
        setDocument(resultEditor, serializedResult, 'html');
      }
      else {
        const serializedResult = SaxonJS.serialize(transformationResult, { method: 'xml' });
        setDocument(resultEditor, serializedResult, 'xml');
      }
    }
    else {
      const serializedResult = SaxonJS.serialize(transformationResult, { method: 'adaptive' });
      setDocument(resultEditor, serializedResult, 'json');
    }
    

  }
  catch (e) {
    resultsSelect.length = 0;
    setDocument(
      resultEditor,
      `Error during XPath evaluation:
${e.message}
XPath line number: ${e.xsltLineNr}
e.stack`,
      'text');
    return;
  }

}