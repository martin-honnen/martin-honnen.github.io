<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="1.0">

  <xsl:output method="html" indent="yes" version="5" doctype-system="about:legacy-doctype"/>

  <xsl:template match="para">
      <p>
          <xsl:apply-templates/>
          <select>
            <xsl:apply-templates select="document('test2020062802.xml')/Options/Option"/>
      </p>
  </xsl:template>
    
  <xsl:template match="Option">
    <option value="{.}">
      <xsl:value-of select="."/>
    </option>
  </xsl:template>

</xsl:stylesheet>
