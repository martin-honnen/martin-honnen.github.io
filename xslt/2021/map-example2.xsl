<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" 
	xmlns:mf="http://example.com/mf"
    xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT" 
    exclude-result-prefixes="#all"
    expand-text="yes"
    version="3.0">
    
    <xsl:import href="construct-function.xsl"/>
    
    <xsl:template name="location">
        <xsl:result-document href="#result">
            <div id="map" class="map"></div>
            <ixsl:set-property
              name="myMap"
              select="ixsl:window()
                      => ixsl:get('ol.Map')
                      => mf:construct([
                           map {
                             'target' : 'map',
                             'layers' : [
                               ixsl:window()
                               => ixsl:get('ol.Layer.Title')
                               => mf:construct([
                                    map {
                                      'source' : ixsl:window() => ixsl:get('ol.Source.OSM') => mf:construct([])
                                    }
                                  ])
                             ],
                             'view' : ixsl:window()
                                      => ixsl:get('ol.View')
                                      => mf:construct([
                                           map {
                                             'center' : ixsl:window() => ixsl:get('ol.proj') => ixsl:call('fromLonLat', [longitude/xs:decimal(.), latitude/xs:decimal(.)]),
                                             'zoom' : 4
                                           }
                                         ])
                           }
                         ])"/>
        </xsl:result-document>
    </xsl:template>
    
</xsl:stylesheet>
