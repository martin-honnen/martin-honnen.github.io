<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:saxon="http://saxon.sf.net/"
	xmlns:mf="http://example.com/mf"
    xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
    exclude-result-prefixes="#all"
    expand-text="yes"
    version="3.0">

  <xsl:import href="construct-function.xsl"/>

  <xsl:template match="location">
    <xsl:result-document href="#result">
      <h2>Map {longitude}, {latitude}</h2>
      <div id="map" class="map"></div>
      <ixsl:schedule-action wait="1">
        <xsl:call-template name="create-map">
          <xsl:with-param name="location" select="."/>
        </xsl:call-template>
      </ixsl:schedule-action>
    </xsl:result-document>
  </xsl:template>

  <xsl:template name="create-map">
    <xsl:param name="location"/>
    <ixsl:set-property
		  name="myMap"
		  select="ixsl:window()
				  => ixsl:get('ol.Map')
				  => mf:construct([
					   map {
						 'target' : 'map',
						 'layers' : [
						   ixsl:window()
						   => ixsl:get('ol.layer.Tile')
						   => mf:construct([
								map {
								  'source' : ixsl:window() => ixsl:get('ol.source.OSM') => mf:construct([])
								} 
								=> mf:object()
							  ])
						 ],
						 'view' : ixsl:window()
								  => ixsl:get('ol.View')
								  => mf:construct([
									   map {
										 'center' : ixsl:window() => ixsl:call('ol.proj.fromLonLat', [ixsl:eval('[[' ||  $location/longitude/xs:decimal(.) || ', ' || $location/latitude/xs:decimal(.) || ']]')]),
										 'zoom' : 4
									   }
									   => mf:object()
									 ])
					   }
					   => mf:object()
					 ])"/>
  </xsl:template>

  <xsl:template match="/">
    <xsl:next-match/>
    <xsl:message>Saxon-JS : {saxon:timestamp()}</xsl:message>
  </xsl:template>

</xsl:stylesheet>