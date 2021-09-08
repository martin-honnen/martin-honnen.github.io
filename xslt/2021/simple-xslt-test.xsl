<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:saxon="http://saxon.sf.net/"
  xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
  exclude-result-prefixes="#all"
  expand-text="yes">

  <xsl:output method="html" indent="yes" html-version="5"/>

  <xsl:template name="xsl:initial-template">
    <xsl:result-document href="#content">
      <p>Added by Saxon-JS 2: {current-dateTime()} : {saxon:timestamp()}</p>
      <p>Run with {system-property('xsl:product-name')} {system-property('xsl:product-version')} {system-property('Q{http://saxon.sf.net/}platform')}</p>
    </xsl:result-document>
  </xsl:template>

</xsl:stylesheet>
