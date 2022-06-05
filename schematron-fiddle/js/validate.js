const doneTypingInterval = 1000;

var autoValidate = false;

function validate() {
  validateWithSchxslt(xmlEditor.session.getValue(), schematronEditor.session.getValue(), resultEditor);
}

function runAutoValidate() {
  typingTimeout = autoValidate ? setTimeout(validate, doneTypingInterval) : 0;
}

function validateWithSchxslt(xml, schematron, resultEditor) {
  let svrlResult = SaxonJS.transform(
      { 
        stylesheetLocation: 'schxslt/1.9.0/run-pipeline-for-svrl-and-apply-to-schema.sef.json',
        stylesheetParams: {
          'schema-text': schematron,
          'instance-text': xml
        },
        destination : 'document'
      }
    ).principalResult;
  
  resultEditor.session.setValue(SaxonJS.serialize(svrlResult, { method : 'xml', indent : true }));
  
      window.frames['current-result-frame'].document.open();
      window.frames['current-result-frame'].document.write(SaxonJS.transform(
      { 
        stylesheetLocation: 'xslt/highlight-doc-test1.sef.json',
        sourceText: xml,
        stylesheetParams : {
          'svrl' : svrlResult
        },
        destination : 'serialized'
      }
    ).principalResult);
      window.frames['current-result-frame'].document.close();
}

function displayError(errorMessage, resultsSelect) {
  displayResult(
    {
      resultType: 'error',
      errorMessage: errorMessage
    },
    resultsSelect
  );
}
