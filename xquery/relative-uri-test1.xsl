<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:xs="http://www.w3.org/2001/XMLSchema"
	xmlns:err="http://www.w3.org/2005/xqt-errors"
	exclude-result-prefixes="#all"
	expand-text="yes"
	version="3.0">

  <xsl:output method="xml" indent="yes"/>

  <xsl:template match="/" name="xsl:initial-template">
    <results>
      <doc-test>
        <xsl:try select="doc('sample1.xml')">
          <xsl:catch errors="*">{$err:description}</xsl:catch>
        </xsl:try>
      </doc-test>
      <unparsed-text-test>
        <xsl:try select="unparsed-text('sample1.txt')">
          <xsl:catch errors="*">{$err:description}</xsl:catch>
        </xsl:try>
      </unparsed-text-test>
    </results>
  </xsl:template>
  
</xsl:stylesheet>
