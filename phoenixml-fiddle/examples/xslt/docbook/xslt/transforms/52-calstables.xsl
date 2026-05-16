<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:array="http://www.w3.org/2005/xpath-functions/array"
                xmlns:db="http://docbook.org/ns/docbook"
                xmlns:dbe="http://docbook.org/ns/docbook/errors"
                xmlns:f="http://docbook.org/ns/docbook/functions"
                xmlns:fcals="http://docbook.org/ns/docbook/functions/private/cals"
                xmlns:fp="http://docbook.org/ns/docbook/functions/private"
                xmlns:g="http://docbook.org/ns/docbook/ghost"
                xmlns:h="http://www.w3.org/1999/xhtml"
                xmlns:m="http://docbook.org/ns/docbook/modes"
                xmlns:map="http://www.w3.org/2005/xpath-functions/map"
                xmlns:mp="http://docbook.org/ns/docbook/modes/private"
                xmlns:t="http://docbook.org/ns/docbook/templates"
                xmlns:tp="http://docbook.org/ns/docbook/templates/private"
                xmlns:v="http://docbook.org/ns/docbook/variables"
                xmlns:vp="http://docbook.org/ns/docbook/variables/private"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns="http://docbook.org/ns/docbook"
                default-mode="m:calstable"
                expand-text="true"
                exclude-result-prefixes="#all"
                version="3.0">

<xsl:include href="../environment.xsl"/>

<xsl:output method="xml" indent="no"/>
<xsl:preserve-space elements="*"/>

<xsl:mode name="m:calstable" on-no-match="shallow-copy"/>

<xsl:template match="db:table[db:tgroup]|db:informaltable[db:tgroup]" priority="100">
  <xsl:next-match>
    <xsl:with-param name="inherited-attributes" select="(@colsep, @rowsep)"/>
  </xsl:next-match>
</xsl:template>

<xsl:template match="db:tgroup|db:entrytbl">
  <xsl:param name="inherited-attributes" as="attribute()*"/>

  <xsl:variable name="inherited-attributes"
                select="fp:merge-attributes((@align, @char, @charoff, @colsep, @rowsep),
                                            $inherited-attributes)"/>

  <xsl:variable name="cols" select="xs:integer(@cols)"/>
  <xsl:variable name="colspecs" select="fcals:colspecs(., $cols, $inherited-attributes)"/>
  <xsl:variable name="colspecmap" as="map(xs:anyAtomicType, element())">
    <xsl:map>
      <xsl:for-each select="$colspecs">
        <xsl:map-entry key="xs:integer(@colnum)" select="."/>
        <xsl:if test="@colname">
          <xsl:map-entry key="@colname/string()" select="."/>
        </xsl:if>
      </xsl:for-each>
    </xsl:map>
  </xsl:variable>

  <xsl:variable name="spanspecs" as="element(db:spanspec)*">
    <xsl:for-each select="db:spanspec">
      <xsl:variable name="colspec" select="map:get($colspecmap, @namest)"/>
      <xsl:variable name="col" select="xs:integer($colspec/@colnum)"/>
      <xsl:variable name="colend" select="xs:integer(map:get($colspecmap, @nameend)/@colnum)"/>

      <xsl:if test="empty($col)">
        <xsl:message terminate="yes">No colspec for namest "{@namest/string()}".</xsl:message>
      </xsl:if>
      <xsl:if test="empty($colend)">
        <xsl:message terminate="yes">No colspec for nameend "{@nameend/string()}".</xsl:message>
      </xsl:if>
      <xsl:if test="$colend le $col">
        <xsl:message terminate="yes">
          <xsl:text>Invalid span: {@namest/string()} ({$col}) to </xsl:text>
          <xsl:text>{@namend/string()} ({$colend})</xsl:text>
        </xsl:message>
      </xsl:if>

      <xsl:variable
          name="span-attr"
          select="fp:merge-attributes(
                    ($colspec/@* except ($colspec/@colname|$colspec/@colnum|$colspec/@g:inserted)),
                    $inherited-attributes)"/>

      <xsl:copy>
        <xsl:sequence select="fp:merge-attributes(@*, $span-attr)"/>
        <xsl:attribute name="g:col" select="$col"/>
        <xsl:attribute name="g:colend" select="$colend"/>
        <xsl:sequence select="fcals:pi-properties(.)"/>
      </xsl:copy>
    </xsl:for-each>
  </xsl:variable>

  <xsl:variable name="spanspecmap" as="map(xs:string, element(db:spanspec))">
    <xsl:map>
      <xsl:for-each select="$spanspecs">
        <xsl:map-entry key="@spanname/string()" select="."/>
      </xsl:for-each>
    </xsl:map>
  </xsl:variable>

  <xsl:variable name="augmented" as="element()">
    <xsl:copy>
      <xsl:sequence select="@*"/>
      <xsl:attribute name="g:preprocessed" select="'true'"/>
      <xsl:sequence select="$colspecs"/>
      <xsl:sequence select="$spanspecs"/>

      <xsl:for-each select="* except (db:colspec|db:spanspec)">
        <xsl:apply-templates select=".">
          <xsl:with-param name="inherited-attributes" select="$inherited-attributes"/>
          <xsl:with-param name="cols" tunnel="yes" as="xs:integer" select="$cols"/>
          <xsl:with-param name="colspecs" tunnel="yes" select="$colspecmap"/>
          <xsl:with-param name="spanspecs" tunnel="yes" select="$spanspecmap"/>
        </xsl:apply-templates>
      </xsl:for-each>
    </xsl:copy>
  </xsl:variable>

  <xsl:apply-templates select="$augmented" mode="fix-augments"/>
