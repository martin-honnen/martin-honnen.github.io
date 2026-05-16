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
                xmlns="http://www.w3.org/1999/xhtml"
                default-mode="m:docbook"
                exclude-result-prefixes="#all"
                version="3.0">

<xsl:template match="db:table[db:tgroup]">
  <xsl:variable name="tp"
                select="if (parent::db:formalgroup)
                        then $v:formalgroup-nested-object-title-placement
                        else $v:formal-object-title-placement"/>

  <xsl:variable name="placement"
                select="if (exists(f:pi(., 'title-placement')))
                        then f:pi(., 'title-placement')[1]
                        else if (map:get($tp, local-name(.)))
                             then map:get($tp, local-name(.))
                             else map:get($tp, '_default')"/>

  <div>
    <xsl:apply-templates select="." mode="m:attributes"/>

    <xsl:if test="$placement = 'before'">
      <xsl:apply-templates select="." mode="m:generate-titlepage"/>
      <xsl:if test="'details' = $vp:table-accessibility">
        <xsl:apply-templates select="db:textobject[not(db:phrase)]" mode="m:details"/>
      </xsl:if>
    </xsl:if>

    <xsl:apply-templates select="db:tgroup"/>
    <xsl:if test=".//db:footnote">
      <xsl:call-template name="t:table-footnotes">
        <xsl:with-param name="footnotes" select=".//db:footnote"/>
      </xsl:call-template>
    </xsl:if>
    <xsl:apply-templates select="db:caption"/>

    <xsl:if test="not($placement = 'before')">
      <xsl:if test="'details' = $vp:table-accessibility">
        <xsl:apply-templates select="db:textobject[not(db:phrase)]" mode="m:details"/>
      </xsl:if>
      <xsl:apply-templates select="." mode="m:generate-titlepage"/>
    </xsl:if>
  </div>
</xsl:template>

<xsl:template match="db:informaltable[db:tgroup]">
  <div>
    <xsl:apply-templates select="." mode="m:attributes"/>
    <xsl:if test="'details' = $vp:table-accessibility">
      <xsl:apply-templates select="db:textobject[not(db:phrase)]" mode="m:details"/>
    </xsl:if>
    <xsl:apply-templates select="db:tgroup"/>
    <xsl:if test=".//db:footnote">
      <xsl:call-template name="t:table-footnotes">
        <xsl:with-param name="footnotes" select=".//db:footnote"/>
      </xsl:call-template>
    </xsl:if>
    <xsl:apply-templates select="db:caption"/>
  </div>
</xsl:template>

<xsl:template match="db:tgroup">
  <xsl:call-template name="tp:make-table"/>
</xsl:template>

<xsl:template match="db:entrytbl" mode="tp:entrytbl">
  <xsl:call-template name="tp:make-table"/>
</xsl:template>

