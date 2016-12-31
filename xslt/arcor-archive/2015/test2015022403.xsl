<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html"
            indent="yes"
            version="5.0"
            doctype-system="about:legacy-compat"/>

<xsl:template match="/">
<html>
<head>
<title>CSS hover test case</title>
<style type="text/css">
.box {
    background-color: red;
    width: 100px;
    height: 100px;
}
.box:hover {
    background-color: green;
}
</style>
</head>
  <body>
    <h1>Hover over the red box</h1>
    <div class="box"></div>
  </body>
</html>
</xsl:template>

</xsl:stylesheet>