</xsl:template>

<xsl:template match="db:thead[parent::db:tgroup or parent::db:entrytbl]
                     |db:tbody[parent::db:tgroup or parent::db:entrytbl]
                     |db:tfoot[parent::db:tgroup]">
  <xsl:param name="inherited-attributes" as="attribute()*"/>
  <xsl:param name="cols" as="xs:integer" tunnel="yes"/>
  <xsl:param name="colspecs" as="map(xs:anyAtomicType, element())" tunnel="yes"/>
  <xsl:param name="spanspecs" as="map(xs:string, element(db:spanspec))" tunnel="yes"/>

  <!-- If any colspec elements are provided in a thead or tfoot,
       they completely override the values in the tgroup; otherwise
       the values in the group apply. -->
  <xsl:variable name="local-colspecs" select="fcals:colspecs(., $cols, $inherited-attributes)"/>
  <xsl:variable name="colspecmap" as="map(xs:anyAtomicType, element())">
    <xsl:map>
      <xsl:for-each select="1 to $cols">
        <xsl:variable name="colnum" select="."/>
        <xsl:variable name="local" select="$local-colspecs[xs:integer(@colnum) = $colnum]"/>
        <xsl:variable name="colspec"
                      select="if ($local/@g:inserted)
                              then map:get($colspecs, $colnum)
                              else $local"/>
        <xsl:map-entry key="$colnum" select="$colspec"/>
        <xsl:if test="$colspec/@colname">
          <xsl:map-entry key="$colspec/@colname" select="$colspec"/>
        </xsl:if>
      </xsl:for-each>
    </xsl:map>
  </xsl:variable>

  <xsl:variable name="inherited-attributes"
                select="fp:merge-attributes(@valign, $inherited-attributes)"/>

  <xsl:copy>
    <xsl:sequence select="@*"/>
    <xsl:if test="not(self::db:tbody)">
      <xsl:for-each select="1 to $cols">
        <xsl:apply-templates select="map:get($colspecmap, .)"/>
      </xsl:for-each>
    </xsl:if>

    <xsl:iterate select="db:row">
      <xsl:param name="overhang" select="for $col in 1 to $cols return 0"/>
      <xsl:variable name="row" as="element(db:row)">
        <xsl:variable name="inherited-attributes"
                      select="fp:merge-attributes((@rowsep, @valign), $inherited-attributes)"/>
        <xsl:apply-templates select=".">
          <xsl:with-param name="inherited-attributes" select="$inherited-attributes"/>
          <xsl:with-param name="overhang" select="$overhang"/>
          <xsl:with-param name="colspecs" select="$colspecmap" tunnel="yes"/>
        </xsl:apply-templates>
      </xsl:variable>

      <xsl:sequence select="$row"/>

      <xsl:next-iteration>
        <xsl:with-param name="overhang" as="xs:integer+">
          <xsl:iterate select="$row/*">
            <xsl:param name="lastentry" as="element()?" select="()"/>

            <xsl:variable name="col" select="position()"/>
            <xsl:variable name="entry"
                          select="if (@g:horizontal)
                                  then $lastentry
                                  else ."/>

            <xsl:sequence select="if ($entry/self::g:* or not($entry/@morerows))
                                      then max(($overhang[$col] - 1, 0))
                                      else xs:integer($entry/@morerows)"/>

            <xsl:next-iteration>
              <xsl:with-param name="lastentry"
                              select="if (@g:horizontal)
                                      then $lastentry
                                      else ."/>
            </xsl:next-iteration>
          </xsl:iterate>
        </xsl:with-param>
      </xsl:next-iteration>
    </xsl:iterate>
  </xsl:copy>
