<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="xs xhtml"
  xpath-default-namespace="http://www.w3.org/1999/xhtml">

<xsl:param name="doc2-url" as="xs:string" select="'test2015021302.xml'"/>
<xsl:param name="doc2" as="document-node()" select="doc($doc2-url)"/>

<xsl:key name="col"
         xpath-default-namespace=""
         match="elemento"
         use="string-join(for $att in (@quadro, @voce) return xs:integer($att), '|')"/>

<xsl:template match="@* | node()">
  <xsl:copy>
    <xsl:apply-templates select="@* , node()"/>
  </xsl:copy>
</xsl:template>

<xsl:template match="tr[key('col', string-join(for $s in tokenize(td[1], '\s+')[normalize-space()] return xs:integer($s), '|'), $doc2)]/td[not(text()[normalize-space()])]">
  <xsl:copy>
    <xsl:apply-templates select="@* | node()"/>
    <xsl:copy-of xpath-default-namespace="" select="key('col', string-join(for $s in tokenize(../xhtml:td[1], '\s+')[normalize-space()] return xs:integer($s), '|'), $doc2)/columna[position() = count(current()/preceding-sibling::xhtml:td[not(text()[normalize-space()])]) + 1]"/>
  </xsl:copy>
</xsl:template>

</xsl:stylesheet>
