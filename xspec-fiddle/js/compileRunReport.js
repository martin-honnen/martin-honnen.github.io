function compileRunReport(xspecUrl, xsltUrl, resultsSelect) {

  const compilerFile = 'xspec/compiler/compile-xslt-tests.xsl.saxonee.sef.json';
  var compilerInternalRepresentation = null;

  const reportFile = 'xspec/reporter/format-xspec-report.xsl.saxonee.sef.json';

  var reportInternalRepresentation = null;

  const cssFile = "xspec/reporter/test-report.css";

  var xspecFile = xspecUrl;

  SaxonJS.transform(
    compilerInternalRepresentation === null ? {
      stylesheetLocation: compilerFile,
      sourceLocation: xspecFile
    } : {
        stylesheetInternal :compilerInternalRepresentation,
        sourceLocation: xspecFile
    },
    true
  ).then(result => {
    if (compilerInternalRepresentation === null) {
      compilerInternalRepresentation = result.stylesheetInternal;
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
    SaxonJS.transform(
      reportInternalRepresentation === null ?
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
        stylesheetInternal: reportInternalRepresentation,
        sourceText: xspecReport,
        destination: 'serialized',
        stylesheetParams: {
          'report-css-uri': cssFile
        }
      },
      true
    ).then(result => {
      if (reportInternalRepresentation === null) {
        reportInternalRepresentation = result.stylesheetInternal;
      }
      transformationResult = result.principalResult;
      setDocument(resultEditor, transformationResult, 'html');
      writeResult(window.frames.resultFrame, transformationResult);
    })
    .catch(error => setDocument(resultEditor, error, 'text'));
  })
    .catch (error => setDocument(resultEditor, error, 'text'));


}