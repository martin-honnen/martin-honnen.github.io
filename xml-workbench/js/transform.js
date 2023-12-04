function transform(input, xslt, inputType, resultsSelect) {

    var transformationResult, responseData;

    fetch(baseURI + 'xslt',
        {
            method : 'POST',
            headers : { 'Content-Type' : 'application/json' },
            body : JSON.stringify({
                inputCode : xslt,
                inputData: input,
                inputType: inputType == 'XML' ? 0 : inputType == 'JSON' ? 1 : inputType == 'TEXT' ? 2 : 3 })})
        .then(response => response.json()
            .then(json => {
                if (json.results == null) {
                    resultsSelect.length = 0;
                    setDocument(
                        resultEditor,
                        `Error(s) during transformation: ${json.messages}`,
                        'text');
                }
                else {
                    resultsSelect.length = 0;

                    const resultDocuments = json.results;


                    resultDocuments.forEach((result, index) => {
                            resultsSelect.appendChild(new Option(result.url, result.content));
                            if (index === 0) {
                                writeResult(window.frames['current-result-frame'], result.content);
                            }
                        });

                    resultsSelect.onchange = function (evt) {
                        const selectedResult = resultDocuments[this.selectedIndex];
                        setDocument(resultEditor, selectedResult.content, selectedResult.method);

                        if (document.getElementById('render-box').checked) {
                            writeResult(window.frames['current-result-frame'], selectedResult.content);
                        }
                    };

                    setDocument(resultEditor, resultDocuments[0].content, resultDocuments[0].method);
                }
            }))


/*        responseData = { ResultType: 'transformation', ResultDocuments: [] };

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
        setDocument(
            resultEditor,
            `Error during transformation:
${e.message}
XSLT line number: ${e.xsltLineNr}
e.stack`,
            'text');
        return;
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
    }*/


}
