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
        deliveryFormat : 'serialized'
      }
    ).principalResult
  )
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