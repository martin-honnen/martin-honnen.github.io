<xsl:stylesheet
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="1.0">
  
<xsl:output method="html" version="5.0" indent="yes" doctype-system="about:legacy-compat"/>

<xsl:template match="/">
  <html lang="en">
    <head>
      <title>Test</title>
      <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
    </head>
    <body>
      <xsl:call-template name="content"/>
    </body>
  </html>
</xsl:template>

<xsl:template name="content">
    <script type="text/javascript">
       $(document).ready(function() {
           console.log("ko"); 
           var p = document.createElement('p');
           p.textContent = 'Script inserted paragraph.';
           document.getElementsByClassName('panel')[0].appendChild(p);
       });
     </script>
     <div class="panel">
         <div class="panel-heading" style="padding-top: 15px;">
             <div class="jumbotron" style="margin-bottom: 0px;">
                 <h1 class="text-center">Fiche auteur</h1>
             </div>
         </div>
         <div class="panel-body">
          ...
          ...
          </div>
     </div>
</xsl:template>

</xsl:stylesheet>