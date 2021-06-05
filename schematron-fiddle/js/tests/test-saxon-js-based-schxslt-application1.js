const SaxonJS = require('saxon-js');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-model href="price.sch" type="application/xml" schematypens="http://purl.oclc.org/dsdl/schematron"?>
<books>
    <book price="93">
        <title>Learning XSLT</title>
        <author>Michael Fitzgerald</author>
        <publisher>O'Reilly; 1 edition (November 18, 2003) </publisher>
        <isbn>0596003277 </isbn>
    </book>
    <book price="3000">
        <title>XSL FO</title>
        <author>Dave Pawson</author>
        <publisher>O'Reilly; 1 edition (August 15, 2002) </publisher>
        <isbn>0596003552 </isbn>
    </book>
    <book price="7">
        <title>XSLT and XPath On The Edge, Unlimited Edition</title>
        <author>Jeni Tennison</author>
        <publisher>Wiley; Unlimited edition (October 1, 2001) </publisher>
        <isbn>0764547763 </isbn>
    </book>
    <book price="97">
        <title>XSLT 2.0 Programmer's Reference (Programmer to Programmer)</title>
        <author>Michael Kay </author>
        <publisher>Wrox; 3 edition (August 9, 2004) </publisher>
        <isbn>0764569090 </isbn>
    </book>
</books>`;

const schematron = `<?xml version="1.0" encoding="UTF-8"?>
<schema xmlns="http://purl.oclc.org/dsdl/schematron" queryBinding="xslt3">
    <pattern>
        <rule context="book">
            <assert test="@price > 10">The book price is too small</assert>
            <report test="@price > 1000">The book price is too big</report>
        </rule>
    </pattern>
</schema>
ei`;

const result = SaxonJS.transform(
  {
    stylesheetLocation: '../schxslt/1.7.2/run-pipeline-for-svrl-and-apply-to-schema.sef.json',
    stylesheetParams: {
      'schema-text': schematron,
      'instance-text': xml
    },
    destination: 'serialized'
  }
).principalResult;

console.log(result);