<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
  xmlns:saxon="http://saxon.sf.net/"
  exclude-result-prefixes="#all"
  expand-text="yes">

  <xsl:template match="/" name="xsl:initial-template">
    <h1>ixsl:onscroll test</h1>
    <section>
      <h2>no preventDefault</h2>
      <div id="div1" style="height: 250px; overflow: auto;">
        <xsl:for-each select="1 to 20">
          <p>Paragraph {.}.</p>
        </xsl:for-each>
      </div>
    </section>
    <section>
      <h2>preventDefault</h2>
      <div id="div2" style="height: 250px; overflow: auto;">
        <xsl:for-each select="1 to 20">
          <p>Paragraph {.}.</p>
        </xsl:for-each>
      </div>
    </section>
    <xsl:comment>Run with {system-property('xsl:product-name')} {system-property('xsl:product-version')} {system-property('Q{http://saxon.sf.net/}platform')} at {current-dateTime()}</xsl:comment>
  </xsl:template>
  
  <xsl:template match="id('div1')" mode="ixsl:onwheel">
    <xsl:message select="saxon:timestamp() || ': ' || ixsl:event()?type"/>
  </xsl:template>
  
  <xsl:template match="id('div2')" mode="ixsl:onwheel">
    <xsl:message select="saxon:timestamp() || ': ' || ixsl:event()?type, ixsl:event() => ixsl:call('preventDefault', [])"/>
  </xsl:template>
  
</xsl:stylesheet>
