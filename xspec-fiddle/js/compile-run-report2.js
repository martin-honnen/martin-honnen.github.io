const SaxonJS = require('saxon-js');

const compilerFile = 'src\\compiler\\compile-xslt-tests.xsl.saxonee.sef.json';

const reportFile = 'src\\reporter\\format-xspec-report.xsl.saxonee.sef.json';

var xspecFile = 'tutorial\\escape-for-regex.xspec';

SaxonJS.transform(
	{
		stylesheetFileName : compilerFile,
		sourceFileName: xspecFile
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
			params : { 'compiled-xspec' : result.principalResult }
		}
	);
	console.log(xspecReport);
	SaxonJS.transform(
		{
			stylesheetFileName: reportFile,
			sourceText: xspecReport,
			destination: 'serialized'
		},
		true
	
	).then(result => console.log('\nreport:\n' + result.principalResult))
	 .catch(error => console.log(error));
})
.catch(error => console.log(error));

