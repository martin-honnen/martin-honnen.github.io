<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">		
		<html>
			<head>
				<title>Food list</title>
			</head>
			<body>				
				<xsl:for-each select="doc/breakfast_menu/food">
					<p>Food: <xsl:value-of select="name"/></p>
				</xsl:for-each>				
			</body>
		</html>	
	</xsl:template>
</xsl:stylesheet>