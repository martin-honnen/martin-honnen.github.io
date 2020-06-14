function transform(input, xslt, inputType, resultsSelect) {

    var transformationResult;

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


    const responseData = { ResultType: 'transformation', ResultDocuments: [] };

    for (let resultDocUri in transformationResult) {
        responseData.ResultDocuments.push({ uri: resultDocUri, content: transformationResult[resultDocUri], method: 'html' });
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
    else {
        setDocument(resultEditor, responseData.ErrorMessage, 'text');
    }

}