<!--
Copyright (C) by David Maus <dmaus@dmaus.name>

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
-->
<xsl:transform version="3.0" expand-text="yes"
               xmlns:alias="http://www.w3.org/1999/XSL/TransformAlias"
               xmlns:err="http://www.w3.org/2005/xqt-errors"
               xmlns:map="http://www.w3.org/2005/xpath-functions/map"
               xmlns:schxslt="http://dmaus.name/ns/2023/schxslt"
               xmlns:sch="http://purl.oclc.org/dsdl/schematron"
               xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
               xmlns:xs="http://www.w3.org/2001/XMLSchema"
               xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:namespace-alias result-prefix="xsl" stylesheet-prefix="alias"/>

  <xsl:param name="schxslt:debug" static="yes" select="false()">
    <!--
        Enable or disable debugging. When debugging is enable, the validation stylesheet is indented. Defaults to false.
    -->
  </xsl:param>

  <xsl:output indent="yes" use-when="$schxslt:debug"/>

  <xsl:variable name="schxslt:version" as="xs:string"
                select="if (starts-with('${project.version}', '$')) then 'development' else '${project.version}'"/>

  <xsl:param name="schxslt:phase" as="xs:string" select="'#DEFAULT'">
    <!--
        Name of the validation phase. The value '#DEFAULT' selects the pattern in the sch:schema/@defaultPhase attribute
        or '#ALL' if this attribute is not present. The value '#ALL' selects all patterns. Defaults to '#DEFAULT'.
    -->
  </xsl:param>

  <xsl:param name="schxslt:expand-text" as="xs:boolean" select="false()">
    <!--
        When set to boolean true, the validation stylesheet globally enables text value templates and you may use them
        in assertion or diagnostic messages. Defaults to false.
    -->
  </xsl:param>

  <xsl:param name="schxslt:streamable" as="xs:boolean" select="false()" static="yes">
    <!--
        Set to boolean true to create a streamable validation stylesheet. This *does not* check the streamability of
        XPath expressions in rules, assertions, variables etc. It merely declares the modes in the validation stylesheet
        to be streamable and removes the @location attribute from the SVRL output when no location function is given
        because the default fn:path() is not streamable. Defaults to false.
    -->
  </xsl:param>

  <xsl:param name="schxslt:location-function" as="xs:string?" select="()" static="yes">
    <!--
        Name of a function f($context as node()) as xs:string that provides location information for the SVRL
        report. Defaults to fn:path() when not set.
    -->
  </xsl:param>

  <xsl:param name="schxslt:fail-early" as="xs:boolean" select="false()" static="yes">
    <!--
        When set to boolean true, the validation stylesheets stops as soon as it encounters the first failed assertion
        or successful report. Defaults to false.
    -->
  </xsl:param>

  <xsl:mode name="schxslt:expand" on-no-match="shallow-copy"/>
  <xsl:mode name="schxslt:include" on-no-match="shallow-copy"/>
  <xsl:mode name="schxslt:transpile" on-no-match="shallow-skip"/>

  <xsl:mode on-no-match="shallow-skip"/>
  <xsl:mode name="schxslt:copy-verbatim" on-no-match="shallow-copy"/>
  <xsl:mode name="schxslt:copy-message-content" on-no-match="shallow-copy"/>

  <xsl:key name="schxslt:patternByPhaseId" match="sch:pattern" use="../sch:phase[sch:active/@pattern = current()/@id]/@id"/>
  <xsl:key name="schxslt:patternByPhaseId" match="sch:pattern" use="'#ALL'"/>
  <xsl:key name="schxslt:phaseByPatternId" match="sch:phase" use="sch:active/@pattern"/>
  <xsl:key name="schxslt:diagnosticById" match="sch:diagnostic" use="@id"/>
  <xsl:key name="schxslt:propertyById" match="sch:property" use="@id"/>

  <xsl:template match="sch:schema" as="element(xsl:stylesheet)">

    <xsl:variable name="schema" as="document-node(element(sch:schema))">
      <xsl:document>
        <xsl:call-template name="schxslt:perform-expand">
          <xsl:with-param name="schema" as="document-node(element(sch:schema))">
            <xsl:document>
              <xsl:call-template name="schxslt:perform-include">
                <xsl:with-param name="schema" as="element(sch:schema)" select="."/>
              </xsl:call-template>
            </xsl:document>
          </xsl:with-param>
        </xsl:call-template>
      </xsl:document>
    </xsl:variable>

    <xsl:apply-templates select="$schema" mode="schxslt:transpile"/>

  </xsl:template>

  <xsl:template name="schxslt:perform-include" as="element(sch:schema)">
    <xsl:param name="schema" as="element(sch:schema)" required="yes"/>
    <xsl:apply-templates select="$schema" mode="schxslt:include"/>
  </xsl:template>

  <xsl:template name="schxslt:perform-expand" as="document-node(element(sch:schema))">
    <xsl:param name="schema" as="document-node(element(sch:schema))" required="yes"/>
    <xsl:apply-templates select="$schema" mode="schxslt:expand"/>
  </xsl:template>

  <!-- Step 1: Include -->
  <xsl:template match="sch:include" as="element()" mode="schxslt:include">
    <xsl:variable name="external" as="element()" select="if (document(@href) instance of document-node()) then document(@href)/*[1] else document(@href)"/>
    <xsl:apply-templates select="$external" mode="#current">
      <xsl:with-param name="sourceLanguage" as="xs:string" select="schxslt:in-scope-language(.)"/>
      <xsl:with-param name="targetNamespaces" as="element(sch:ns)*" select="$external/ancestor::sch:schema/sch:ns"/>
    </xsl:apply-templates>
  </xsl:template>

  <xsl:template match="sch:rule/sch:extends[@href]" as="node()*" mode="schxslt:include">
    <xsl:variable name="external" as="element()" select="if (document(@href) instance of document-node()) then document(@href)/*[1] else document(@href)"/>
    <xsl:if test="(namespace-uri($external) ne 'http://purl.oclc.org/dsdl/schematron') or (local-name($external) ne 'rule')">
      <xsl:variable name="message" as="xs:string+">
        The @href attribute of an &lt;extends&gt; element must be an IRI reference to an external well-formed XML
        document or to an element in an external well-formed XML document that is a Schematron &lt;rule&gt;
        element. This @href points to a Q{{{namespace-uri($external)}}}{local-name($external)} element.
      </xsl:variable>
      <xsl:message terminate="yes">
        <xsl:text/>
        <xsl:value-of select="normalize-space(string-join($message))"/>
      </xsl:message>
    </xsl:if>
    <xsl:apply-templates select="$external/node()" mode="#current">
      <xsl:with-param name="sourceLanguage" select="schxslt:in-scope-language(.)"/>
      <xsl:with-param name="targetNamespaces" as="element(sch:ns)*" select="$external/../../sch:ns"/>
    </xsl:apply-templates>
  </xsl:template>

  <xsl:template match="*" mode="schxslt:include schxslt:expand">
    <xsl:param name="sourceLanguage" as="xs:string" select="schxslt:in-scope-language(.)"/>
    <xsl:param name="targetNamespaces" as="element(sch:ns)*"/>
    <xsl:variable name="inScopeLanguage" as="xs:string" select="schxslt:in-scope-language(.)"/>

    <xsl:copy>
      <xsl:for-each select="$targetNamespaces">
        <xsl:namespace name="{@prefix}" select="@uri"/>
      </xsl:for-each>
      <xsl:apply-templates select="@*" mode="#current"/>
      <xsl:if test="not(@xml:lang) and not($inScopeLanguage eq $sourceLanguage)">
        <xsl:attribute name="xml:lang" select="$inScopeLanguage"/>
      </xsl:if>
      <xsl:apply-templates select="node()" mode="#current"/>
    </xsl:copy>
  </xsl:template>

  <!-- Step 2: Expand -->
  <xsl:template match="sch:rule[@abstract = 'true'] | sch:pattern[@abstract = 'true']" as="empty-sequence()" mode="schxslt:expand"/>

  <xsl:template match="sch:rule/sch:extends[@rule]" as="node()*" mode="schxslt:expand">
    <xsl:variable name="abstract-rule" as="element(sch:rule)"
                  select="(../../sch:rule, ../../../sch:rules/sch:rule)[@abstract = 'true'][@id = current()/@rule]"/>
    <xsl:if test="empty($abstract-rule)">
      <xsl:variable name="message" as="xs:string+">
        The current pattern or schema defines no abstract rule named '{@rule}'.
      </xsl:variable>
      <xsl:message terminate="yes">
        <xsl:text/>
        <xsl:value-of select="normalize-space(string-join($message))"/>
      </xsl:message>
    </xsl:if>
    <xsl:apply-templates select="$abstract-rule/node()" mode="#current">
      <xsl:with-param name="sourceLanguage" as="xs:string" select="schxslt:in-scope-language(.)"/>
    </xsl:apply-templates>
  </xsl:template>

  <xsl:template match="sch:pattern[@is-a]" as="element(sch:pattern)" mode="schxslt:expand">
    <xsl:variable name="is-a" as="element(sch:pattern)?" select="../sch:pattern[@abstract = 'true'][@id = current()/@is-a]"/>
    <xsl:if test="empty($is-a)">
      <xsl:variable name="message" as="xs:string+">
        The current schema does not define an abstract pattern with an id of '{@is-a}'.
      </xsl:variable>
      <xsl:message terminate="yes">
        <xsl:text/>
        <xsl:value-of select="normalize-space(string-join($message))"/>
      </xsl:message>
    </xsl:if>

    <!-- Check if all declared parameters are supplied -->
    <xsl:variable name="params-supplied" as="element(sch:param)*" select="sch:param"/>
    <xsl:variable name="params-declared" as="xs:string*" select="$is-a/sch:param/@name ! string(.)"/>
    <xsl:if test="exists($params-declared[not(. = $params-supplied/@name)])">
      <xsl:variable name="message" as="xs:string+">
        Some abstract pattern parameters of '{@is-a}' are declared but not supplied: {$params-declared[not(. = $params-supplied/@name)]}.
      </xsl:variable>
      <xsl:message terminate="yes">
        <xsl:text/>
        <xsl:value-of select="normalize-space(string-join($message))"/>
      </xsl:message>
    </xsl:if>
    <!-- Check if all supplied parameters are declared -->
    <xsl:if test="exists($params-declared) and exists($params-supplied[not(@name = $params-declared)])">
      <xsl:variable name="message" as="xs:string+">
        Some abstract pattern parameters of '{@is-a}' are supplied but not declared: {$params-supplied[not(@name = $params-declared)]/@name}.
      </xsl:variable>
      <xsl:message terminate="yes">
        <xsl:text/>
        <xsl:value-of select="normalize-space(string-join($message))"/>
      </xsl:message>
    </xsl:if>

    <xsl:variable name="instance" as="document-node()">
      <!-- In order to make use of fn:key() in the transpilation stage
           we need to root the preprocessed schema. -->
      <xsl:document>
        <xsl:apply-templates select="$is-a/node()" mode="#current">
          <xsl:with-param name="sourceLanguage" as="xs:string" select="schxslt:in-scope-language(.)"/>
          <xsl:with-param name="params" as="element(sch:param)*" select="$params-supplied" tunnel="yes"/>
        </xsl:apply-templates>
      </xsl:document>
    </xsl:variable>

    <xsl:variable name="diagnostics" as="xs:string*" select="tokenize(string-join($instance/sch:rule/sch:*/@diagnostics, ' '))"/>
    <xsl:variable name="properties" as="xs:string*" select="tokenize(string-join($instance/sch:rule/sch:*/@properties, ' '))"/>

    <xsl:copy>
      <xsl:apply-templates select="@*" mode="#current">
        <xsl:with-param name="params" as="element(sch:param)*" select="sch:param" tunnel="yes"/>
      </xsl:apply-templates>
      <xsl:if test="empty(@documents)">
        <xsl:apply-templates select="$is-a/@documents" mode="#current">
          <xsl:with-param name="params" as="element(sch:param)*" select="sch:param" tunnel="yes"/>
        </xsl:apply-templates>
      </xsl:if>
      <xsl:if test="empty(@xml:lang) and (schxslt:in-scope-language(.) ne schxslt:in-scope-language($is-a))">
        <xsl:attribute name="xml:lang" select="schxslt:in-scope-language($is-a)"/>
      </xsl:if>
      <xsl:sequence select="$instance"/>
      <xsl:apply-templates select="node()" mode="#current"/>

      <xsl:if test="exists($diagnostics)">
        <xsl:element name="diagnostics" namespace="http://purl.oclc.org/dsdl/schematron">
          <xsl:apply-templates select="key('schxslt:diagnosticById', $diagnostics)" mode="#current">
            <xsl:with-param name="params" as="element(sch:param)*" select="sch:param" tunnel="yes"/>
          </xsl:apply-templates>
        </xsl:element>
      </xsl:if>
      <xsl:if test="exists($properties)">
        <xsl:element name="properties" namespace="http://purl.oclc.org/dsdl/schematron">
          <xsl:apply-templates select="key('schxslt:propertyById', $properties)" mode="#current">
            <xsl:with-param name="params" as="element(sch:param)*" select="sch:param" tunnel="yes"/>
          </xsl:apply-templates>
        </xsl:element>
      </xsl:if>

    </xsl:copy>

  </xsl:template>

  <xsl:template match="sch:assert/@test | sch:report/@test | sch:rule/@context | sch:value-of/@select | sch:pattern/@documents | sch:name/@path | sch:let/@value | xsl:copy-of[ancestor::sch:property]/@select" mode="schxslt:expand">
    <xsl:param name="params" as="element(sch:param)*" tunnel="yes"/>
    <xsl:attribute name="{name()}" select="schxslt:replace-params(., $params)"/>
  </xsl:template>

  <xsl:function name="schxslt:replace-params" as="xs:string?">
    <xsl:param name="src" as="xs:string"/>
    <xsl:param name="params" as="element(sch:param)*"/>
    <xsl:choose>
      <xsl:when test="empty($params)">
        <xsl:value-of select="$src"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:variable name="paramsSorted" as="element(sch:param)*">
          <xsl:for-each select="$params">
            <xsl:sort select="string-length(@name)" order="descending"/>
            <xsl:sequence select="."/>
          </xsl:for-each>
        </xsl:variable>

        <xsl:variable name="value" select="replace(replace($paramsSorted[1]/@value, '\\', '\\\\'), '\$', '\\\$')"/>
        <xsl:variable name="src" select="replace($src, concat('(\W*)\$', $paramsSorted[1]/@name, '(\W*)'), concat('$1', $value, '$2'))"/>
        <xsl:value-of select="schxslt:replace-params($src, $paramsSorted[position() > 1])"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:function>

  <!-- Step 3: Transpile -->
  <xsl:template match="sch:schema" as="element(xsl:stylesheet)" mode="schxslt:transpile">

    <xsl:variable name="phase" as="xs:string" select="if ($schxslt:phase = ('#DEFAULT', '')) then (@defaultPhase, '#ALL')[1] else $schxslt:phase"/>
    <xsl:variable name="patterns" as="map(xs:string, element(sch:pattern)+)">
      <xsl:map>
        <xsl:for-each-group select="key('schxslt:patternByPhaseId', $phase)" group-by="string(@documents)">
          <xsl:map-entry key="concat('group.', generate-id(current-group()[1]))" select="current-group()"/>
        </xsl:for-each-group>
      </xsl:map>
    </xsl:variable>

    <alias:stylesheet version="3.0" expand-text="{$schxslt:expand-text}">
      <xsl:for-each select="sch:ns">
        <xsl:namespace name="{@prefix}" select="@uri"/>
      </xsl:for-each>

      <alias:variable name="schxslt:phase" as="xs:string" select="'{$phase}'"/>

      <xsl:apply-templates select="sch:let" mode="#current"/>
      <xsl:apply-templates select="sch:phase[@id = $phase]/sch:let" mode="#current"/>

      <xsl:sequence select="xsl:accumulator | xsl:function | xsl:include | xsl:import | xsl:import-schema | xsl:key | xsl:use-package"/>

      <xsl:for-each select="map:keys($patterns)">
        <alias:mode name="{.}" on-no-match="shallow-skip" streamable="{$schxslt:streamable}"/>
        <alias:template match="*" mode="{.}" priority="-10">
          <alias:apply-templates select="@*" mode="#current"/>
          <alias:apply-templates select="node()" mode="#current"/>
        </alias:template>
        <xsl:apply-templates select="map:get($patterns, .)/sch:let" mode="#current"/>
        <xsl:apply-templates select="map:get($patterns, .)/sch:rule" mode="#current">
          <xsl:with-param name="mode" as="xs:string" select="."/>
        </xsl:apply-templates>
      </xsl:for-each>

      <alias:template match="root()" as="element(svrl:schematron-output)">

        <svrl:schematron-output>
          <xsl:sequence select="@schemaVersion"/>
          <xsl:attribute name="phase" select="$phase"/>
          <xsl:for-each select="sch:ns">
            <svrl:ns-prefix-in-attribute-values prefix="{@prefix}" uri="{@uri}"/>
          </xsl:for-each>
          <xsl:comment>SchXslt2 Core {$schxslt:version}</xsl:comment>
          <xsl:for-each select="map:keys($patterns)">
            <xsl:variable name="groupId" as="xs:string" select="."/>
            <xsl:for-each select="map:get($patterns, $groupId)">
              <svrl:active-pattern>
                <xsl:sequence select="@id"/>
                <alias:attribute name="documents" select="{if (@documents) then @documents else 'document-uri(.)'}"/>
              </svrl:active-pattern>
            </xsl:for-each>

            <xsl:choose>
              <xsl:when test="map:get($patterns, $groupId)[1]/@documents">
                <alias:for-each select="{map:get($patterns, $groupId)[1]/@documents}">
                  <alias:source-document href="{{.}}">
                    <xsl:call-template name="schxslt:dispatch-validation-group">
                      <xsl:with-param name="groupId" as="xs:string" select="$groupId"/>
                    </xsl:call-template>
                  </alias:source-document>
                </alias:for-each>
              </xsl:when>
              <xsl:otherwise>
                <xsl:call-template name="schxslt:dispatch-validation-group">
                  <xsl:with-param name="groupId" as="xs:string" select="$groupId"/>
                </xsl:call-template>
              </xsl:otherwise>
            </xsl:choose>

          </xsl:for-each>
        </svrl:schematron-output>

      </alias:template>

    </alias:stylesheet>

  </xsl:template>

  <xsl:template match="sch:rule" as="element(xsl:template)" mode="schxslt:transpile">
    <xsl:param name="mode" as="xs:string" required="yes"/>

    <alias:template match="{@context}" mode="{$mode}" priority="{last() - position()}">
      <xsl:call-template name="schxslt:copy-in-scope-namespaces"/>
      <alias:param name="schxslt:pattern" as="xs:string*" select="()"/>
      <alias:choose>
        <alias:when test="'{generate-id(..)}' = $schxslt:pattern">
          <svrl:suppressed-rule>
            <xsl:sequence select="@id"/>
            <xsl:sequence select="@role"/>
            <xsl:sequence select="@flag"/>
            <xsl:sequence select="@context"/>
            <alias:if test="document-uri()">
              <alias:attribute name="document" select="document-uri()"/>
            </alias:if>
          </svrl:suppressed-rule>
          <alias:next-match>
            <alias:with-param name="schxslt:pattern" as="xs:string*" select="$schxslt:pattern"/>
          </alias:next-match>
        </alias:when>
        <alias:otherwise>
          <svrl:fired-rule>
            <xsl:sequence select="@id"/>
            <xsl:sequence select="@role"/>
            <xsl:sequence select="@flag"/>
            <xsl:sequence select="@context"/>
            <alias:if test="document-uri()">
              <alias:attribute name="document" select="document-uri()"/>
            </alias:if>
          </svrl:fired-rule>
          <xsl:apply-templates select="sch:let" mode="#current"/>
          <xsl:apply-templates select="sch:assert | sch:report" mode="#current"/>
          <alias:next-match>
            <alias:with-param name="schxslt:pattern" as="xs:string*" select="('{generate-id(..)}', $schxslt:pattern)"/>
          </alias:next-match>
        </alias:otherwise>
      </alias:choose>
    </alias:template>

  </xsl:template>

  <xsl:template match="sch:schema/sch:let" as="element(xsl:param)" mode="schxslt:transpile">
    <alias:param name="{@name}">
      <xsl:call-template name="schxslt:copy-in-scope-namespaces"/>
      <xsl:sequence select="@as"/>
      <xsl:choose>
        <xsl:when test="@value">
          <xsl:attribute name="select" select="@value"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:if test="not(@as)">
            <xsl:attribute name="as">node()*</xsl:attribute>
          </xsl:if>
          <xsl:apply-templates select="node()" mode="schxslt:copy-verbatim"/>
        </xsl:otherwise>
      </xsl:choose>
    </alias:param>
  </xsl:template>

  <xsl:template match="sch:let" as="element(xsl:variable)" mode="schxslt:transpile">
    <alias:variable name="{@name}">
      <xsl:call-template name="schxslt:copy-in-scope-namespaces"/>
      <xsl:sequence select="@as"/>
      <xsl:choose>
        <xsl:when test="@value">
          <xsl:attribute name="select" select="@value"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:if test="not(@as)">
            <xsl:attribute name="as">node()*</xsl:attribute>
          </xsl:if>
          <xsl:apply-templates select="node()" mode="schxslt:copy-verbatim"/>
        </xsl:otherwise>
      </xsl:choose>
    </alias:variable>
  </xsl:template>

  <xsl:template match="sch:assert" as="element(xsl:if)" mode="schxslt:transpile">
    <alias:if test="not({@test})">
      <xsl:call-template name="schxslt:copy-in-scope-namespaces"/>
      <alias:variable name="failed-assert" as="element(svrl:failed-assert)">
        <svrl:failed-assert>
          <xsl:call-template name="schxslt:failed-assertion-content"/>
        </svrl:failed-assert>
      </alias:variable>
      <alias:message  select="$failed-assert" error-code="schxslt:CatchFailEarly" terminate="yes" xsl:use-when="$schxslt:fail-early"/>
      <alias:sequence select="$failed-assert"/>
    </alias:if>
  </xsl:template>

  <xsl:template match="sch:report" as="element(xsl:if)" mode="schxslt:transpile">
    <alias:if test="{@test}">
      <xsl:call-template name="schxslt:copy-in-scope-namespaces"/>
      <alias:variable name="successful-report" as="element(svrl:successful-report)">
        <svrl:successful-report>
          <xsl:call-template name="schxslt:failed-assertion-content"/>
        </svrl:successful-report>
      </alias:variable>
      <alias:message  select="$successful-report" error-code="schxslt:CatchFailEarly" terminate="yes" xsl:use-when="$schxslt:fail-early"/>
      <alias:sequence select="$successful-report"/>
    </alias:if>
  </xsl:template>

  <xsl:template match="*" as="element()" mode="schxslt:copy-verbatim schxslt:copy-message-content">
    <xsl:element name="{local-name()}" namespace="{namespace-uri()}">
      <xsl:apply-templates select="@*" mode="#current"/>
      <xsl:apply-templates select="node()" mode="#current"/>
    </xsl:element>
  </xsl:template>

  <xsl:template match="xsl:copy-of[ancestor::sch:property]" as="element(xsl:copy-of)" mode="schxslt:copy-message-content">
    <xsl:copy>
      <xsl:call-template name="schxslt:copy-in-scope-namespaces"/>
      <xsl:sequence select="@*"/>
      <xsl:sequence select="node()"/>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="sch:name[@path]" as="element(xsl:value-of)" mode="schxslt:copy-message-content">
    <alias:value-of select="{@path}">
      <xsl:call-template name="schxslt:copy-in-scope-namespaces"/>
    </alias:value-of>
  </xsl:template>

  <xsl:template match="sch:name[not(@path)]" as="element(xsl:value-of)" mode="schxslt:copy-message-content">
    <alias:value-of select="name()"/>
  </xsl:template>

  <xsl:template match="sch:value-of" as="element(xsl:value-of)" mode="schxslt:copy-message-content">
    <alias:value-of select="{@select}"/>
  </xsl:template>

  <xsl:template name="schxslt:report-message" as="element(svrl:text)?">
    <xsl:if test="text() | *">
      <svrl:text>
        <xsl:sequence select="@xml:*"/>
        <xsl:apply-templates select="node()" mode="schxslt:copy-message-content"/>
      </svrl:text>
    </xsl:if>
  </xsl:template>

  <xsl:template name="schxslt:report-diagnostics" as="element(svrl:diagnostic-reference)*">
    <xsl:variable name="diagnostics" as="xs:string*" select="tokenize(normalize-space(@diagnostics))"/>
    <xsl:for-each select="if (../../sch:diagnostics) then key('schxslt:diagnosticById', $diagnostics, ../..) else key('schxslt:diagnosticById', $diagnostics, ancestor::sch:schema)">
      <svrl:diagnostic-reference diagnostic="{@id}">
        <svrl:text>
          <xsl:attribute name="xml:lang" select="schxslt:in-scope-language(.)"/>
          <xsl:sequence select="@xml:space"/>
          <xsl:sequence select="@see"/>
          <xsl:sequence select="@icon"/>
          <xsl:sequence select="@fpi"/>
          <xsl:apply-templates select="node()" mode="schxslt:copy-message-content"/>
        </svrl:text>
      </svrl:diagnostic-reference>
    </xsl:for-each>
  </xsl:template>

  <xsl:template name="schxslt:report-properties" as="element(svrl:property-reference)*">
    <xsl:variable name="properties" as="xs:string*" select="tokenize(normalize-space(@properties))"/>
    <xsl:for-each select="if (../../sch:properties) then key('schxslt:propertyById', $properties, ../..) else key('schxslt:propertyById', $properties, ancestor::sch:schema)">
      <svrl:property-reference property="{@id}">
        <xsl:sequence select="@role"/>
        <xsl:sequence select="@scheme"/>
        <svrl:text>
          <xsl:attribute name="xml:lang" select="schxslt:in-scope-language(.)"/>
          <xsl:sequence select="@xml:space"/>
          <xsl:sequence select="@see"/>
          <xsl:sequence select="@icon"/>
          <xsl:sequence select="@fpi"/>
          <xsl:apply-templates select="node()" mode="schxslt:copy-message-content"/>
        </svrl:text>
      </svrl:property-reference>
    </xsl:for-each>
  </xsl:template>

  <xsl:template name="schxslt:dispatch-validation-group" as="element(xsl:apply-templates)" use-when="not($schxslt:fail-early)">
    <xsl:param name="groupId" as="xs:string" required="yes"/>
    <alias:apply-templates select="." mode="{$groupId}"/>
  </xsl:template>

  <xsl:template name="schxslt:dispatch-validation-group" as="element(xsl:try)" use-when="$schxslt:fail-early">
    <xsl:param name="groupId" as="xs:string" required="yes"/>
    <alias:try>
      <alias:apply-templates select="." mode="{$groupId}"/>
      <alias:catch errors="schxslt:CatchFailEarly">
        <alias:sequence select="$err:value"/>
      </alias:catch>
    </alias:try>
  </xsl:template>

  <xsl:template name="schxslt:failed-assertion-content" as="node()+">
    <xsl:sequence select="@flag"/>
    <xsl:sequence select="@id"/>
    <xsl:sequence select="@role"/>
    <xsl:sequence select="@test"/>
    <xsl:attribute name="xml:lang" select="schxslt:in-scope-language(.)"/>
    <alias:attribute name="location" select="{($schxslt:location-function, 'path')[1]}(.)" xsl:use-when="not($schxslt:streamable) or exists($schxslt:location-function)"/>
    <xsl:call-template name="schxslt:report-diagnostics"/>
    <xsl:call-template name="schxslt:report-properties"/>
    <xsl:call-template name="schxslt:report-message"/>
  </xsl:template>

  <xsl:template name="schxslt:copy-in-scope-namespaces" as="namespace-node()*">
    <xsl:variable name="context" as="element()" select="."/>
    <xsl:for-each select="in-scope-prefixes($context)">
      <xsl:namespace name="{.}" select="namespace-uri-for-prefix(., $context)"/>
    </xsl:for-each>
  </xsl:template>

  <xsl:function name="schxslt:in-scope-language" as="xs:string?">
    <xsl:param name="context" as="node()"/>
    <xsl:value-of select="lower-case($context/ancestor-or-self::*[@xml:lang][1]/@xml:lang)"/>
  </xsl:function>

</xsl:transform>
