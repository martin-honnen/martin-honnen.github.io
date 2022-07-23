const jwL = jwiXML();
const compileGrammar = jwL.compileGrammar;
const parseiXMLData = jwL.parse;

function xpathEvaluate(input, xpath, inputType, resultsSelect) {

  var transformationResult;

  const namespaceContext = {
    js: 'http://saxonica.com/ns/globalJS',
    ixsl: 'http://saxonica.com/ns/interactiveXSLT'
  };

  try {
    if (inputType === 'XML') {
      const xmlDoc = new DOMParser().parseFromString(input, 'application/xml');
      transformationResult = SaxonJS.XPath.evaluate(
        xpath,
        xmlDoc,
        {
          resultForm: 'xdm',
          namespaceContext: namespaceContext
        }
      );
    }
    else if (inputType === 'JSON') {
      transformationResult = SaxonJS.XPath.evaluate(
        `parse-json($json-input-string) ! (${xpath})`,
        [],
        {
          resultForm: 'xdm',
          params: {
            'json-input-string': input
          },
          namespaceContext: namespaceContext
        }
      );
    }
    else if (inputType === 'HTML') {
      var htmlDoc = new DOMParser().parseFromString(input, 'text/html');
      transformationResult = SaxonJS.XPath.evaluate(
        xpath,
        htmlDoc,
        {
          resultForm: 'xdm',
          xpathDefaultNamespace: 'http://www.w3.org/1999/xhtml',
          namespaceContext: namespaceContext
        }
      );
    }
    else if (inputType === 'None') {
      transformationResult = SaxonJS.XPath.evaluate(
        xpath,
        [],
        {
          resultForm: 'xdm',
          namespaceContext: namespaceContext
        }
      );
    }

    resultsSelect.length = 0;

    var serializedResults = [];
    var serializedResult;

    if (transformationResult.every(item => item instanceof Node)) {
      var method = transformationResult.every(item => item.ownerDocument instanceof HTMLDocument) ? 'html' : 'xml';

      serializedResult = SaxonJS.serialize(transformationResult, { method: method, indent: true });
      serializedResults.push({ value: serializedResult, method: method });

      resultsSelect.appendChild(new Option(`Result`, `Result`));

      if (document.getElementById('render-box').checked) {
        writeResult(window.frames['current-result-frame'], serializedResult, method);
      }
    }
    else {
      transformationResult.forEach((result, index) => {

        if (result instanceof HTMLDocument || result instanceof HTMLElement) {
          serializedResult = SaxonJS.serialize(result, { method: 'html' });
          serializedResults.push({ value: serializedResult, method: 'html' });
        }
        else if (result instanceof Node) {
          serializedResult = SaxonJS.serialize(result, { method: 'xml' });
          serializedResults.push({ value: serializedResult, method: 'xml' });
        }
        else {
          try {
            serializedResult = SaxonJS.serialize(result, { method: 'json' });
            serializedResults.push({ value: serializedResult, method: 'json' });
          }
          catch (e1) {
            serializedResult = SaxonJS.serialize(result, { method: 'adaptive' });
            serializedResults.push({ value: serializedResult, method: 'json' });
          }
        }


        resultsSelect.appendChild(new Option(`result ${index + 1}`, `result${index + 1}`));
        if (index === 0) {
          writeResult(window.frames['current-result-frame'], serializedResult);
        }
      });

      resultsSelect.onchange = function (evt) {
        var selectedResult = serializedResults[this.selectedIndex].value;
        setDocument(resultEditor, selectedResult);

        if (document.getElementById('render-box').checked) {
          writeResult(window.frames['current-result-frame'], selectedResult, serializedResults[this.selectedIndex].method);
        }
      };
    }

    setDocument(resultEditor, serializedResults[0].value, serializedResults[0].method);
    //if (transformationResult instanceof Node) {
    //  if (transformationResult instanceof HTMLDocument) {
    //    const serializedResult = SaxonJS.serialize(transformationResult, { method: 'html' });
    //    setDocument(resultEditor, serializedResult, 'html');
    //  }
    //  else {
    //    const serializedResult = SaxonJS.serialize(transformationResult, { method: 'xml' });
    //    setDocument(resultEditor, serializedResult, 'xml');
    //  }
    //}
    //else {
    //  const serializedResult = SaxonJS.serialize(transformationResult, { method: 'adaptive' });
    //  setDocument(resultEditor, serializedResult, 'json');
    //}


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
