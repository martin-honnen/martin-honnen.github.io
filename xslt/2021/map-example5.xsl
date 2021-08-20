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
        <xsl:call-template name="create-view">
          <xsl:with-param name="location" select="."/>
        </xsl:call-template>
      </ixsl:schedule-action>
    </xsl:result-document>
  </xsl:template>

  <xsl:template name="create-view">
    <xsl:param name="location"/>
    <ixsl:set-property
		  name="myView"
		  select="let $view-param := map {
										 'center' : ixsl:window() => ixsl:call('ol.proj.fromLonLat', [[($location/longitude/xs:decimal(.), $location/latitude/xs:decimal(.))]]),
										 'zoom' : 4
									   }
									   => mf:object() => trace(),
                  $center := $view-param => ixsl:get('center') => trace(),
                  $serialized-json := ixsl:window() => ixsl:call('JSON.stringify', [$view-param]) => trace()
              return ixsl:window()
								  => ixsl:get('ol.View')
								  => mf:construct([$view-param])"/>
  </xsl:template>

  <xsl:template match="/">
    <xsl:next-match/>
    <xsl:message>Saxon-JS : {saxon:timestamp()}</xsl:message>
  </xsl:template>

</xsl:stylesheet>