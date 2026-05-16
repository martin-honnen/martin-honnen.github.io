<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:f="http://docbook.org/ns/docbook/functions"
                xmlns:db="http://docbook.org/ns/docbook"
                xmlns:m="http://docbook.org/ns/docbook/modes"
                xmlns:xlink='http://www.w3.org/1999/xlink'
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns="http://docbook.org/ns/docbook"
                default-mode="m:oxy-markup"
                exclude-result-prefixes="f db m xlink xs"
                version="3.0">

  <xsl:import href="../environment.xsl"/>

  <xsl:template match="/">
    <xsl:document>
      <xsl:apply-templates/>
    </xsl:document>
  </xsl:template>

  <!-- See https://www.oxygenxml.com/doc/versions/22.0/ug-editor/topics/track-changes-format.html -->

  <xsl:mode name="m:oxy-markup" on-no-match="shallow-copy"/>

  <xsl:template match="*[processing-instruction()
                       [name() = ('oxy_comment_start', 'oxy_insert_start', 'oxy_custom_start')]]">
    <xsl:param name="role" as="xs:string?"/>
    <xsl:param name="annotations" as="xs:string?"/>
    <xsl:copy>
      <xsl:apply-templates select="@*"/>
      <xsl:if test="$role">
        <xsl:attribute name="role" select="$role, @role" separator=" "/>
        <xsl:attribute name="annotations" select="$annotations, @annotations" separator=" "/>
      </xsl:if>
      <xsl:call-template name="group-oxy">
        <xsl:with-param name="nodes" as="node()+" select="node()"/>
      </xsl:call-template>    
    </xsl:copy>
  </xsl:template>
  
  <xsl:template name="group-oxy">
    <xsl:param name="nodes" as="node()+"/>
    <xsl:param name="level" select="1" as="xs:integer"/>
    <!-- We assume start/end PIs that belong together to be siblings -->
    <xsl:variable name="innermost" as="processing-instruction()*" 
      select="$nodes/self::processing-instruction(oxy_comment_start)[following-sibling::processing-instruction()
                                                                        [not(name() = ('oxy_delete', 'oxy_attributes'))][1]
                                                                      /self::processing-instruction(oxy_comment_end)]
              union
              $nodes/self::processing-instruction(oxy_insert_start)[following-sibling::processing-instruction()
                                                                        [not(name() = ('oxy_delete', 'oxy_attributes'))][1]
                                                                     /self::processing-instruction(oxy_insert_end)]
              union
              $nodes/self::processing-instruction(oxy_custom_start)[following-sibling::processing-instruction()
                                                                        [not(name() = ('oxy_delete', 'oxy_attributes'))][1]
                                                                     /self::processing-instruction(oxy_custom_end)]"/>
    <xsl:choose>
      <xsl:when test="exists($innermost)">
        <xsl:variable name="grouped" as="document-node()">
          <xsl:document>
          <xsl:for-each-group select="$nodes" group-starting-with="node()[exists(. intersect $innermost)]">
            <xsl:choose>
              <xsl:when test="exists(
                                  $nodes/self::processing-instruction()
                                          [. >> current()/self::processing-instruction(oxy_comment_start)]
                                          [not(name() = ('oxy_delete', 'oxy_attributes'))]
                                          [1]
                                            /self::processing-instruction(oxy_comment_end)
                                  union
                                  $nodes/self::processing-instruction()
                                          [. >> current()/self::processing-instruction(oxy_insert_start)]
                                          [not(name() = ('oxy_delete', 'oxy_attributes'))]
                                          [1]
                                            /self::processing-instruction(oxy_insert_end)
                                  union
                                  $nodes/self::processing-instruction()
                                          [. >> current()/self::processing-instruction(oxy_custom_start)]
                                          [not(name() = ('oxy_delete', 'oxy_attributes'))]
                                          [1]
                                            /self::processing-instruction(oxy_custom_end)
                              )">
                <xsl:variable name="end" as="processing-instruction()" 
                  select="following-sibling::processing-instruction()[not(name() = ('oxy_delete', 'oxy_attributes'))][1]"/>

                <xsl:choose>
                  <xsl:when test="self::processing-instruction(oxy_insert_start)">
                    <xsl:variable name="insert-content" as="node()*">
                      <xsl:sequence select="current-group()[position() gt 1][. &lt;&lt; $end]"/>
                    </xsl:variable>
                    <xsl:variable name="attr" select="f:pi-attributes(.)"/>
                    <phrase role="oxy_insert">
                      <xsl:for-each select="$attr/@*">
                        <xsl:attribute name="oxy:{local-name(.)}"
                                       namespace="http://docbook.org/ns/docbook/oxygen"
                                       select="."/>
                      </xsl:for-each>
                      <xsl:sequence select="$insert-content ! string(.)"/>
                    </phrase>
                  </xsl:when>
                  <xsl:when test="self::processing-instruction(oxy_custom_start)">
                    <xsl:variable name="insert-content" as="node()*">
                      <xsl:sequence select="current-group()[position() gt 1][. &lt;&lt; $end]"/>
                    </xsl:variable>
                    <xsl:variable name="attr" select="f:pi-attributes(.)"/>
                    <phrase role="oxy_custom">
                      <xsl:for-each select="$attr/@*">
                        <xsl:attribute name="oxy:{local-name(.)}"
                                       namespace="http://docbook.org/ns/docbook/oxygen"
                                       select="."/>
                      </xsl:for-each>
                      <xsl:sequence select="$insert-content ! string(.)"/>
                    </phrase>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:variable name="attr" select="f:pi-attributes(.)"/>
                    <!-- For the purpose of the test suite, the ids need to be consistent. -->
                    <phrase annotations="_oxy_{count(preceding::processing-instruction())}"/>
                    <annotation role="oxy_comment">
                      <xsl:attribute name="xml:id"
                                     select="'_oxy_' || count(preceding::processing-instruction())"/>
                      <xsl:for-each select="$attr/@* except $attr/@comment">
                        <xsl:attribute name="oxy:{local-name(.)}"
                                       namespace="http://docbook.org/ns/docbook/oxygen"
                                       select="."/>
                      </xsl:for-each>
                      <xsl:try>
                        <xsl:sequence select="parse-xml('&lt;para xmlns=''http://docbook.org/ns/docbook''&gt;'
                                                        || $attr/@comment || '&lt;/para&gt;')"/>
                        <xsl:catch>
                          <!-- Not well formed XML? Bah, humbug. -->
                          <para>
                            <xsl:value-of select="$attr/@comment"/>
                          </para>
                        </xsl:catch>
                      </xsl:try>
                    </annotation>
                  </xsl:otherwise>
                </xsl:choose>
                <xsl:apply-templates select="current-group()[. >> $end]"/>
              </xsl:when>
              <xsl:otherwise>
                <xsl:apply-templates select="current-group()"/>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:for-each-group>
          </xsl:document>
        </xsl:variable>
        <xsl:choose>
          <xsl:when test="exists($grouped/processing-instruction()[name() = ('oxy_comment_start', 'oxy_insert_start', 'oxy_custom_start')])">
            <xsl:call-template name="group-oxy">
              <xsl:with-param name="nodes" select="$grouped/node()"/>
              <xsl:with-param name="level" select="$level + 1"></xsl:with-param>
            </xsl:call-template>
          </xsl:when>
          <xsl:otherwise>
            <xsl:sequence select="$grouped/node()"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:otherwise>
        <xsl:sequence select="$nodes"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="text()">
    <xsl:param name="role" as="xs:string?"/>
    <xsl:param name="annotations" as="xs:string?"/>
    <xsl:choose>
      <xsl:when test="$role">
        <phrase role="{$role}" annotations="{$annotations}">
          <xsl:sequence select="."/>
        </phrase>
      </xsl:when>
      <xsl:otherwise>
        <xsl:next-match/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  
  <xsl:template match="db:tgroup/text()">
    <!-- This can only be all-whitespace text, but a user (or oXygen) managed to add insertion PIs.
         There may be more contexts where phrase generation isn’t wanted. -->
    <xsl:copy/>
  </xsl:template>
  
  <xsl:template match="*">
    <xsl:param name="role" as="xs:string?"/>
    <xsl:param name="annotations" as="xs:string?"/>
    <xsl:choose>
      <xsl:when test="$role">
        <xsl:copy>
          <xsl:apply-templates select="@*"/>
          <xsl:attribute name="role" select="$role, @role" separator=" "/>
          <xsl:attribute name="annotations" select="$annotations, @annotations" separator=" "/>
          <xsl:apply-templates/>
        </xsl:copy>
      </xsl:when>
      <xsl:otherwise>
        <xsl:next-match/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- Using oxy_delete to remove a CALS table entry produces a table with an invalid
       number of columns. The CALS to HTML transformation is simply unprepared to deal
       with this. This code inserts a note about removed cells without breaking the
       table structure. See https://github.com/docbook/xslTNG/issues/312 -->

  <xsl:template match="db:entry" priority="10">
    <xsl:variable name="entry" as="element()">
      <xsl:next-match/>
    </xsl:variable>

    <xsl:choose>
      <xsl:when test="preceding-sibling::processing-instruction(oxy_delete)
                      and not(preceding-sibling::db:entry)
                      and following-sibling::processing-instruction(oxy_delete)">
        <entry>
          <xsl:sequence select="$entry/@*"/>
          <phrase role="oxy_delete">DELETED PRECEDING TABLE CELL NOT SHOWN</phrase>
          <xsl:sequence select="$entry/node()"/>
          <phrase role="oxy_delete">DELETED FOLLOWING TABLE CELL NOT SHOWN</phrase>
        </entry>
      </xsl:when>
      <xsl:when test="preceding-sibling::processing-instruction(oxy_delete)
                      and not(preceding-sibling::db:entry)">
        <entry>
          <xsl:sequence select="$entry/@*"/>
          <phrase role="oxy_delete">DELETED PRECEDING TABLE CELL NOT SHOWN</phrase>
          <xsl:sequence select="$entry/node()"/>
        </entry>
      </xsl:when>
      <xsl:when test="following-sibling::processing-instruction(oxy_delete)">
        <entry>
          <xsl:sequence select="$entry/@*"/>
          <xsl:sequence select="$entry/node()"/>
          <phrase role="oxy_delete">DELETED FOLLOWING TABLE CELL NOT SHOWN</phrase>
        </entry>
      </xsl:when>
      <xsl:otherwise>
        <xsl:sequence select="$entry"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="processing-instruction(oxy_delete)">
    <xsl:if test="not(parent::db:row)">
      <xsl:variable name="attr" select="f:pi-attributes(.)"/>
      <phrase role="oxy_delete">
        <xsl:for-each select="$attr/@* except $attr/content">
          <xsl:attribute name="oxy:{local-name(.)}"
                         namespace="http://docbook.org/ns/docbook/oxygen"
                         select="."/>
        </xsl:for-each>
        <xsl:sequence select="string($attr/@content)"/>
      </phrase>
    </xsl:if>
  </xsl:template>
  
  <!-- We’re not dealing with oxy_attributes yet -->
</xsl:stylesheet>
