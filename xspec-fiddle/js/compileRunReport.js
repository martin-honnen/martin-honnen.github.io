const compilerFile = 'xspec/compiler/compile-xslt-tests.xsl.saxonee.sef.json';

const compilerBaseUrl = '//xspec-fiddle/xspec/compiler/compile-xslt-tests.xsl.saxonee.sef.json';

const reportFile = 'xspec/reporter/format-xspec-report.xsl.saxonee.sef.json';

const internalRepresentations = {
  compilerInternalRepresentation: undefined,
  reportInternalRepresentation: undefined
}

const cssFile = "xspec/reporter/test-report.css";

function compileRunReport(xspecCode, xsltCode, resultsSelect) {

  const xsltBlob = new Blob([xsltCode], { 'type': 'application/xml' });

  const xsltBlobURL = URL.createObjectURL(xsltBlob);
  
  const xspecDoc = SaxonJS.XPath.evaluate(`parse-xml($xspecCode)`, [], { params: { xspecCode: xspecCode } });

  xspecDoc.documentElement.setAttribute('stylesheet', xsltBlobURL);

  setDocument(resultEditor, 'Hold on:compiling XSpec...', 'text');

  SaxonJS.transform(
    internalRepresentations.compilerInternalRepresentation === undefined ? {
      stylesheetBaseURI: compilerBaseUrl,
      stylesheetLocation: compilerFile,
      sourceNode: xspecDoc,
      sourceBaseURI: 'urn:from-text-editor'
    } : {
        stylesheetBaseURI: compilerBaseUrl,
        stylesheetInternal: internalRepresentations.compilerInternalRepresentation,
        sourceNode: xspecDoc,
        sourceBaseURI: 'urn:from-text-editor'
    },
    true
  ).then(result => {
    setDocument(resultEditor, 'Hold on:running tests...', 'text');
    if (result.stylesheetInternal !== undefined) {
      internalRepresentations.compilerInternalRepresentation = result.stylesheetInternal;
    }
    const xspecReport = SaxonJS.XPath.evaluate(`transform(map {
		'base-output-uri' : 'file:///main-report.xml',
		'stylesheet-node' : $compiled-xspec,
		'initial-template' : QName('http://www.jenitennison.com/xslt/xspec', 'main'),
        'delivery-format' : 'serialized'		
		})?('file:///main-report.xml')`,
      [],
      {
        params: { 'compiled-xspec': result.principalResult }
      }
    );
    //console.log(xspecReport);

    setDocument(resultEditor, 'Hold on:producing report...', 'text');

    SaxonJS.transform(
      internalRepresentations.reportInternalRepresentation === undefined ?
        {
          stylesheetLocation: reportFile,
          sourceText: xspecReport,
          destination: 'serialized',
          stylesheetParams: {
            'report-css-uri': cssFile
          }
        }
        :
        {
          stylesheetInternal: internalRepresentations.reportInternalRepresentation,
          sourceText: xspecReport,
          destination: 'serialized',
          stylesheetParams: {
            'report-css-uri': cssFile
          }
      },
      true
    ).then(result => {
      if (result.stylesheetInternal !== undefined) {
        internalRepresentations.reportInternalRepresentation = result.stylesheetInternal;
      }
      transformationResult = result.principalResult;
      setDocument(resultEditor, transformationResult, 'html');
      writeResult(window.frames.resultFrame, transformationResult);
    })
    .catch(error => setDocument(resultEditor, error, 'text'));
  })
    .catch (error => setDocument(resultEditor, error, 'text'));


}