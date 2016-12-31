<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:date="http://exslt.org/dates-and-times"
	exclude-result-prefixes="date"
	version="1.0">
	
	<xsl:template match="dates">
		<difference>
			<xsl:value-of select="date:difference(date[1], date[2])"/>
		</difference>
	</xsl:template>
	
</xsl:stylesheet>