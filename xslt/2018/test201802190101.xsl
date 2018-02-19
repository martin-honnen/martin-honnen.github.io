<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:xs="http://www.w3.org/2001/XMLSchema"
	xmlns:math="http://www.w3.org/2005/xpath-functions/math"
	xmlns:js="http://saxonica.com/ns/globalJS"
	exclude-result-prefixes="xs math js"
	version="3.0">
	
	<xsl:param name="frag" as="xs:string"><![CDATA[<p>This is a test.</p>
		<ul><li>item 1</li><li>item 2</li></ul>]]></xsl:param>
	
	<xsl:param name="html-frag" as="xs:string"><![CDATA[
		<p id=p1>This is paragraph 1.
		<p align=right>This is paragraph 2.
		<ol>
		  <li>a
		  <li>b
		</ol>
	]]></xsl:param>
	
	<xsl:template match="/" name="xsl:initial-template">
		<xsl:result-document href="#div1">
			<h2>Saxon-JS test</h2>
			<xsl:sequence select="parse-xml-fragment($frag)"/>
			<h3>HTML parser test</h3>
			<xsl:sequence select="js:parseHtml($html-frag)"/>
		</xsl:result-document>
	</xsl:template>
	
</xsl:stylesheet>