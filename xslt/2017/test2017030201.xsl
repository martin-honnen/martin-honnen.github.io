<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:xs="http://www.w3.org/2001/XMLSchema"
	xmlns:math="http://www.w3.org/2005/xpath-functions/math"
	exclude-result-prefixes="xs math"
	version="3.0">
	
	<xsl:template name="main">
		<xsl:result-document href="#svg1">
			<section>
				<h2>SVG test</h2>
				<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
					<rect x="10" y="10" width="50" height="50" fill="#FF0000"/>
				</svg>
			</section>
		</xsl:result-document>
	</xsl:template>
	
</xsl:stylesheet>