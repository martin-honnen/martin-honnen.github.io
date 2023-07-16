import { docPool, textPool }  from './init-gist-examples-sef.json';

async function transform(input, xsltSef, inputType, resultsSelect) {

  var transformationResult, responseData;

  var transformationOptions;

  try {
    if (inputType === 'XML') {
      transformationOptions = {
        stylesheetText: xsltSef,
        stylesheetBaseURI: window.location.href,
        sourceType: 'xml',
        sourceText: input,
        sourceBaseURI: window.location.href, 
        destination: 'serialized',
        documentPool: docPool,
        textResourcePool: textPool
      };
    }
    else if (inputType === 'JSON') {
      transformationOptions = {
        stylesheetText: xsltSef,
        stylesheetBaseURI: window.location.href,
        sourceType: 'json',
        sourceText: input,
        sourceBaseURI: window.location.href,
        destination: 'serialized',
        documentPool: docPool,
        textResourcePool: textPool
      };
    }
    else if (inputType === 'HTML') {
      var htmlDoc = new DOMParser().parseFromString(input, 'text/html');
      transformationOptions = {
        stylesheetText: xsltSef,
        stylesheetBaseURI: window.location.href,
        sourceNode: htmlDoc,
        destination: 'serialized',
        documentPool: docPool,
        textResourcePool: textPool
      };
    }
    else if (inputType === 'None') {
      transformationOptions = {
        stylesheetText: xsltSef,
        stylesheetBaseURI: window.location.href,
        destination: 'serialized',
        documentPool: docPool,
        textResourcePool: textPool
      };
    }

    var transformationResult = await SaxonJS.transform(transformationOptions, 'async');
    
    responseData = { ResultType: 'transformation', ResultDocuments: [] };

    if ("principalResult" in transformationResult) {
      responseData.ResultDocuments.push({ uri: 'principal result', content: transformationResult.principalResult, method: 'html' });
    }

    for (let resultDocUri in transformationResult.resultDocuments) {
      if (resultDocUri !== 'output') {
        let suffix = resultDocUri.replace(/.*(\.[a-z]+)/gi, '$1').toLowerCase();
        let method = filetypes[suffix];
        responseData.ResultDocuments.push({ uri: resultDocUri, content: transformationResult.resultDocuments[resultDocUri], method: method ? method : 'html' });
      }
    }

  resultsSelect.length = 0;

  if (responseData.ResultType === 'transformation') {
    responseData.ResultDocuments.forEach((result, index) => {
      resultsSelect.appendChild(new Option(result.uri, result.uri));
      if (index === 0) {
        writeResult(window.frames['current-result-frame'], result.content);
      }
    });

    resultsSelect.onchange = function (evt) {
      var selectedResult = responseData.ResultDocuments[this.selectedIndex];
      setDocument(resultEditor, selectedResult.content, selectedResult.method);

      if (document.getElementById('render-box').checked) {
        writeResult(window.frames['current-result-frame'], responseData.ResultDocuments[this.selectedIndex].content);
      }
    };

    setDocument(resultEditor, responseData.ResultDocuments[0].content, responseData.ResultDocuments[0].method);
  }

  }
  catch (e) {
    resultsSelect.length = 0;
    setDocument(
      resultEditor,
      `Error during transformation:
${e.message}
XSLT line number: ${e.xsltLineNr}
e.stack`,
      'text');
    return;
  }



}
