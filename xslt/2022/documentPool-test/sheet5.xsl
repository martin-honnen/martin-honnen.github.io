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

  <xsl:param name="doc-uri" as="xs:string" required="yes"/>

  <xsl:output method="html" indent="yes" html-version="5"/>

  <xsl:template match="/" name="xsl:initial-template">
    <h2>SaxonJS created content: {saxon:timestamp()}</h2>
    <code>{doc($doc-uri) => serialize(map { 'method' : 'xml'})}</code>
  </xsl:template>

</xsl:stylesheet>