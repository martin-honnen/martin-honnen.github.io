<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:svg="http://www.w3.org/2000/svg"
    xmlns="http://www.w3.org/2000/svg"
    exclude-result-prefixes="svg"
    version="1.0">
  
  <xsl:template match="svg:*[@id[starts-with(., 'Item')]]">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()"/>
      <xsl:variable name="id" select="substring-before(@id, '-')"/>
      <text x="" y="" id="{$id}-text">
        <tspan id="{$id}-tspan" x="" y="">
          <xsl:value-of select="$id"/>
        </tspan>
      </text>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="@* | node()">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()"/>
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="processing-instruction('xml-stylesheet')"/>

</xsl:stylesheet>