</xsl:template>

<xsl:template match="db:row">
  <xsl:param name="inherited-attributes" as="attribute()*"/>
  <xsl:param name="cols" as="xs:integer" tunnel="yes"/>
  <xsl:param name="colspecs" as="map(xs:anyAtomicType, element())" tunnel="yes"/>
  <xsl:param name="spanspecs" as="map(xs:string, element(db:spanspec))" tunnel="yes"/>
  <xsl:param name="overhang" as="xs:integer+"/>

  <xsl:variable name="inherited-attributes"
                select="fp:merge-attributes(@valign, $inherited-attributes)"/>

  <xsl:variable name="slots" as="xs:integer*"
                select="for $col in 1 to $cols
                        return if ($overhang[$col] = 0) then $col else ()"/>

  <xsl:variable name="elist" as="element()+">
    <xsl:sequence
        select="fcals:populate-row($cols, $colspecs, $spanspecs, $overhang, ., *, $inherited-attributes, 1)"/>
  </xsl:variable>

  <xsl:copy>
    <xsl:sequence select="@*"/>
    <xsl:sequence select="$elist"/>
  </xsl:copy>
</xsl:template>

<!-- ============================================================ -->

<xsl:function name="fcals:colspecs" as="element()+">
  <xsl:param name="node" as="element()"/>
  <xsl:param name="cols" as="xs:integer"/>
  <xsl:param name="inherited-attributes" as="attribute()*"/>

  <xsl:variable name="colspecs" as="element()*">
    <xsl:iterate select="$node/db:colspec">
      <xsl:param name="colnum" select="1"/>

      <xsl:choose>
        <xsl:when test="@colnum">
          <xsl:variable name="thiscolnum" select="xs:integer(@colnum)"/>
          <xsl:for-each select="$colnum to $thiscolnum - 1">
            <colspec colnum="{.}">
              <xsl:sequence select="$inherited-attributes"/>
              <xsl:attribute name="g:inserted" select="'true'"/>
            </colspec>
          </xsl:for-each>

          <colspec>
            <xsl:variable name="attr"
                          select="fp:merge-attributes(@*, $inherited-attributes)"/>
            <xsl:sequence select="$attr"/>
            <xsl:if test="$attr[node-name(.) = QName('', 'align')] = 'char'">
              <xsl:sequence select="fcals:pi-properties(.)"/>
            </xsl:if>
          </colspec>

          <xsl:next-iteration>
            <xsl:with-param name="colnum" select="xs:integer(@colnum)+1"/>
          </xsl:next-iteration>
        </xsl:when>
        <xsl:otherwise>
          <colspec>
            <xsl:variable name="attr"
                          select="fp:merge-attributes(@*, $inherited-attributes)"/>
            <xsl:attribute name="colnum" select="$colnum"/>
            <xsl:sequence select="$attr"/>
            <xsl:if test="$attr[node-name(.) = QName('', 'align')] = 'char'">
              <xsl:sequence select="fcals:pi-properties(.)"/>
            </xsl:if>
          </colspec>

          <xsl:next-iteration>
            <xsl:with-param name="colnum" select="$colnum+1"/>
          </xsl:next-iteration>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:iterate>
  </xsl:variable>

  <xsl:sequence select="$colspecs"/>
  <xsl:variable name="start"
                select="if (empty($colspecs))
                        then xs:integer(1)
                        else xs:integer($colspecs[last()]/@colnum) + 1"/>
             
  <xsl:for-each select="$start to $cols">
    <colspec colnum="{.}">
      <xsl:sequence select="$inherited-attributes"/>
      <xsl:attribute name="g:inserted" select="'true'"/>
    </colspec>
  </xsl:for-each>
