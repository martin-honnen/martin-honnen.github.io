    function runXslt() {
      const xslt = `<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="3.0" xpath-default-namespace="http://www.w3.org/1999/xhtml">
        <xsl:output method="html" html-version="5.0"/>
        <xsl:mode on-no-match="shallow-copy"/>
        <xsl:template match="meta[@charset]"/>
        <xsl:template match="style">
          <xsl:copy>
            <xsl:value-of select="if (contains(., 'red')) then replace(., 'red', 'green') else replace(., 'green', 'red')"/>
          </xsl:copy>
       </xsl:template>
       </xsl:stylesheet>`;
       
       var resultFragment = SaxonJS.XPath.evaluate(`transform(map {
         'source-node' : .,
         'stylesheet-text' : $xslt
         })?output`,
         document,
         { params : { xslt : xslt } }
      );
         
      console.log(resultFragment);
      
      document.replaceChildren();
      document.appendChild(resultFragment);
    }
