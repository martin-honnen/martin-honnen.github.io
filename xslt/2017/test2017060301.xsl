<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:gml="http://www.opengis.net/gml"
	xmlns:ogr="http://ogr.maptools.org/"
	xmlns:svg="http://www.w3.org/2000/svg"
	exclude-result-prefixes="gml ogr">
	
	<xsl:param name="svg-uri" select="'test2017060301.svg'"/>
	<xsl:param name="svg-doc" select="document($svg-uri)"/>
	
	<xsl:param name="hover-color" select="'#CCC'"/>
	
	<xsl:param name="svg-width" select="800"/>
	<xsl:param name="svg-height" select="600"/>
	
	<xsl:param name="id-prefix" select="'path-'"/>
	
	<xsl:output method="html" version="5.0" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat"/>
	
	<xsl:template match="/">
		<html>
			<head>
				<title>Example</title>
				<script>
					function hover(element, backgroundColor) {
					  element.style.backgroundColor = backgroundColor;
					}
					function unhover(element) {
					  element.style.backgroundColor = '';
					}
				</script>
			</head>
			
			<body>
				
				<div>
					<header> 
						<h1>Inhabitants</h1>
					</header>
				</div>
				
				<div id="container">
					
					<div id="map_area">
						<div id="innermap_area">
							<xsl:apply-templates select="$svg-doc/*" mode="svg">
								<xsl:with-param name="width" select="$svg-width"/>
								<xsl:with-param name="height" select="$svg-width"/>
							</xsl:apply-templates>
						</div>
					</div>
					
					<div id="info">
						<div id="innerinfo">
							<table>
								<tr bgcolor="#C3CEC6">
									<th>Province name</th>
									<th>Total inhabitants</th>          
									<th>Female</th>
									<th>Male</th>
									
								</tr>
								<xsl:for-each select="//gml:featureMember">
									<tr id="{ogr:rd/@id}">
										<td><xsl:value-of select="ogr:rd/ogr:TOPONIMIA"/></td>
										<td><xsl:value-of select="ogr:rd/ogr:Casos"/></td>                  
										<td><xsl:value-of select="ogr:rd/ogr:Mujeres"/></td>
										<td><xsl:value-of select="ogr:rd/ogr:Hombres"/></td>
									</tr>
								</xsl:for-each>
							</table>
						</div>
					</div>
				</div>  
				<div><footer> 2017 </footer></div>
				
			</body>
		</html>
	</xsl:template>
	
	<xsl:template match="@* | node()" mode="svg">
		<xsl:copy>
			<xsl:apply-templates select="@* | node()" mode="svg"/>
		</xsl:copy>
	</xsl:template>
	
	<xsl:template match="svg:svg" mode="svg">
		<xsl:param name="width" select="$svg-width"/>
		<xsl:param name="height" select="$svg-height"/>
		<xsl:copy>
			<xsl:copy-of select="@*"/>
			<xsl:attribute name="width">
				<xsl:value-of select="$width"/>
			</xsl:attribute>
			<xsl:attribute name="height">
				<xsl:value-of select="$height"/>
			</xsl:attribute>
			<xsl:apply-templates mode="svg"/>
		</xsl:copy>
	</xsl:template>
	
	<xsl:template match="svg:path" mode="svg">
		<xsl:copy>
			<xsl:copy-of select="@*"/>
			<xsl:attribute name="id">
				<xsl:value-of select="concat($id-prefix, @id)"/>
			</xsl:attribute>
			<xsl:attribute name="onmouseover">hover(document.getElementById('<xsl:value-of select="@id"/>'), '<xsl:value-of select="$hover-color"/>');</xsl:attribute>
			<xsl:attribute name="onmouseout">unhover(document.getElementById('<xsl:value-of select="@id"/>'));</xsl:attribute>
		</xsl:copy>
	</xsl:template>
	
	
</xsl:stylesheet>