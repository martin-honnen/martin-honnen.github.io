const filetypes = {
  '.htm': 'html',
  '.html': 'html',
  '.xml': 'xml',
  '.xsl': 'xml',
  '.xslt': 'xml',
  '.xhtml' : 'xml',
  '.json' : 'json'
};

function transform(input, xslt, inputType, resultTextarea, resultsSelect) {

  var transformationResult, responseData;

  try {
    if (inputType === 'XML') {
      transformationResult = SaxonJS.XPath.evaluate(
        "transform(map {'stylesheet-text': $stylesheet-text , 'source-node' : parse-xml($source-text), 'delivery-format' : 'serialized' })",
        [],
        {
          params: {
            'stylesheet-text': xslt,
            'source-text': input
          }
        }
      );
    }
    else if (inputType === 'JSON') {
      transformationResult = SaxonJS.XPath.evaluate(
        "let $json-input := parse-json($json-input-string) return transform(map {'stylesheet-text': $stylesheet-text , 'global-context-item' : $json-input, 'initial-match-selection' : $json-input, 'delivery-format' : 'serialized' })",
        [],
        {
          params: {
            'stylesheet-text': xslt,
            'json-input-string': input
          }
        }
      );
    }
    else if (inputType === 'HTML') {
      var htmlDoc = new DOMParser().parseFromString(input, 'text/html');
      transformationResult = SaxonJS.XPath.evaluate(
        "transform(map {'stylesheet-text': $stylesheet-text , 'source-node' : ., 'delivery-format' : 'serialized' })",
        htmlDoc,
        {
          params: {
            'stylesheet-text': xslt
          }
        }
      );
    }
    else if (inputType === 'None') {
      transformationResult = SaxonJS.XPath.evaluate(
        "transform(map {'stylesheet-text': $stylesheet-text, 'delivery-format' : 'serialized' })",
        [],
        {
          params: {
            'stylesheet-text': xslt,
          }
        }
      );
    }

    responseData = { ResultType: 'transformation', ResultDocuments: [] };

    if ("output" in transformationResult) {
      responseData.ResultDocuments.push({ uri: 'principal result', content: transformationResult.output, method: 'html' });
    }

    for (let resultDocUri in transformationResult) {
      if (resultDocUri !== 'output') {
        let suffix = resultDocUri.replace(/.*(\.[a-z]+)/gi, '$1').toLowerCase();
        let method = filetypes[suffix];
        responseData.ResultDocuments.push({ uri: resultDocUri, content: transformationResult[resultDocUri], method: method ? method : 'html' });
      }
    }

  }
  catch (e) {
    resultsSelect.length = 0;
    resultTextarea.value = 
      `Error during transformation:
${e.message}
XSLT line number: ${e.xsltLineNr}
e.stack`;
    return;
  }


  resultsSelect.length = 0;

  if (responseData.ResultType === 'transformation') {
    responseData.ResultDocuments.forEach((result, index) => {
      resultsSelect.appendChild(new Option(result.uri, result.uri));
    });

    resultsSelect.onchange = function (evt) {
      var selectedResult = responseData.ResultDocuments[this.selectedIndex];
      resultTextarea.value = selectedResult.content;
    };

    resultTextarea.value = responseData.ResultDocuments[0].content;
  }

}
