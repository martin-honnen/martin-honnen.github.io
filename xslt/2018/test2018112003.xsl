<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="1.0">
  
<xsl:import href="test2018112004.xsl"/>
  
<xsl:output method="html" indent="yes"/>

<xsl:template match="/">
  <section>
    <h2>XSLT <code>xsl:import</code> test</h2>
    <xsl:apply-templates/>
  </section>
</xsl:template>

</xsl:stylesheet>