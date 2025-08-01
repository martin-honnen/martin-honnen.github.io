const doneTypingInterval = 1000;

var autoValidate = false;

const schxsltVersions = {
  'schxslt-1.10.1' : 'schxslt/schxslt-1.10.1/run-pipeline-for-svrl-and-apply-to-schema.xsl.sef.json',
  'schxslt-1.10' : 'schxslt/schxslt-1.10/run-pipeline-for-svrl-and-apply-to-schema.xsl.sef.json',
  'schxslt2-1.3.5' : 'schxslt/schxslt2-v1.3.5/run-pipeline-for-svrl-and-apply-to-schema.xsl.sef.json',
  'schxslt2-1.4.4' : 'schxslt/schxslt2-1.4.4/run-pipeline-for-svrl-and-apply-to-schema.xsl.sef.json',
  'schxslt2-1.2.2' : 'schxslt/schxslt2-1.2.2/run-pipeline-for-svrl-and-apply-to-schema.xsl.sef.json',
  'schxslt2-1.1' : 'schxslt/schxslt2-1.1/run-pipeline-for-svrl-and-apply-to-schema.xsl.sef.json',
  'schxslt2-1.0' : 'schxslt/schxslt2-1.0/run-pipeline-for-svrl-and-apply-to-schema.xsl.sef.json'
};

function validate() {
  validateWithSchxslt(xmlEditor.session.getValue(), schematronEditor.session.getValue(), resultEditor, document.getElementById('schxsltVersionSelect').value);
}

function runAutoValidate() {
  typingTimeout = autoValidate ? setTimeout(validate, doneTypingInterval) : 0;
}

function validateWithSchxslt(xml, schematron, resultEditor, schxsltVersion) {
  if (typeof schxsltVersion === 'undefined') {
    schxsltVersion = 'schxslt-1.10.1';
  }
  let svrlResult = SaxonJS.transform(
      { 
        stylesheetLocation: schxsltVersions[schxsltVersion],
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