</xsl:function>

<xsl:function name="fcals:populate-row">
  <xsl:param name="cols" as="xs:integer"/>
  <xsl:param name="colspecs" as="map(xs:anyAtomicType, element())"/>
  <xsl:param name="spanspecs" as="map(xs:string, element(db:spanspec))"/>
  <xsl:param name="overhang" as="xs:integer+"/>
  <xsl:param name="row" as="element(db:row)"/>
  <xsl:param name="entries" as="element()*"/>
  <xsl:param name="inherited-attributes" as="attribute()*"/>
  <xsl:param name="col" as="xs:integer"/>

  <xsl:if test="$col gt $cols and exists($entries)">
    <xsl:message select="'Table row contains more than ' || $cols || ' entries:'"/>
    <xsl:message terminate="yes" select="$entries[1]"/>
  </xsl:if>

  <xsl:if test="$col le $cols">
    <xsl:choose>
      <xsl:when test="$overhang[$col] gt 0">
        <g:over g:col="{$col}" g:vertical="true">
          <xsl:if test="$overhang[$col] gt 1">
            <xsl:attribute name="morerows" select="$overhang[$col] - 1"/>
          </xsl:if>
        </g:over>
        <xsl:sequence select="fcals:populate-row($cols, $colspecs, $spanspecs, $overhang,
                                                 $row, $entries, $inherited-attributes, $col + 1)"/>
      </xsl:when>
      <xsl:when test="empty($entries)">
        <xsl:variable name="ref" select="map:get($colspecs, $col)"/>

        <xsl:variable name="attributes"
                      select="fp:merge-attributes(
                                $ref/@* except ($ref/@colname|$ref/@colnum|$ref/@spanname
                                                |$ref/@namest|$ref/@nameend|$ref/@g:inserted),
                                $inherited-attributes,
                                map{QName('', 'valign'): xs:QName('g:valign'),
                                    QName('', 'colwidth'): xs:QName('g:colwidth')})"/>

        <entry g:col="{$col}" g:inserted="true">
          <xsl:sequence select="$attributes"/>
        </entry>

        <xsl:sequence select="fcals:populate-row($cols, $colspecs, $spanspecs, $overhang,
                                                 $row, $entries, $inherited-attributes, $col + 1)"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:variable name="entry" select="$entries[1]"/>

        <xsl:variable name="ref" as="element()">
          <xsl:choose>
            <xsl:when test="$entry/@colname">
              <xsl:sequence select="map:get($colspecs, $entry/@colname)"/>
            </xsl:when>
            <xsl:when test="$entry/@namest">
              <xsl:sequence select="map:get($colspecs, $entry/@namest)"/>
            </xsl:when>
            <xsl:when test="$entry/@spanname">
              <xsl:sequence select="map:get($spanspecs, $entry/@spanname)"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:sequence select="map:get($colspecs, $col)"/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:variable>

        <xsl:variable name="attributes"
                      select="fp:merge-attributes(
                                $ref/@* except ($ref/@colname|$ref/@colnum|$ref/@spanname
                                                |$ref/@namest|$ref/@nameend|$ref/@g:inserted),
                                $inherited-attributes,
                                map{QName('', 'valign'): xs:QName('g:valign'),
                                    QName('', 'colwidth'): xs:QName('g:colwidth')})"/>

        <xsl:variable name="attributes"
                      select="if ($entry/self::db:entrytbl)
                              then $attributes[not(node-name(.) = QName('', 'char')
                                                   or node-name(.) = QName('', 'charoff')
                                                   or node-name(.) = QName('', 'align')
                                                   or node-name(.) = xs:QName('g:align-char-width')
                                                   or node-name(.) = xs:QName('g:align-char-pad'))]
                              else $attributes"/>

        <xsl:variable name="ecol" as="xs:integer">
          <xsl:choose>
            <xsl:when test="$entry/@colname">
              <xsl:sequence select="xs:integer(map:get($colspecs, $entry/@colname)/@colnum)"/>
            </xsl:when>
            <xsl:when test="$entry/@namest">
              <xsl:sequence select="xs:integer(map:get($colspecs, $entry/@namest)/@colnum)"/>
            </xsl:when>
            <xsl:when test="$entry/@spanname">
              <xsl:sequence select="xs:integer(map:get($spanspecs, $entry/@spanname)/@g:col)"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:sequence select="$col"/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:variable>

        <xsl:variable name="ecolend" as="xs:integer">
          <xsl:choose>
            <xsl:when test="$entry/@nameend">
              <xsl:sequence select="xs:integer(map:get($colspecs, $entry/@nameend)/@colnum)"/>
            </xsl:when>
            <xsl:when test="$entry/@spanname">
              <xsl:sequence select="xs:integer(map:get($spanspecs, $entry/@spanname)/@g:colend)"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:sequence select="$ecol"/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:variable>

        <xsl:choose>
          <xsl:when test="$col lt $ecol">
            <xsl:variable name="ref" select="map:get($colspecs, $col)"/>

            <xsl:variable name="attributes"
                          select="fp:merge-attributes(
                                    $ref/@* except ($ref/@colname|$ref/@colnum|$ref/@spanname
                                                    |$ref/@namest|$ref/@nameend|$ref/@g:inserted),
                                    $inherited-attributes,
                                    map{QName('', 'valign'): xs:QName('g:valign'),
                                        QName('', 'colwidth'): xs:QName('g:colwidth')})"/>

            <entry g:col="{$col}" g:inserted="true">
              <xsl:sequence select="$attributes"/>
            </entry>
            <xsl:sequence select="fcals:populate-row($cols, $colspecs, $spanspecs, $overhang,
                                                     $row, $entries, $inherited-attributes, $col + 1)"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:variable name="updated-entry" as="element()">
              <xsl:element name="{node-name($entry)}" namespace="{namespace-uri($entry)}">
                <xsl:sequence select="fp:merge-attributes($entry/@*, $attributes,
                                         map{QName('', 'valign'): xs:QName('g:valign'),
                                             QName('', 'colwidth'): xs:QName('g:colwidth')})"/>
                <xsl:attribute name="g:col" select="$ecol"/>
                <xsl:if test="$ecol ne $ecolend">
                  <xsl:attribute name="g:colend" select="$ecolend"/>
                  <xsl:attribute name="g:colspan" select="$ecolend - $ecol + 1"/>
                </xsl:if>
                <xsl:if test="$entry/@morerows">
                  <xsl:attribute name="g:rowspan" select="xs:integer($entry/@morerows) + 1"/>
                </xsl:if>
                <xsl:sequence select="$entry/node()"/>
              </xsl:element>
            </xsl:variable>
            <xsl:apply-templates select="$updated-entry"/>

            <xsl:for-each select="$ecol + 1 to $ecolend">
              <g:over g:horizontal="true" g:col="{.}"/>
            </xsl:for-each>

            <xsl:sequence select="fcals:populate-row($cols, $colspecs, $spanspecs, $overhang,
                                                     $row, $entries[position() gt 1],
                                                     $inherited-attributes, $ecolend + 1)"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:if>
