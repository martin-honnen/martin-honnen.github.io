<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:saxon="http://saxon.sf.net/"
  exclude-result-prefixes="#all"
  expand-text="yes">

  <xsl:output method="xml" indent="yes"/>

  <xsl:template match="/" name="xsl:initial-template">
    <test-result>Produced on {saxon:timestamp()}</test-result>
  </xsl:template>

</xsl:stylesheet>