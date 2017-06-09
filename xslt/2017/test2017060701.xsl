<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="1.0">
	
	<xsl:output method="html" indent="yes" version="5" doctype-system="about:legacy-doctype"/>
	
	<xsl:template match="/">
		<html>
			<head>
				<title>Test</title>
				<script>
					function runXslt(xmlUri, xsltUri, targetElement) {
					  var xmlDoc = new ActiveXObject('Msxml2.DOMDocument.6.0');
					  xmlDoc.async = false;
					  xmlDoc.resolveExternals = true;
					  xmlDoc.validateOnParse = false;
					  xmlDoc.setProperty('ProhibitDTD', false);
					  xmlDoc.load(xmlUri);
					  
					  var xsltDoc = new ActiveXObject('Msxml2.DOMDocument.6.0');
					  xsltDoc.async = false;
					  xsltDoc.load(xsltUri);
					  
					  targetElement.insertAdjacentHTML('beforeEnd', xmlDoc.documentElement.transformNode(xsltDoc));
					}
				</script>
				<script>
					document.addEventListener(
					  'DOMContentLoaded',
					  function() {
					    runXslt('test201706070101.xml', 'test2017060701.xsl', document.body);
					  },
					  false
					);
				</script>
			</head>
			<body>
				<h1>Test</h1>
			</body>
		</html>
	</xsl:template>
	
	<xsl:template match="myRoot">
		<section>
			<h2>Content</h2>
			<xsl:apply-templates/>
		</section>	
	</xsl:template>
	
	<xsl:template match="block">
		<ul>
			<xsl:apply-templates/>
		</ul>
	</xsl:template>
	
	<xsl:template match="block/*">
		<li>
			<xsl:apply-templates/>
		</li>
	</xsl:template>
	
</xsl:stylesheet>