<xsl:template name="tp:make-table">
  <xsl:param name="inherited-nominal-width" tunnel="true" as="map(*)"
             select="$v:nominal-page-width"/>

  <xsl:message use-when="'tables' = $v:debug" select="."/>

  <xsl:if test="not(@g:preprocessed = 'true')">
    <xsl:message terminate="yes"
                 select="'CALS tables must be normalized by the preprocessor'"/>
  </xsl:if>

  <!-- If the nominal width is relative, just punt. 6in? Sure. -->
  <xsl:variable name="table-width" as="xs:integer"
                select="if (map:get($inherited-nominal-width, 'relative') gt 0)
                        then f:absolute-length(map{'unit':'in', 'relative':0, 'magnitude':6})
                        else f:absolute-length($inherited-nominal-width)"/>

  <table>
    <xsl:if test="'summary' = $vp:table-accessibility">
      <xsl:apply-templates select="../db:textobject[db:phrase]" mode="m:details"/>
    </xsl:if>

    <xsl:variable name="colgroup" as="element(h:colgroup)">
      <xsl:call-template name="tp:cals-colspec"/>
    </xsl:variable>

    <xsl:if test="db:colspec[@colwidth]">
      <xsl:sequence select="$colgroup"/>
    </xsl:if>

    <xsl:variable name="colwidths" as="xs:integer+">
      <xsl:for-each select="$colgroup/h:col/@style">
        <xsl:variable name="w" select="normalize-space(substring-after(., ':'))"/>
        <xsl:choose>
          <xsl:when test="ends-with($w, '%')">
            <xsl:sequence
                select="xs:integer(($table-width * xs:integer(substring-before($w, '%'))) div 100.0)"/>
          </xsl:when>
          <xsl:when test="ends-with($w, 'px')">
            <xsl:sequence
                select="xs:integer(substring-before($w, 'px'))"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:message select="'Unexpected column width: ' || $w"/>
            <xsl:sequence select="128"/> <!-- "This can't happen." Just make up a number????? -->
          </xsl:otherwise>
        </xsl:choose>
      </xsl:for-each>
    </xsl:variable>

    <xsl:apply-templates select="db:thead">
      <xsl:with-param name="column-widths" tunnel="yes" as="xs:integer+" select="$colwidths"/>
    </xsl:apply-templates>
    <xsl:apply-templates select="db:tfoot">
      <xsl:with-param name="column-widths" tunnel="yes" as="xs:integer+" select="$colwidths"/>
    </xsl:apply-templates>
    <xsl:apply-templates select="db:tbody">
      <xsl:with-param name="column-widths" tunnel="yes" as="xs:integer+" select="$colwidths"/>
    </xsl:apply-templates>
  </table>
</xsl:template>

<xsl:template match="db:tbody|db:thead|db:tfoot">
  <xsl:element name="{local-name(.)}" namespace="http://www.w3.org/1999/xhtml">
    <xsl:apply-templates select="." mode="m:attributes"/>
    <xsl:apply-templates/>
  </xsl:element>
</xsl:template>

<xsl:template match="db:row">
  <xsl:variable name="row" select="."/>

  <xsl:message use-when="'tables' = $v:debug"
               select="'========================================'"/>
  <tr>
    <xsl:apply-templates select="." mode="m:attributes"/>
    <xsl:apply-templates/>
  </tr>
</xsl:template>

<xsl:template match="db:colspec|g:colspec|db:spanspec"/>