</xsl:function>


<xsl:function name="fcals:initial-pis" as="processing-instruction('db')*">
  <xsl:param name="nodes" as="node()*"/>
  <xsl:iterate select="$nodes">
    <xsl:choose>
      <xsl:when test="self::processing-instruction('db')">
        <xsl:sequence select="."/>
      </xsl:when>
      <xsl:when test="self::*">
        <xsl:break/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:next-iteration/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:iterate>
</xsl:function>

<xsl:function name="fcals:pi-properties" as="attribute()*">
  <xsl:param name="node" as="element()"/>

  <xsl:variable name="pis" select="fcals:initial-pis($node/following-sibling::node())"/>
  <xsl:variable name="pis" select="if (empty($pis))
                                   then fcals:initial-pis($node/ancestor::db:tgroup[1]/node())
                                   else $pis"/>

  <xsl:for-each select="$pis ! f:pi-attributes(.)/@*">
    <xsl:attribute name="g:{local-name(.)}" namespace="http://docbook.org/ns/docbook/ghost">
      <xsl:sequence select="."/>
    </xsl:attribute>
  </xsl:for-each>
</xsl:function>

<xsl:function name="fcals:combine-attributes" as="attribute()*">
  <xsl:param name="node" as="element()"/>
  <xsl:param name="attributes" as="attribute()*"/>

  <xsl:sequence select="$node/@*"/>
  <xsl:for-each select="$attributes">
    <xsl:variable name="name" select="node-name(.)"/>
    <xsl:if test="empty($node/@*[node-name(.) = $name])">
      <xsl:sequence select="."/>
    </xsl:if>
  </xsl:for-each>
