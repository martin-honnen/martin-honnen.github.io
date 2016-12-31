<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" indent="yes"/>

<xsl:template match="/">
  <script src="test2015111702.js"></script>
  <input type="button" value="click to test"
    onclick="log(foo());"/>
</xsl:template>

</xsl:stylesheet>