<xsl:template match="db:entry|db:entrytbl">
  <xsl:param name="column-widths" tunnel="yes" as="xs:integer+"/>

  <xsl:variable name="cols" select="count($column-widths)"/>
  <xsl:variable name="column" select="xs:integer(@g:col)"/>
  <xsl:variable name="row" select="parent::db:row"/>
  <xsl:variable name="table"
                select="($row/ancestor::db:table
                         |$row/ancestor::db:informaltable)[last()]"/>
  
  <xsl:variable name="table-part"
                select="($row/ancestor::db:thead
                         |$row/ancestor::db:tbody
                         |$row/ancestor::db:tfoot)[last()]"/>

  <xsl:variable name="frame" select="$table/@frame"/>
  <xsl:variable name="btop"
                select="$frame = 'all' or $frame = 'top' or $frame = 'topbot'"/>

  <!-- bbot:
       1. The frame includes the bottom border
       2. We're in the last row of a section and the cell has a rowsep
          and either this is a thead or it's a tbody and there is a tfoot
  -->
  <xsl:variable name="bbot"
                select="$frame = 'all' or $frame = 'bot' or $frame = 'topbot'
                        or (@rowsep = '1'
                            and empty($row/following-sibling::db:row)
                            and ($table-part/self::db:thead
                                 or ($table-part/self::db:tbody
                                     and $table-part/preceding-sibling::db:tfoot)))"/>
  <xsl:variable name="bleft"
                select="$frame = 'all' or $frame = 'sides'"/>
  <xsl:variable name="bright"
                select="$frame = 'all' or $frame = 'sides'"/>

  <xsl:variable name="classes" as="xs:string*">
    <xsl:if test="@role">
      <xsl:sequence select="tokenize(@role, '\s+')"/>
    </xsl:if>
    <xsl:sequence select="if (@g:col = 1 and $bleft)
                          then 'bleft'
                          else ()"/>
    <xsl:sequence select="if (empty($row/preceding-sibling::db:row) and $btop)
                          then 'btop'
                          else ()"/>

    <xsl:choose>
      <xsl:when test="@g:inserted">
        <xsl:sequence select="'empty'"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:sequence select="@align"/>
        <xsl:sequence select="@g:valign"/>
        <xsl:if test="@g:char">
          <xsl:sequence select="'char'"/>
        </xsl:if>
      </xsl:otherwise>
    </xsl:choose>

    <xsl:sequence select="f:cals-colsep($cols, ., $bright)"/>
    <xsl:sequence select="f:cals-rowsep($row, ., $bbot)"/>
  </xsl:variable>

  <xsl:variable name="pi-properties"
                select="f:pi-attributes(./processing-instruction('db'))"/>

  <!-- This isn't *really* about the $mediaobject-percentage-of-intrinsic-size,
       but since that flag exists to retain backwards-compatible behavior, we're
       using it here. -->
  <xsl:variable name="fcol" select="$column"/>
  <xsl:variable name="lcol" select="$column + xs:integer((@g:colspan, 1)[1]) - 1"/>
  <xsl:variable name="nom-width"
                select="if (f:is-true($mediaobject-percentage-of-intrinsic-size))
                        then $v:nominal-page-width
                        else map{'unit': 'px',
                                 'relative': 0,
                                 'magnitude': sum($column-widths[position() ge $fcol
                                                  and position() le $lcol])}"/>

  <xsl:element name="{if (ancestor::db:thead) then 'th' else 'td'}"
               namespace="http://www.w3.org/1999/xhtml">
    <xsl:if test="@xml:id">
      <xsl:attribute name="id" select="@xml:id"/>
    </xsl:if>
    <xsl:if test="exists($classes)">
      <xsl:variable name="sorted" as="xs:string+">
        <xsl:for-each select="$classes">
          <xsl:sort select="."/>
          <xsl:sequence select="."/>
        </xsl:for-each>
      </xsl:variable>
      <xsl:attribute name="class" select="string-join($sorted, ' ')"/>
    </xsl:if>
    <xsl:if test="@g:rowspan">
      <xsl:attribute name="rowspan" select="@g:rowspan"/>
    </xsl:if>
    <xsl:if test="@g:colspan">
      <xsl:attribute name="colspan" select="@g:colspan"/>
    </xsl:if>
    <xsl:sequence select="$pi-properties/@style"/>

    <xsl:choose>
      <xsl:when test="self::db:entrytbl">
        <xsl:apply-templates select="." mode="tp:entrytbl">
          <xsl:with-param name="inherited-nominal-width" tunnel="yes" select="$nom-width"/>
        </xsl:apply-templates>
      </xsl:when>
      <xsl:otherwise>
        <xsl:apply-templates>
          <xsl:with-param name="inherited-nominal-width" tunnel="yes" select="$nom-width"/>
        </xsl:apply-templates>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:element>
</xsl:template>

<!-- ============================================================ -->

