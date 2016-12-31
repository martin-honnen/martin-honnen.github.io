<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" indent="yes"/>

<xsl:template match="/">
  <html>
    <head>
      <title>My Bookstore</title>
    </head>
      <body>
        <xsl:apply-templates/> 
      </body>
  </html>
</xsl:template>

<xsl:template match="bookstore">
  <section>
    <h1>My Bookstore</h1>
    <xsl:apply-templates/>
  </section>
</xsl:template>

<xsl:template match="book">
  <section>
  <xsl:apply-templates select="title"/>
  <xsl:apply-templates select="author"/>
  <xsl:apply-templates select="price"/>
  <xsl:apply-templates select="synopsis"/>
  </section>
</xsl:template>

<xsl:template match="title">
  <h2>Book Title: <span style="color:#000000">
  <xsl:value-of select="."/></span></h2>
</xsl:template>

<xsl:template match="author">
  Author: <span style="color:#000000">
  <xsl:value-of select="."/></span>
  <br />
</xsl:template>

<xsl:template match="price">
  Price: <span style="color:#000000;">
  &#163;<xsl:value-of select="."/></span>
  <br />
</xsl:template>

<xsl:template match="synopsis">
  <section>
    <h3>Synopis</h3>
    <div style="color:#38A930;">
    <xsl:call-template name="tokenize">
        <xsl:with-param name="text" select="."/>
    </xsl:call-template>
    </div>
  </section>
</xsl:template>

<xsl:template name="tokenize">
    <xsl:param name="text"/>
    <xsl:param name="delimiter" select="'&#10;'"/>
        <xsl:variable name="token" select="normalize-space(substring-before(concat($text, $delimiter), $delimiter))" />
        <xsl:if test="$token">
            <p>
                <xsl:value-of select="$token"/>
            </p>
        </xsl:if>
        <xsl:if test="contains($text, $delimiter)">
            <!-- recursive call -->
            <xsl:call-template name="tokenize">
                <xsl:with-param name="text" select="substring-after($text, $delimiter)"/>
            </xsl:call-template>
        </xsl:if>
</xsl:template>

</xsl:stylesheet>