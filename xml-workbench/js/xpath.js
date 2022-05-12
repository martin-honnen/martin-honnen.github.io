function xpath(input, xpathCode, inputType, resultsSelect) {

    var transformationResult, responseData;

    fetch(baseURI + 'xpath',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                inputCode: xpathCode,
                inputData: input,
                inputType: inputType == 'XML' ? 0 : inputType == 'JSON' ? 1 : 2
            })
        })
        .then(response => response.json()
            .then(json => {
                if (json.results == null) {
                    resultsSelect.length = 0;
                    setDocument(
                        resultEditor,
                        `Error(s) during XPath evaluation: ${json.messages}`,
                        'text');
                } else {
                    resultsSelect.length = 0;


                    json.results.forEach((result, index) => {
                        resultsSelect.appendChild(new Option(`result ${index}`, result));
                        if (index === 0) {
                            writeResult(window.frames['current-result-frame'], result);
                        }
                    });

                    resultsSelect.onchange = function (evt) {
                        //var selectedResult = responseData.ResultDocuments[this.selectedIndex];
                        setDocument(resultEditor, resultsSelect.value, 'html');

                        if (document.getElementById('render-box').checked) {
                            writeResult(window.frames['current-result-frame'], resultsSelect.value);
                        }
                    };

                    setDocument(resultEditor, json.results[0], 'html');
                }
            }));
}