<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">

  <xsl:output method="html" indent="yes" version="5" doctype-system="about:legacy-doctype"/>

  <xsl:key name="table-group"
    match="*[* and not(*/*)]"
    use="concat(generate-id(..), '|', local-name())"/>

  <xsl:template match="*[*]">
    <div>
      <h4><xsl:value-of select="local-name()"/></h4>
      <table>
          <thead>
              <tr>
                  <xsl:apply-templates select="*[not(*)]" mode="header"/>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <xsl:apply-templates select="*[not(*)]"/>
              </tr>
          </tbody>
      </table>
    </div>
    <xsl:for-each select="*">
      <xsl:apply-templates select=".[*/*]"/>
      <xsl:apply-templates
        select=".[* and not(*/*)][generate-id() = generate-id(key('table-group', concat(generate-id(..), '|', local-name()))[1])]" mode="merge-groups"/>
    </xsl:for-each>
  </xsl:template>

  <xsl:template match="*[not(*)]" mode="header">
      <th>
          <xsl:value-of select="local-name()"/>
      </th>
  </xsl:template>

  <xsl:template match="*[not(*)]">
      <td>
          <xsl:value-of select="."/>
      </td>
  </xsl:template>

  <xsl:template match="*[*]" mode="merge-groups">
    <div>
      <h4><xsl:value-of select="local-name()"/></h4>
      <table>
          <thead>
              <tr>
                  <xsl:apply-templates select="*[not(*)]" mode="header"/>
              </tr>
          </thead>
          <tbody>
              <xsl:apply-templates select="key('table-group', concat(generate-id(..), '|', local-name()))" mode="row"/>
          </tbody>
      </table>
    </div>
  </xsl:template>

  <xsl:template match="*" mode="row">
      <tr>
          <xsl:apply-templates select="*"/>
      </tr>
  </xsl:template>

  <xsl:template match="/">
    <html>
      <head>
        <link rel="stylesheet" href="style.css" type="text/css" />
        <title>Diagnostic Report</title>
      </head>
      <body>
        <xsl:apply-templates/>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
