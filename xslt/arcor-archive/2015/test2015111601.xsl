<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html"
            encoding="UTF-8"
            indent="no"/>

<xsl:template match="/">
<html>
<head>

<script type="text/javascript" defer="defer">
<xsl:text>
<![CDATA[
function test(){
  window.alert('Test');
}
 ]]>
 </xsl:text>
</script>


</head>

<body>
  <button onclick="window.alert('Test')">This works</button>      
  <br/>
  <button onclick="test()">This does not work</button>      
</body>
</html>
</xsl:template>
</xsl:stylesheet>