<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
  exclude-result-prefixes="#all"
  expand-text="yes">

  <xsl:key name="cat" match="category" use="@name"/>

  <xsl:output method="html" indent="yes" html-version="5"/>

  <xsl:template match="/" name="xsl:initial-template">
    <xsl:apply-templates select="doc('input1.xml')/node()"/>
  </xsl:template>

  <xsl:template match="items">
   <ul id="item-list">
     <xsl:apply-templates/>
   </ul>
   <input type="button" value="load" id="add-item"/>
  </xsl:template>

  <xsl:template match="item">
    <li>
     <xsl:apply-templates/>
    </li>
  </xsl:template>

  <xsl:template match="categories">
    <xsl:value-of select="name()"/>
    <ul>
      <xsl:apply-templates/>
    </ul>
  </xsl:template>

  <xsl:template match="category"><li>{.} : {key('cat', ., doc('input2.xml'))}</li></xsl:template>

  <xsl:template match="input[@type = 'button' and @id = 'add-item']" mode="ixsl:click">
    <xsl:result-document href="#item-list">
      <xsl:apply-templates select="doc('input3.xml')//item"/>
    </xsl:result-document>
  </xsl:template>

</xsl:stylesheet>