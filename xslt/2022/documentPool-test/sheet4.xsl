<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:js="http://saxonica.com/ns/globalJS"
  xmlns:saxon="http://saxon.sf.net/"
  xmlns:svg="http://www.w3.org/2000/svg"
  exclude-result-prefixes="#all"
  expand-text="yes">

  <xsl:output method="html" indent="yes" html-version="5"/>

  <xsl:template match="/" name="xsl:initial-template">
    <section>
      <h4>SaxonJS created content: {saxon:timestamp()}</h4>
      <section>
        <h5>content</h5>
        <xsl:apply-templates/>
      </section>
    </section>
  </xsl:template>

  <xsl:param name="colors" as="xs:string*" select="'blue', 'green', 'yellow'"/>
  
  <xsl:template match="root[data]">
    <svg id="data1" width="300" height="300" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      <xsl:iterate select="data">
        <xsl:param name="max" select="max(data/value)"/>
        <xsl:param name="dy" select="50"/>
        <rect x="10" y="{$dy}" fill="{let $pos := position() return $colors[$pos]}" height="20" width="{value div $max * 100}%" data-value="{value}">
          <title>{data}: {value div $max * 100}</title>       
        </rect>
        <xsl:next-iteration>
          <xsl:with-param name="dy" select="$dy + 20"/>
        </xsl:next-iteration>
      </xsl:iterate>
    </svg>
  </xsl:template>

  <xsl:template match="svg:svg[@id = 'data1']/svg:rect" mode="ixsl:onmouseover">
    <xsl:sequence select="saxon:timestamp(), . => ixsl:get('dataset') => ixsl:get('value') => trace()"/>
  </xsl:template> 

</xsl:stylesheet>