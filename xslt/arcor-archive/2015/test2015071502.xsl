<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

<xsl:template match="/">
  <html>
    <head>
      <title>Test</title>
      <script>
      function outputUrl() {
      var currentScripts = document.getElementsByTagName('script');
        var lastScript = currentScripts[currentScripts.length - 1];
        var fileUrl = window.location.href;
        var steps = fileUrl.split('/');
        var fileName = steps[steps.length - 1];
        lastScript.parentNode.replaceChild(document.createTextNode(fileName), lastScript);
      }
      </script>
    </head>
    <body>
      <h1>Test</h1>
      <section>
        <h2>File : <script>outputUrl();</script></h2>
      </section>
      <xsl:apply-templates/>
    </body>
  </html>
</xsl:template>

<xsl:template match="footer">
  <section>
    <h2>Footer of file : <script>outputUrl();</script></h2>
  </section>
</xsl:template>

</xsl:stylesheet>
