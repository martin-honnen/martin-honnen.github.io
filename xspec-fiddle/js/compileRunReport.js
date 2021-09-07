function compileRunReport(xspecUrl, xsltUrl, resultsSelect) {

  const compilerFile = 'xspec/compiler/compile-xslt-tests.xsl.saxonee.sef.json';

  const reportFile = 'xspec/reporter/format-xspec-report.xsl.saxonee.sef.json';

  var xspecFile = xspecUrl;

  SaxonJS.transform(
    {
      stylesheetLocation: compilerFile,
      sourceLocation: xspecFile
    },
    true
  ).then(result => {
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
      {
        stylesheetLocation: reportFile,
        sourceText: xspecReport,
        destination: 'serialized'
      },
      true

    ).then(result => {
      transformationResult = result.principalResult;
      setDocument(resultEditor, transformationResult, 'html');
      writeResult(window.frames.resultFrame, transformationResult);
    })
    .catch(error => setDocument(resultEditor, error, 'text'));
  })
    .catch (error => setDocument(resultEditor, error, 'text'));


}