<xsl:template name="tp:cals-colspec">
  <xsl:variable name="threshold" as="xs:integer"
                select="-1 * $cals-table-width-threshold"/>
  <xsl:variable name="tgroup" select="."/>

  <xsl:variable name="widths" as="map(*)*">
    <xsl:for-each select="db:colspec|g:colspec">
      <xsl:variable name="colspec" select="trace(., 'test colspec')"/>
      <xsl:choose>
        <xsl:when test="$colspec/@colwidth">
          <xsl:sequence select="f:parse-length(string($colspec/@colwidth))"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:sequence select="f:parse-length('1*')"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:for-each>
  </xsl:variable>

  <!--
  <xsl:for-each select="$widths">
    <xsl:message select="'R:' || .?relative || ' M:' || .?magnitude || ' U:' || .?units"/>
  </xsl:for-each>
  -->

  <xsl:variable name="absolute-width" as="xs:double"
                select="sum($widths ! f:absolute-length(.))"/>

  <xsl:variable name="relative-width" as="xs:double"
                select="sum($widths ! f:relative-length(.))"/>

  <xsl:variable name="absolute-remainder"
                select="f:absolute-length($v:nominal-page-width) - $absolute-width"/>

  <xsl:if test="$absolute-remainder lt $threshold">
    <xsl:message>
      <xsl:text>Width of </xsl:text>
      <xsl:value-of select="fp:path($tgroup/..)"/>
      <xsl:text> exceeds nominal width by </xsl:text>
      <xsl:value-of select="abs($absolute-remainder)"/>
      <xsl:text>px</xsl:text>
      <xsl:if test="$relative-width gt 0">
        <xsl:text>, ignoring relative width.</xsl:text>
      </xsl:if>
    </xsl:message>
  </xsl:if>

  <xsl:variable name="absolute-remainder"
                select="if ($absolute-remainder lt $threshold)
                        then 0
                        else $absolute-remainder"/>

  <xsl:choose>
    <xsl:when test="$relative-width gt 0">
      <xsl:variable name="percent-widths" as="xs:integer*">
        <xsl:for-each select="$widths">
          <xsl:variable name="rel-part"
                        select="if (.?relative and .?relative gt 0)
                                then $absolute-remainder div $relative-width * .?relative
                                else 0"/>
          <xsl:sequence select="xs:integer(floor(($rel-part + f:absolute-length(.))
                                                 div f:absolute-length($v:nominal-page-width)
                                                 * 100.0))"/>
        </xsl:for-each>
      </xsl:variable>

      <!-- because I'm fussy about the details; make sure the sum = 100% -->
      <xsl:variable name="first-width" as="xs:integer">
        <xsl:sequence select="$percent-widths[1] + (100 - sum($percent-widths))"/>
      </xsl:variable>

      <colgroup>
        <xsl:for-each select="($first-width, subsequence($percent-widths, 2))">
          <col style="width: {.}%"/>
        </xsl:for-each>
      </colgroup>
    </xsl:when>
    <xsl:otherwise>
      <colgroup>
        <xsl:for-each select="$widths">
          <col style="width: {f:absolute-length(.)}px"/>
        </xsl:for-each>
      </colgroup>
    </xsl:otherwise>
  </xsl:choose>
</xsl:template>

<xsl:function name="f:cals-rowsep" as="xs:string?" cache="yes">
  <xsl:param name="row" as="element(db:row)"/>
  <xsl:param name="cell" as="element()"/>
  <xsl:param name="last-row-rowsep" as="xs:boolean"/>

  <xsl:variable name="last-row"
                select="empty($row/following-sibling::db:row)
                        or ($cell/@g:rowspan
                            and count($row/following-sibling::db:row) lt xs:integer($cell/@g:rowspan))"/>

  <xsl:if test="($cell/@rowsep = '1' and not($last-row))
                 or ($last-row and $last-row-rowsep)">
    <xsl:sequence select="'rowsep'"/>
  </xsl:if>
</xsl:function>

<xsl:function name="f:cals-colsep" as="xs:string?" cache="yes">
  <xsl:param name="cols" as="xs:integer"/>
  <xsl:param name="cell" as="element()"/>
  <xsl:param name="last-col-colsep" as="xs:boolean"/>

  <xsl:variable name="last-col"
                select="empty($cell/following-sibling::*)
                        and (xs:integer($cell/@g:col) = $cols
                             or xs:integer($cell/@g:colend) = $cols)"/>

  <xsl:if test="($cell/@colsep = '1' and not($last-col))
                 or ($last-col and $last-col-colsep)">
    <xsl:sequence select="'colsep'"/>
  </xsl:if>
</xsl:function>

</xsl:stylesheet>
