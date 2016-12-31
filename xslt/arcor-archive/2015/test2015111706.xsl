<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet [
  <!ENTITY nbsp "&#160;">
]>
<xsl:stylesheet
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="1.0">
  
<xsl:output method="html" indent="yes" version="5.0"/>

<xsl:template match="root">
  <p style="width: 200px; overflow: auto;">This&nbsp;is&nbsp;a&nbsp;text&nbsp;with&nbsp;lots&nbsp;of&nbsp;words&nbsp;to&nbsp;test&nbsp;non-breaking&nbsp;spaces.</p>
</xsl:template>

</xsl:stylesheet>
  