<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" indent="yes"/>

<xsl:template match="/">
  <div>
    <script>
    function foo() {
      log('foo called.');
    }
    </script>
    <input type="button" value="test function foo" onclick="foo();"/>
  </div>
</xsl:template>

</xsl:stylesheet>
