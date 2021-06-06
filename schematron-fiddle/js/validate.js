const doneTypingInterval = 1000;

var autoValidate = false;

function validate() {
  validateWithSchxslt(xmlEditor.session.getValue(), schematronEditor.session.getValue(), resultEditor);
}

function runAutoValidate() {
  typingTimeout = autoValidate ? setTimeout(validate, doneTypingInterval) : 0;
}

function validateWithSchxslt(xml, schematron, resultEditor) {
  resultEditor.session.setValue(
    SaxonJS.transform(
      { 
        stylesheetLocation: 'schxslt/1.7.2/run-pipeline-for-svrl-and-apply-to-schema.sef.json',
        stylesheetParams: {
          'schema-text': schematron,
          'instance-text': xml
        },
        destination : 'serialized'
      }
    ).principalResult
  );
      window.frames['current-result-frame'].document.open();
      window.frames['current-result-frame'].document.write(SaxonJS.transform(
      { 
        stylesheetLocation: 'xslt/highlight-doc-test1.sef.json',
        sourceText: xml,
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