</xsl:function>

<!-- ============================================================ -->

<xsl:mode name="fix-augments" on-no-match="shallow-copy"/>

<xsl:template match="g:over" mode="fix-augments"/>

<xsl:template match="db:entry[preceding-sibling::*[1]/self::g:over
                              or following-sibling::*[1]/self::g:over]"
              mode="fix-augments">
  <xsl:copy>
    <xsl:apply-templates select="@*" mode="fix-augments"/>
    <xsl:if test="preceding-sibling::g:over and not(preceding-sibling::db:*)">
      <xsl:attribute name="g:preceding-covered-cells"
                     select="count(preceding-sibling::g:over)"/>
    </xsl:if>
    <xsl:if test="following-sibling::*[1]/self::g:over">
      <xsl:variable name="next-db" select="following-sibling::db:*[1]"/>
      <xsl:variable name="covered"
                    select="if (empty($next-db))
                            then following-sibling::g:over
                            else following-sibling::g:over[. &lt;&lt; $next-db]"/>
      <xsl:attribute name="g:following-covered-cells" select="count($covered)"/>
    </xsl:if>

    <xsl:call-template name="tp:cell-content"/>
  </xsl:copy>
</xsl:template>

<xsl:template match="db:entry" mode="fix-augments">
  <xsl:copy>
    <xsl:choose>
      <xsl:when test="@align='char' and not(*)">
        <xsl:apply-templates select="@* except (@char|@g:align-char-width)" mode="fix-augments"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:apply-templates select="@*" mode="fix-augments"/>
      </xsl:otherwise>
    </xsl:choose>
    <xsl:call-template name="tp:cell-content"/>
  </xsl:copy>
</xsl:template>

