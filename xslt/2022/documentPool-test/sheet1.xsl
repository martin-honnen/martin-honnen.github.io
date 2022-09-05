<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:js="http://saxonica.com/ns/globalJS"
  xmlns:saxon="http://saxon.sf.net/"
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
   <input type="button" value="run SaxonJS.transform 2" id="run-transform2"/>
   <input type="button" value="run SaxonJS.transform 3" id="run-transform3"/>
   <input type="button" value="run SaxonJS.transform 4" id="run-transform4"/>
   <input type="button" value="run SaxonJS.transform 5" id="run-transform5"/>
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

  <xsl:template match="xhtml:input[@type = 'button' and @id = 'add-item']" mode="ixsl:onclick">
    <xsl:message select="'ixsl:click called', saxon:timestamp()"/>
    <xsl:result-document href="#item-list">
      <xsl:apply-templates select="doc('input3.xml')//item"/>
    </xsl:result-document>
  </xsl:template>

  <xsl:template match="xhtml:input[@type = 'button' and @id = 'run-transform2']" mode="ixsl:onclick">
    <xsl:message select="'ixsl:click called', saxon:timestamp()"/>
    <xsl:sequence select="saxon:timestamp(), serialize(js:testSecondTransformation())"/>
  </xsl:template>


  <xsl:template match="xhtml:input[@type = 'button' and @id = 'run-transform3']" mode="ixsl:onclick">
    <xsl:message select="'ixsl:click called', saxon:timestamp()"/>
    <xsl:sequence select="saxon:timestamp(), serialize(js:testThirdTransformation())"/>
  </xsl:template>

  <xsl:template match="xhtml:input[@type = 'button' and @id = 'run-transform4']" mode="ixsl:onclick">
    <xsl:message select="'ixsl:click called', saxon:timestamp()"/>
    <xsl:sequence select="saxon:timestamp(), serialize(js:testFourthTransformation())"/>
  </xsl:template>

  <xsl:template match="xhtml:input[@type = 'button' and @id = 'run-transform5']" mode="ixsl:onclick">
    <xsl:message select="'ixsl:click called', saxon:timestamp()"/>
    <xsl:sequence select="saxon:timestamp(), serialize(js:testFifthTransformation())"/>
  </xsl:template>
  
</xsl:stylesheet>