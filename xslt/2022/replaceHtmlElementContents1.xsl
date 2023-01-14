<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  exclude-result-prefixes="#all"
  xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
  xmlns:saxon="http://saxon.sf.net/"
  expand-text="yes">

  <xsl:param name="counter" as="xs:integer" select="1"/>

  <xsl:template match="html">
    <xsl:result-document href="?." method="ixsl:replace-content">
      <xsl:apply-templates/>
    </xsl:result-document>
  </xsl:template>

  <xsl:template match="title/text()">
    <xsl:value-of select="replace(., '[0-9]+', string((//input[@id = 'button1'] => ixsl:get('dataset'))?counter + 1))"/>
  </xsl:template>
  
  <xsl:template match="input[@type = 'button']/@value">
    <xsl:attribute name="{name()}" select="'test ' || (.. => ixsl:get('dataset'))?counter + 1"/>
  </xsl:template>

  <xsl:template match="input[@type = 'button']/@data-counter">
    <xsl:attribute name="{name()}" select=". + 1"/>
  </xsl:template>

  <xsl:output method="html" html-version="5"/>

  <xsl:mode on-no-match="shallow-copy"/>

  <xsl:template match="input[@type = 'button' and @id = 'button1']" mode="ixsl:onclick">
     <xsl:apply-templates select="/html"/>
  </xsl:template>

  <xsl:template match="/" name="xsl:initial-template">
    <h1>Test</h1>
    <p>Run with {system-property('xsl:product-name')} {system-property('xsl:product-version')} {system-property('Q{http://saxon.sf.net/}platform')} at {saxon:timestamp()}.</p>
    <input type="button" id="button1" value="test {$counter}" data-counter="{$counter}"/>
  </xsl:template>

</xsl:stylesheet>
