<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" expand-text="true">

  <xsl:mode on-no-match="shallow-copy"/>

  <xsl:param name="comment-text" as="xs:string" required="false" select="'This is an added comment'"/>

  <xsl:template match="/*">
    <xsl:copy>
      <xsl:apply-templates select="@*"/>
      <xsl:comment> == {current-dateTime()} - {$comment-text} == </xsl:comment>
      <xsl:apply-templates/>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>
