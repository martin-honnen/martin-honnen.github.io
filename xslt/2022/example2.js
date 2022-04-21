document.addEventListener('DOMContentLoaded', () => {
  const xslt = `<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform version="3.0" xmlns="http://www.w3.org/1999/xhtml" expand-text="yes>
    <xsl:template match="/">
      <html lang="en>
        <head>
          <title>Test</title>
        </head>
        <body>
          <h1>Test</h1>
          <div><code>{serialize(., map { 'method': 'xml', 'indent' : true() })}</code></div>
        </body>
      </html>
    </xsl:template>
  </xsl:stylesheet>`;
  
  const result = SaxonJS.XPath.evaluate(`
    transform(
      map {
        'source-node' : .,
        'stylesheet-text' : $xslt
      }
    )?output
  `, document, { params : { xslt : xslt } });
  
  document.replaceChildren();
  document.appendChild(result);
});