<xsl:template name="tp:cell-content">
  <xsl:choose>
    <xsl:when test="f:is-true($align-char-processing) and not(@g:inserted)
                    and @align='char' and not(*)">
      <xsl:attribute name="align" select="'right'"/>
      <xsl:attribute name="g:char" select="(@char, $align-char-default)[1]"/>
      <xsl:call-template name="tp:char-align"/>
    </xsl:when>
    <xsl:otherwise>
      <xsl:apply-templates select="node()" mode="fix-augments"/>
    </xsl:otherwise>
  </xsl:choose>
</xsl:template>

<xsl:template name="tp:char-align">
  <xsl:variable name="width" select="xs:integer((@g:align-char-width, $align-char-width)[1])"/>
  <xsl:variable name="padchar" select="(@g:align-char-pad, $align-char-pad)[1]"/>
  <xsl:variable name="char" select="(@char, $align-char-default)[1]"/>

  <xsl:variable name="padding" select="fp:padding($padchar, $width)"/>

  <xsl:variable name="content" select="normalize-space(.)"/>
  <xsl:variable name="parts"
                select="f:tokenize-on-char($content, $char)"/>

  <xsl:variable name="before"
                select="if (contains($content, $char))
                        then string-join($parts[position() lt last()], $char)
                        else $content"/>

  <!-- If the pad character is a space of some sort, use it for padding;
       otherwise use the alignment character. -->
  <xsl:variable name="before"
                select="if (contains($content, $char))
                        then $before || $char
                        else if (matches($padchar, '\p{Zs}'))
                             then $before || $padchar
                             else $before || $char"/>

  <xsl:variable name="after"
                select="if (contains($content, $char))
                        then $parts[last()]
                        else ''"/>

  <xsl:choose>
    <xsl:when test="string-length($after) lt $width">
      <xsl:sequence select="$before || substring($after||$padding, 1, $width)"/>
    </xsl:when>
    <xsl:otherwise>
      <xsl:sequence select="$before || $after"/>
    </xsl:otherwise>
  </xsl:choose>
</xsl:template>

<xsl:function name="fp:padding" as="xs:string" cache="yes">
  <xsl:param name="pad" as="xs:string"/>
  <xsl:param name="width" as="xs:integer"/>

  <xsl:choose>
    <xsl:when test="string-length($pad) * 2 gt $width">
      <xsl:sequence select="substring($pad||$pad, 1, $width)"/>
    </xsl:when>
    <xsl:otherwise>
      <xsl:sequence select="fp:padding($pad||$pad, $width)"/>
    </xsl:otherwise>
  </xsl:choose>
</xsl:function>

<xsl:function name="fp:merge-attributes" as="attribute()*">
  <xsl:param name="attributes" as="attribute()*"/>
  <xsl:param name="inherited-attributes" as="attribute()*"/>
  <xsl:sequence select="fp:merge-attributes($attributes, $inherited-attributes, map{})"/>
</xsl:function>

<xsl:function name="fp:merge-attributes" as="attribute()*">
  <xsl:param name="attributes" as="attribute()*"/>
  <xsl:param name="inherited-attributes" as="attribute()*"/>
  <xsl:param name="rename" as="map(xs:QName,xs:QName)"/>

  <xsl:for-each select="$attributes">
    <xsl:variable name="aname" select="node-name(.)"/>
    <xsl:choose>
      <xsl:when test="map:contains($rename, $aname)">
        <xsl:attribute name="{map:get($rename, $aname)}" select="string(.)"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:sequence select="."/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:for-each>

  <xsl:for-each select="$inherited-attributes">
    <xsl:variable name="aname" select="node-name(.)"/>
    <xsl:if test="empty($attributes[node-name(.) = $aname])">
      <xsl:choose>
        <xsl:when test="map:contains($rename, $aname)">
          <xsl:attribute name="{map:get($rename, $aname)}" select="string(.)"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:sequence select="."/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:if>
  </xsl:for-each>
</xsl:function>

<!-- ============================================================ -->

</xsl:stylesheet>
