<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="1.0">

  <xsl:include href="module1.xsl"/>

  <xsl:template match="/">
      <test>
	    <content>test</content>
		<xsl:call-template name="foo"/>
	  </test>
  </xsl:template>
  
</xsl:stylesheet>
