<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:map="http://www.w3.org/2005/xpath-functions/map"
  exclude-result-prefixes="#all">

  <xsl:output method="json" indent="yes"/>

  <xsl:template match=".">
    <xsl:sequence
      select="let $satellites := ?satellites,
                  $names := $satellites => map:keys()
              return map {
                        'visible' : array { $names[$satellites(.)?visible] },
                        'invisible' : array { $names[not($satellites(.)?visible)] }
                     }"/>
  </xsl:template>

</xsl:stylesheet>
