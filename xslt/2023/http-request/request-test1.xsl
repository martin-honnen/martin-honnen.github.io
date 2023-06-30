<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
  xmlns:foo="http://example.com/foo"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  exclude-result-prefixes="xs ixsl">

  <xsl:template name="xsl:initial-template">
    <section>
      <input type="button" value="request test" id="requestTest1"/>
      <div id="requestResult"></div>
    </section>
  </xsl:template>

  <xsl:template mode="ixsl:onclick" match="input[@id='requestTest1']">
    <xsl:variable name="body">
      <data foo:attr1="value1"/>
    </xsl:variable>
    <xsl:variable name="request" as="map(*)">
      <xsl:map>
        <xsl:map-entry key="'href'" select="'http://localhost:9000/test'"/>
        <xsl:map-entry key="'method'" select="'POST'"/> <!-- or PUT, or PATCH... -->
        <xsl:map-entry key="'media-type'" select="'application/xml'"/>
        <xsl:map-entry key="'headers'" select="map{ 'Content-Type': 'application/xml' }"/>
        <xsl:map-entry key="'body'" select="$body"/>
      </xsl:map>
    </xsl:variable>
    <ixsl:schedule-action http-request="$request">
      <xsl:call-template name="debug"/>
    </ixsl:schedule-action>
  </xsl:template>

  <xsl:template name="debug">
    <xsl:result-document href="#requestResult">
      <h2><xsl:value-of select="?status"/></h2>
      <pre><xsl:value-of select="?body"/></pre>
    </xsl:result-document>
  </xsl:template>

</xsl:stylesheet>