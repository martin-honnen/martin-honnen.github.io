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
<transform version="3.0" expand-text="yes" exclude-result-prefixes="schxslt sch xs" xpath-default-namespace="http://www.w3.org/1999/XSL/Transform"
               xmlns:alias="http://www.w3.org/1999/XSL/TransformAlias"
               xmlns:schxslt="http://dmaus.name/ns/2023/schxslt"
               xmlns:sch="http://purl.oclc.org/dsdl/schematron"
               xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
               xmlns:xs="http://www.w3.org/2001/XMLSchema"
               xmlns="http://www.w3.org/1999/XSL/Transform">

  <namespace-alias result-prefix="#default" stylesheet-prefix="alias"/>

  <param name="schxslt:debug" static="yes" select="false()">
    <!--
        Enable or disable debugging. When debugging is enable, the validation stylesheet is indented. Defaults to false.
    -->
  </param>

  <output indent="yes" use-when="$schxslt:debug"/>

  <variable name="schxslt:version" as="xs:string"
                select="if (starts-with('1.4.4', '$')) then 'development' else '1.4.4'"/>

  <param name="schxslt:phase" as="xs:string" select="'#DEFAULT'">
    <!--
        Name of the validation phase. The value '#DEFAULT' selects the pattern in the sch:schema/@defaultPhase attribute
        or '#ALL' if this attribute is not present. The value '#ALL' selects all patterns. Defaults to '#DEFAULT'.
    -->
  </param>

  <param name="schxslt:expand-text" as="xs:boolean" select="false()">
    <!--
        When set to boolean true, the validation stylesheet globally enables text value templates and you may use them
        in assertion or diagnostic messages. Defaults to false.
    -->
  </param>

  <param name="schxslt:streamable" as="xs:boolean" select="false()" static="yes">
    <!--
        Set to boolean true to create a streamable validation stylesheet. This *does not* check the streamability of
        XPath expressions in rules, assertions, variables etc. It merely declares the modes in the validation stylesheet
        to be streamable and removes the @location attribute from the SVRL output when no location function is given
        because the default fn:path() is not streamable. Defaults to false.
    -->
  </param>

  <param name="schxslt:location-function" as="xs:string?" select="()" static="yes">
    <!--
        Name of a function f($context as node()) as xs:string that provides location information for the SVRL
        report. Defaults to fn:path() when not set.
    -->
  </param>

  <param name="schxslt:fail-early" as="xs:boolean" select="false()" static="yes">
    <!--
        When set to boolean true, the validation stylesheet stops as soon as it encounters the first failed assertion
        or successful report. Defaults to false.
    -->
  </param>

  <param name="schxslt:terminate-validation-on-error" as="xs:boolean" select="true()" static="yes">
    <!--
        When set to boolean true, the validation stylesheet terminates the XSLT processor when it encounters a dynamic
        error. Defaults to true.
    -->
  </param>

  <param name="schxslt:report-active-pattern" as="xs:boolean" select="true()" static="yes">
    <!--
        When set to boolean true, the validation stylesheet reports active patterns and groups. Defaults to true.
    -->
  </param>

  <param name="schxslt:report-fired-rule" as="xs:boolean" select="true()" static="yes">
    <!--
        When set to boolean true, the validation stylesheet reports fired rules. Defaults to true.
    -->
  </param>

  <param name="schxslt:report-suppressed-rule" as="xs:boolean" select="true()" static="yes">
    <!--
        When set to boolean true, the validation stylesheet reports suppressed rules. Defaults to true.
    -->
  </param>

  <variable name="schxslt:avt-attributes" as="xs:QName*">
    <sequence select="QName('', 'role')"/>
    <sequence select="QName('', 'flag')"/>
    <sequence select="QName('', 'severity')"/>
  </variable>

  <variable name="schxslt:var-attributes" as="xs:QName*">
    <sequence select="QName('', 'role')"/>
    <sequence select="QName('', 'flag')"/>
    <sequence select="QName('', 'severity')"/>
  </variable>

  <mode name="schxslt:expand" on-no-match="shallow-copy"/>
  <mode name="schxslt:include" on-no-match="shallow-copy"/>
  <mode name="schxslt:preprocess" on-no-match="shallow-copy"/>
  <mode name="schxslt:transpile" on-no-match="shallow-skip"/>

  <mode on-no-match="shallow-skip"/>
  <mode name="schxslt:copy-verbatim" on-no-match="shallow-copy"/>
  <mode name="schxslt:copy-message-content" on-no-match="shallow-copy"/>

  <template match="sch:schema" as="element(Q{http://www.w3.org/1999/XSL/Transform}stylesheet)">

    <variable name="schema" as="element(sch:schema)">
      <apply-templates mode="schxslt:preprocess" select="."/>
    </variable>

    <apply-templates select="$schema" mode="schxslt:transpile"/>

  </template>

  <template match="sch:schema" as="element(sch:schema)" mode="schxslt:preprocess">
    <call-template name="schxslt:perform-expand">
      <with-param name="schema" as="element(sch:schema)">
        <call-template name="schxslt:perform-include">
          <with-param name="schema" as="element(sch:schema)" select="."/>
        </call-template>
      </with-param>
    </call-template>
  </template>

  <template name="schxslt:perform-include" as="element(sch:schema)">
    <param name="schema" as="element(sch:schema)" required="yes"/>
    <apply-templates select="$schema" mode="schxslt:include"/>
  </template>

  <template name="schxslt:perform-expand" as="element(sch:schema)">
    <param name="schema" as="element(sch:schema)" required="yes"/>
    <apply-templates select="$schema" mode="schxslt:expand"/>
  </template>

  <!-- Step 1: Include -->
  <template match="sch:include" as="element()" mode="schxslt:include">
    <variable name="external" as="element()" select="schxslt:load-external(@href)"/>
    <apply-templates select="$external" mode="#current">
      <with-param name="sourceLanguage" as="xs:string" select="schxslt:in-scope-language(.)"/>
      <with-param name="targetNamespaces" as="element(sch:ns)*" select="$external/ancestor::sch:schema/sch:ns"/>
    </apply-templates>
  </template>

  <template match="sch:library/sch:extends[@href]" as="node()*" mode="schxslt:include">
    <variable name="external" as="element()" select="schxslt:load-external(@href)"/>
    <if test="(namespace-uri($external) ne 'http://purl.oclc.org/dsdl/schematron') or (local-name($external) ne 'library')">
      <variable name="message" as="xs:string+">
        The @href attribute of a top-level &lt;extends&gt; element of a library must be an IRI reference to an external
        well-formed XML document or to an element in an external well-formed XML document that is a Schematron
        &lt;schema&gt; element. This @href points to a Q{{{namespace-uri($external)}}}{local-name($external)} element.
      </variable>
      <message terminate="yes">
        <text/>
        <value-of select="normalize-space(string-join($message))"/>
      </message>
    </if>
    <apply-templates select="$external/node()" mode="#current">
      <with-param name="sourceLanguage" select="schxslt:in-scope-language(.)"/>
      <with-param name="targetNamespaces" as="element(sch:ns)*" select="$external/../../sch:ns"/>
    </apply-templates>
  </template>

  <template match="sch:schema/sch:extends[@href]" as="node()*" mode="schxslt:include">
    <variable name="external" as="element()" select="schxslt:load-external(@href)"/>
    <if test="(namespace-uri($external) ne 'http://purl.oclc.org/dsdl/schematron') or (local-name($external) ne 'library')">
      <variable name="message" as="xs:string+">
        The @href attribute of a top-level &lt;extends&gt; element of a schema must be an IRI reference to an external
        well-formed XML document or to an element in an external well-formed XML document that is a Schematron
        &lt;schema&gt; element. This @href points to a Q{{{namespace-uri($external)}}}{local-name($external)} element.
      </variable>
      <message terminate="yes">
        <text/>
        <value-of select="normalize-space(string-join($message))"/>
      </message>
    </if>
    <apply-templates select="$external/node()" mode="#current">
      <with-param name="sourceLanguage" select="schxslt:in-scope-language(.)"/>
      <with-param name="targetNamespaces" as="element(sch:ns)*" select="$external/../../sch:ns"/>
    </apply-templates>
  </template>

  <template match="sch:rule/sch:extends[@href]" as="node()*" mode="schxslt:include">
    <variable name="external" as="element()" select="schxslt:load-external(@href)"/>
    <if test="(namespace-uri($external) ne 'http://purl.oclc.org/dsdl/schematron') or (local-name($external) ne 'rule')">
      <variable name="message" as="xs:string+">
        The @href attribute of an &lt;extends&gt; element of a rule must be an IRI reference to an external well-formed
        XML document or to an element in an external well-formed XML document that is a Schematron &lt;rule&gt;
        element. This @href points to a Q{{{namespace-uri($external)}}}{local-name($external)} element.
      </variable>
      <message terminate="yes">
        <text/>
        <value-of select="normalize-space(string-join($message))"/>
      </message>
    </if>
    <apply-templates select="$external/node()" mode="#current">
      <with-param name="sourceLanguage" select="schxslt:in-scope-language(.)"/>
      <with-param name="targetNamespaces" as="element(sch:ns)*" select="$external/../../sch:ns"/>
    </apply-templates>
  </template>

  <template match="*" mode="schxslt:include schxslt:expand">
    <param name="sourceLanguage" as="xs:string" select="schxslt:in-scope-language(.)"/>
    <param name="targetNamespaces" as="element(sch:ns)*"/>
    <variable name="inScopeLanguage" as="xs:string" select="schxslt:in-scope-language(.)"/>

    <copy>
      <for-each select="$targetNamespaces">
        <namespace name="{@prefix}" select="@uri"/>
      </for-each>
      <apply-templates select="@*" mode="#current"/>
      <if test="not(@xml:lang) and not($inScopeLanguage eq $sourceLanguage)">
        <attribute name="xml:lang" select="$inScopeLanguage"/>
      </if>
      <apply-templates select="node()" mode="#current"/>
    </copy>
  </template>

  <!-- Step 2: Expand -->
  <template match="sch:rule[@abstract = 'true'] | (sch:pattern | sch:group)[@abstract = 'true']" as="empty-sequence()" mode="schxslt:expand"/>

  <template match="sch:rule/sch:extends[@rule]" as="node()*" mode="schxslt:expand">
    <variable name="abstract-rule" as="element(sch:rule)*"
                  select="(../../sch:rule, ../../../sch:rules/sch:rule)[@abstract = 'true'][@id = current()/@rule]"/>
    <if test="empty($abstract-rule)">
      <variable name="message" as="xs:string+">
        The current pattern or schema defines no abstract rule named '{@rule}'.
      </variable>
      <message terminate="yes">
        <text/>
        <value-of select="normalize-space(string-join($message))"/>
      </message>
    </if>
    <apply-templates select="$abstract-rule/node()" mode="#current">
      <with-param name="sourceLanguage" as="xs:string" select="schxslt:in-scope-language(.)"/>
    </apply-templates>
  </template>

  <template match="(sch:pattern | sch:group)[@is-a]" as="element()" mode="schxslt:expand">
    <variable name="is-a" as="element()?" select="../(sch:pattern | sch:group)[local-name() = local-name(current())][@abstract = 'true'][@id = current()/@is-a]"/>
    <if test="empty($is-a)">
      <variable name="message" as="xs:string+">
        The current schema does not define an abstract {local-name()} with an id of '{@is-a}'.
      </variable>
      <message terminate="yes">
        <text/>
        <value-of select="normalize-space(string-join($message))"/>
      </message>
    </if>

    <!-- Check if all declared parameters are supplied -->
    <variable name="params-supplied" as="element(sch:param)*" select="sch:param"/>
    <variable name="params-declared" as="element(sch:param)*" select="$is-a/sch:param"/>
    <if test="exists($params-declared[empty(@value)][not(@name = $params-supplied/@name)])">
      <variable name="message" as="xs:string+">
        Some abstract pattern parameters of '{@is-a}' are declared but not supplied: {$params-declared[not(@name = $params-supplied/@name)]/@name}.
      </variable>
      <message terminate="yes">
        <text/>
        <value-of select="normalize-space(string-join($message))"/>
      </message>
    </if>
    <!-- Check if all supplied parameters are declared -->
    <if test="exists($params-declared) and exists($params-supplied[not(@name = $params-declared/@name)])">
      <variable name="message" as="xs:string+">
        Some abstract pattern parameters of '{@is-a}' are supplied but not declared: {$params-supplied[not(@name = $params-declared/@name)]/@name}.
      </variable>
      <message terminate="yes">
        <text/>
        <value-of select="normalize-space(string-join($message))"/>
      </message>
    </if>

    <variable name="instance" as="node()*">
      <apply-templates select="$is-a/node()" mode="#current">
        <with-param name="sourceLanguage" as="xs:string" select="schxslt:in-scope-language(.)"/>
        <with-param name="params" as="element(sch:param)*" select="($params-supplied, $params-declared[not(@name = $params-supplied/@name)][@value])" tunnel="yes"/>
      </apply-templates>
    </variable>

    <variable name="diagnostics" as="xs:string*" select="tokenize(string-join($instance[self::sch:rule]/sch:*/@diagnostics, ' '))"/>
    <variable name="properties" as="xs:string*" select="tokenize(string-join($instance[self::sch:rule]/sch:*/@properties, ' '))"/>

    <copy>
      <apply-templates select="@*" mode="#current">
        <with-param name="params" as="element(sch:param)*" select="sch:param" tunnel="yes"/>
      </apply-templates>
      <if test="empty(@documents)">
        <apply-templates select="$is-a/@documents" mode="#current">
          <with-param name="params" as="element(sch:param)*" select="sch:param" tunnel="yes"/>
        </apply-templates>
      </if>
      <if test="empty(@xml:lang) and (schxslt:in-scope-language(.) ne schxslt:in-scope-language($is-a))">
        <attribute name="xml:lang" select="schxslt:in-scope-language($is-a)"/>
      </if>
      <sequence select="$instance"/>
      <apply-templates select="node()" mode="#current"/>

      <if test="exists($diagnostics)">
        <element name="diagnostics" namespace="http://purl.oclc.org/dsdl/schematron">
          <apply-templates select="../sch:diagnostics/sch:diagnostic[@id = $diagnostics]" mode="#current">
            <with-param name="params" as="element(sch:param)*" select="sch:param" tunnel="yes"/>
          </apply-templates>
        </element>
      </if>
      <if test="exists($properties)">
        <element name="properties" namespace="http://purl.oclc.org/dsdl/schematron">
          <apply-templates select="../sch:properties/sch:property[@id = $properties]" mode="#current">
            <with-param name="params" as="element(sch:param)*" select="sch:param" tunnel="yes"/>
          </apply-templates>
        </element>
      </if>

    </copy>

  </template>

  <template match="sch:assert/@test | sch:report/@test | sch:rule/@context | sch:value-of/@select | (sch:pattern | sch:group)/@documents | sch:name/@path | sch:let/@value | Q{http://www.w3.org/1999/XSL/Transform}copy-of[ancestor::sch:property]/@select" mode="schxslt:expand">
    <param name="params" as="element(sch:param)*" tunnel="yes"/>
    <attribute name="{name()}" select="schxslt:replace-params(., $params)"/>
  </template>

  <function name="schxslt:replace-params" as="xs:string?">
    <param name="src" as="xs:string"/>
    <param name="params" as="element(sch:param)*"/>
    <choose>
      <when test="empty($params)">
        <value-of select="$src"/>
      </when>
      <otherwise>
        <variable name="paramsSorted" as="element(sch:param)*">
          <for-each select="$params">
            <sort select="string-length(@name)" order="descending"/>
            <sequence select="."/>
          </for-each>
        </variable>

        <variable name="value" select="replace(replace($paramsSorted[1]/@value, '\\', '\\\\'), '\$', '\\\$')"/>
        <variable name="src" select="replace($src, concat('(\W*)\$', $paramsSorted[1]/@name, '(\W*)'), concat('$1', $value, '$2'))"/>
        <value-of select="schxslt:replace-params($src, $paramsSorted[position() > 1])"/>
      </otherwise>
    </choose>
  </function>

  <!-- Step 3: Transpile -->
  <template match="sch:library" as="empty-sequence()" mode="schxslt:transpile">
    <message terminate="yes">This version of SchXslt2 does not transpile ISO Schematron libraries</message>
  </template>

  <template match="sch:schema" as="element(Q{http://www.w3.org/1999/XSL/Transform}stylesheet)" mode="schxslt:transpile">

    <variable name="phase" as="xs:string" select="if ($schxslt:phase = ('#DEFAULT', '')) then (@defaultPhase, '#ALL')[1] else $schxslt:phase"/>
    <if test="$phase eq '#ANY'">
      <variable name="message" as="xs:string+">
        This version of SchXslt2 does not support dynamic phase selection.
      </variable>
      <message terminate="yes">
        <text/>
        <value-of select="normalize-space(string-join($message))"/>
      </message>
    </if>

    <variable name="root" as="xs:string" select="(sch:phase[@id = $phase]/@from, 'root()')[1]"/>
    <variable name="patterns" as="map(xs:string, element()+)">
      <map>
        <for-each-group select="if ($phase = '#ALL') then (sch:pattern | sch:group) else (sch:pattern | sch:group)[@id = current()/sch:phase[@id = $phase]/sch:active/@pattern]" group-by="string(@documents)">
          <map-entry key="concat('group.', generate-id(current-group()[1]))" select="current-group()"/>
        </for-each-group>
      </map>
    </variable>

    <alias:stylesheet version="3.0" expand-text="{$schxslt:expand-text}">
      <for-each select="sch:ns">
        <namespace name="{@prefix}" select="@uri"/>
      </for-each>

      <alias:variable name="Q{{http://dmaus.name/ns/2023/schxslt}}phase" as="Q{{http://www.w3.org/2001/XMLSchema}}string" select="'{$phase}'"/>

      <apply-templates select="(sch:param, sch:let)" mode="#current"/>
      <apply-templates select="sch:phase[@id = $phase]/sch:let" mode="#current"/>

      <sequence select="Q{http://www.w3.org/1999/XSL/Transform}accumulator | Q{http://www.w3.org/1999/XSL/Transform}function | Q{http://www.w3.org/1999/XSL/Transform}include | Q{http://www.w3.org/1999/XSL/Transform}import | Q{http://www.w3.org/1999/XSL/Transform}import-schema | Q{http://www.w3.org/1999/XSL/Transform}key | Q{http://www.w3.org/1999/XSL/Transform}use-package"/>

      <variable name="accumulators" as="xs:string" select="string-join(Q{http://www.w3.org/1999/XSL/Transform}accumulator/@name, ' ')"/>

      <alias:mode use-accumulators="{$accumulators}"/>

      <for-each select="Q{http://www.w3.org/2005/xpath-functions/map}keys($patterns)">
        <alias:mode name="{.}" on-no-match="shallow-skip" streamable="{$schxslt:streamable}" use-accumulators="{$accumulators}"/>
        <alias:template match="*" mode="{.}" priority="-10">
          <alias:apply-templates select="@*" mode="#current"/>
          <alias:apply-templates select="node()" mode="#current"/>
        </alias:template>
        <apply-templates select="Q{http://www.w3.org/2005/xpath-functions/map}get($patterns, .)/sch:let" mode="#current"/>
        <apply-templates select="Q{http://www.w3.org/2005/xpath-functions/map}get($patterns, .)/sch:rule" mode="#current">
          <with-param name="group" as="xs:string" select="."/>
        </apply-templates>
      </for-each>

      <alias:template match="{$root}" as="element(svrl:schematron-output)">

        <svrl:schematron-output>
          <call-template name="schxslt:copy-attributes">
            <with-param name="attributes" as="attribute()*" select="(@schemaVersion, @schematronEdition)"/>
          </call-template>
          <attribute name="phase" select="$phase"/>
          <for-each select="sch:ns">
            <svrl:ns-prefix-in-attribute-values prefix="{@prefix}" uri="{@uri}"/>
          </for-each>

          <comment>SchXslt2 Core {$schxslt:version}</comment>

          <alias:try>
            <for-each select="Q{http://www.w3.org/2005/xpath-functions/map}keys($patterns)">
              <variable name="groupId" as="xs:string" select="."/>
              <for-each select="Q{http://www.w3.org/2005/xpath-functions/map}get($patterns, $groupId)">
                <element name="svrl:active-{local-name()}" use-when="$schxslt:report-active-pattern">
                  <call-template name="schxslt:copy-attributes">
                    <with-param name="attributes" as="attribute()*" select="(@id)"/>
                  </call-template>
                  <alias:attribute name="documents" select="{if (@documents) then @documents else 'document-uri(.)'}"/>
                </element>
              </for-each>

              <choose>
                <when test="Q{http://www.w3.org/2005/xpath-functions/map}get($patterns, $groupId)[1]/@documents">
                  <alias:for-each select="{Q{http://www.w3.org/2005/xpath-functions/map}get($patterns, $groupId)[1]/@documents}">
                    <alias:source-document href="{{.}}">
                      <alias:apply-templates select="." mode="{$groupId}"/>
                    </alias:source-document>
                  </alias:for-each>
                </when>
                <otherwise>
                  <alias:apply-templates select="." mode="{$groupId}"/>
                </otherwise>
              </choose>

            </for-each>
            <if test="$schxslt:fail-early">
              <alias:catch errors="Q{{http://dmaus.name/ns/2023/schxslt}}CatchFailEarly">
                <alias:sequence select="$Q{{http://www.w3.org/2005/xqt-errors}}value"/>
              </alias:catch>
            </if>
            <alias:catch>
              <svrl:error code="{{$Q{{http://www.w3.org/2005/xqt-errors}}code}}">
                <alias:if test="document-uri()">
                  <alias:attribute name="document" select="document-uri()"/>
                </alias:if>
                <alias:if test="$Q{{http://www.w3.org/2005/xqt-errors}}description">
                  <alias:value-of select="$Q{{http://www.w3.org/2005/xqt-errors}}description"/>
                </alias:if>
              </svrl:error>
              <if test="$schxslt:terminate-validation-on-error">
                <alias:variable name="message" as="Q{{http://www.w3.org/2001/XMLSchema}}string+" expand-text="yes">
                  Running the ISO Schematron validation failed with a dynamic error.
                  Error code: {{$Q{{http://www.w3.org/2005/xqt-errors}}code}} Reason: {{$Q{{http://www.w3.org/2005/xqt-errors}}description}}
                </alias:variable>
                <alias:message terminate="yes" error-code="Q{{{{http://dmaus.name/ns/2023/schxslt}}}}ValidationError">
                  <alias:text/>
                  <alias:value-of select="normalize-space(string-join($message))"/>
                </alias:message>
              </if>
            </alias:catch>
          </alias:try>
        </svrl:schematron-output>

      </alias:template>

    </alias:stylesheet>

  </template>

  <template match="sch:rule[parent::sch:group]" as="element(Q{http://www.w3.org/1999/XSL/Transform}template)" mode="schxslt:transpile">
    <param name="group" as="xs:string" required="yes"/>

    <alias:template match="{@context}" mode="{$group}" priority="{last() - position()}">
      <alias:param name="Q{{http://dmaus.name/ns/2023/schxslt}}pattern" as="Q{{http://www.w3.org/2001/XMLSchema}}string*" select="()"/>
      <alias:variable name="Q{{http://dmaus.name/ns/2023/schxslt}}rule-context" as="node()" select="."/>
      <element name="svrl:fired-rule" use-when="$schxslt:report-fired-rule">
        <call-template name="schxslt:copy-attributes">
          <with-param name="attributes" as="attribute()*" select="(@id, @role, @flag, @visit-each, @context)"/>
        </call-template>
        <alias:if test="document-uri()">
          <alias:attribute name="document" select="document-uri()"/>
        </alias:if>
      </element>
      <alias:for-each select="{(@visit-each, '.')[1]}">
        <apply-templates select="sch:let" mode="#current"/>
        <apply-templates select="sch:assert | sch:report" mode="#current"/>
      </alias:for-each>
      <alias:next-match>
        <alias:with-param name="Q{{http://dmaus.name/ns/2023/schxslt}}pattern" as="Q{{http://www.w3.org/2001/XMLSchema}}string*" select="$Q{{http://dmaus.name/ns/2023/schxslt}}pattern"/>
      </alias:next-match>
    </alias:template>
  </template>

  <template match="sch:rule[parent::sch:pattern]" as="element(Q{http://www.w3.org/1999/XSL/Transform}template)" mode="schxslt:transpile">
    <param name="group" as="xs:string" required="yes"/>

    <alias:template match="{@context}" mode="{$group}" priority="{last() - position()}">
      <alias:param name="Q{{http://dmaus.name/ns/2023/schxslt}}pattern" as="Q{{http://www.w3.org/2001/XMLSchema}}string*" select="()"/>
      <alias:variable name="Q{{http://dmaus.name/ns/2023/schxslt}}rule-context" as="node()" select="."/>
      <alias:choose>
        <alias:when test="'{generate-id(..)}' = $Q{{http://dmaus.name/ns/2023/schxslt}}pattern">
          <element name="svrl:suppresed-rule" use-when="$schxslt:report-suppressed-rule">
            <call-template name="schxslt:copy-attributes">
              <with-param name="attributes" as="attribute()*" select="(@id, @role, @flag, @visit-each, @context)"/>
            </call-template>
            <alias:if test="document-uri()">
              <alias:attribute name="document" select="document-uri()"/>
            </alias:if>
          </element>
          <alias:next-match/>
        </alias:when>
        <alias:otherwise>
          <element name="svrl:fired-rule" use-when="$schxslt:report-fired-rule">
            <call-template name="schxslt:copy-attributes">
              <with-param name="attributes" as="attribute()*" select="(@id, @role, @flag, @visit-each, @context)"/>
            </call-template>
            <alias:if test="document-uri()">
              <alias:attribute name="document" select="document-uri()"/>
            </alias:if>
          </element>
          <alias:for-each select="{(@visit-each, '.')[1]}">
            <apply-templates select="sch:let" mode="#current"/>
            <apply-templates select="sch:assert | sch:report" mode="#current"/>
          </alias:for-each>
          <alias:next-match>
            <alias:with-param name="Q{{http://dmaus.name/ns/2023/schxslt}}pattern" as="Q{{http://www.w3.org/2001/XMLSchema}}string*" select="('{generate-id(..)}', $Q{{http://dmaus.name/ns/2023/schxslt}}pattern)"/>
          </alias:next-match>
        </alias:otherwise>
      </alias:choose>
    </alias:template>

  </template>

  <template match="sch:schema/sch:let | sch:schema/sch:param" as="element(Q{http://www.w3.org/1999/XSL/Transform}param)" mode="schxslt:transpile">
    <alias:param name="{@name}">
      <call-template name="schxslt:copy-attributes">
        <with-param name="attributes" as="attribute()*" select="(@as)"/>
      </call-template>
      <choose>
        <when test="@value">
          <attribute name="select" select="@value"/>
        </when>
        <otherwise>
          <if test="not(@as)">
            <attribute name="as">node()*</attribute>
          </if>
          <apply-templates select="node()" mode="schxslt:copy-verbatim"/>
        </otherwise>
      </choose>
    </alias:param>
  </template>

  <template match="sch:let" as="element(Q{http://www.w3.org/1999/XSL/Transform}variable)" mode="schxslt:transpile">
    <alias:variable name="{@name}">
      <call-template name="schxslt:copy-attributes">
        <with-param name="attributes" as="attribute()*" select="(@as)"/>
      </call-template>
      <choose>
        <when test="@value">
          <attribute name="select" select="@value"/>
        </when>
        <otherwise>
          <if test="not(@as)">
            <attribute name="as">node()*</attribute>
          </if>
          <apply-templates select="node()" mode="schxslt:copy-verbatim"/>
        </otherwise>
      </choose>
    </alias:variable>
  </template>

  <template match="sch:assert" as="element(Q{http://www.w3.org/1999/XSL/Transform}if)" mode="schxslt:transpile">
    <alias:if test="not({@test})">
      <alias:variable name="failed-assert" as="element(svrl:failed-assert)">
        <svrl:failed-assert>
          <call-template name="schxslt:failed-assertion-content"/>
        </svrl:failed-assert>
      </alias:variable>
      <if test="$schxslt:fail-early">
        <alias:message  select="$failed-assert" error-code="Q{{http://dmaus.name/ns/2023/schxslt}}CatchFailEarly" terminate="yes"/>
      </if>
      <alias:sequence select="$failed-assert"/>
    </alias:if>
  </template>

  <template match="sch:report" as="element(Q{http://www.w3.org/1999/XSL/Transform}if)" mode="schxslt:transpile">
    <alias:if test="{@test}">
      <alias:variable name="successful-report" as="element(svrl:successful-report)">
        <svrl:successful-report>
          <call-template name="schxslt:failed-assertion-content"/>
        </svrl:successful-report>
      </alias:variable>
      <if test="$schxslt:fail-early">
        <alias:message  select="$successful-report" error-code="Q{{http://dmaus.name/ns/2023/schxslt}}CatchFailEarly" terminate="yes"/>
      </if>
      <alias:sequence select="$successful-report"/>
    </alias:if>
  </template>

  <template match="sch:dir" as="element(svrl:dir)" mode="schxslt:copy-message-content">
    <svrl:dir>
      <if test="@value">
        <attribute name="dir" select="@value"/>
      </if>
      <sequence select="@xml:*"/>
      <apply-templates select="node()" mode="#current"/>
    </svrl:dir>
  </template>

  <template match="sch:emph" as="element(svrl:emph)" mode="schxslt:copy-message-content">
    <svrl:emph>
      <sequence select="@xml:*"/>
      <apply-templates select="node()" mode="#current"/>
    </svrl:emph>
  </template>

  <template match="sch:span" as="element(svrl:span)" mode="schxslt:copy-message-content">
    <svrl:span>
      <sequence select="@class, @xml:*"/>
      <apply-templates select="node()" mode="#current"/>
    </svrl:span>
  </template>

  <template match="*" as="element()" mode="schxslt:copy-verbatim schxslt:copy-message-content">
    <alias:element name="{local-name()}" namespace="{namespace-uri()}">
      <apply-templates select="@*" mode="#current"/>
      <apply-templates select="node()" mode="#current"/>
    </alias:element>
  </template>

  <template match="@*" as="element()" mode="schxslt:copy-verbatim schxslt:copy-message-content">
    <alias:attribute name="{local-name()}" namespace="{namespace-uri()}">{.}</alias:attribute>
  </template>

  <template match="Q{http://www.w3.org/1999/XSL/Transform}copy-of[ancestor::sch:property]" as="element(Q{http://www.w3.org/1999/XSL/Transform}copy-of)" mode="schxslt:copy-message-content">
    <copy>
      <sequence select="@*"/>
      <sequence select="node()"/>
    </copy>
  </template>

  <template match="sch:name[@path]" as="element(Q{http://www.w3.org/1999/XSL/Transform}value-of)" mode="schxslt:copy-message-content">
    <alias:value-of select="{@path}"/>
  </template>

  <template match="sch:name[not(@path)]" as="element(Q{http://www.w3.org/1999/XSL/Transform}value-of)" mode="schxslt:copy-message-content">
    <alias:value-of select="name()"/>
  </template>

  <template match="sch:value-of" as="element(Q{http://www.w3.org/1999/XSL/Transform}value-of)" mode="schxslt:copy-message-content">
    <alias:value-of select="{@select}"/>
  </template>

  <template name="schxslt:report-message" as="element(svrl:text)?">
    <if test="text() | *">
      <svrl:text>
        <sequence select="@xml:*"/>
        <apply-templates select="node()" mode="schxslt:copy-message-content"/>
      </svrl:text>
    </if>
  </template>

  <template name="schxslt:report-diagnostics" as="element(svrl:diagnostic-reference)*">
    <variable name="diagnostics" as="xs:string*" select="tokenize(normalize-space(@diagnostics))"/>
    <for-each select="(../../sch:diagnostics, ../../../sch:diagnostics)[1]/sch:diagnostic[@id = $diagnostics]">
      <svrl:diagnostic-reference diagnostic="{schxslt:protect-curlies(@id)}">
        <svrl:text>
          <if test="schxslt:in-scope-language(.) ne schxslt:in-scope-language(ancestor::sch:schema)">
            <attribute name="xml:lang" select="schxslt:in-scope-language(.)"/>
          </if>
          <sequence select="@xml:space"/>
          <call-template name="schxslt:copy-attributes">
            <with-param name="attributes" as="attribute()*" select="(@see, @icon, @fpi)"/>
          </call-template>
          <apply-templates select="node()" mode="schxslt:copy-message-content"/>
        </svrl:text>
      </svrl:diagnostic-reference>
    </for-each>
  </template>

  <template name="schxslt:report-properties" as="element(svrl:property-reference)*">
    <variable name="properties" as="xs:string*" select="tokenize(normalize-space(@properties))"/>
    <for-each select="(../../sch:properties, ../../../sch:properties)[1]/sch:property[@id = $properties]">
      <svrl:property-reference property="{schxslt:protect-curlies(@id)}">
        <call-template name="schxslt:copy-attributes">
          <with-param name="attributes" as="attribute()*" select="(@role, @scheme)"/>
        </call-template>
        <svrl:text>
          <if test="schxslt:in-scope-language(.) ne schxslt:in-scope-language(ancestor::sch:schema)">
            <attribute name="xml:lang" select="schxslt:in-scope-language(.)"/>
          </if>
          <sequence select="@xml:space"/>
          <call-template name="schxslt:copy-attributes">
            <with-param name="attributes" as="attribute()*" select="(@see, @icon, @fpi)"/>
          </call-template>
          <apply-templates select="node()" mode="schxslt:copy-message-content"/>
        </svrl:text>
      </svrl:property-reference>
    </for-each>
  </template>

  <template name="schxslt:failed-assertion-content" as="node()+">
    <call-template name="schxslt:copy-attributes">
      <with-param name="attributes" as="attribute()*" select="(@flag, @id, @role, @severity, @test)"/>
    </call-template>
    <if test="schxslt:in-scope-language(.) ne schxslt:in-scope-language(ancestor::sch:schema)">
      <attribute name="xml:lang" select="schxslt:in-scope-language(.)"/>
    </if>
    <if test="not($schxslt:streamable) or exists($schxslt:location-function)">
      <!-- The variable schxslt:rule-context will be available at this part of the validation stylesheet. -->
      <alias:attribute name="location" select="{($schxslt:location-function, 'path')[1]}($Q{{http://dmaus.name/ns/2023/schxslt}}rule-context)"/>
    </if>
    <call-template name="schxslt:report-diagnostics"/>
    <call-template name="schxslt:report-properties"/>
    <call-template name="schxslt:report-message"/>
  </template>

  <template name="schxslt:copy-attributes" as="attribute()*">
    <param name="attributes" as="attribute()*" required="yes"/>
    <for-each select="$attributes">
      <attribute name="{name()}">
        <choose>
          <when test="(node-name() = $schxslt:var-attributes) and starts-with(normalize-space(), '$') and (substring(normalize-space(), 2) castable as xs:Name)">
            <value-of select="concat('{', normalize-space(), '}')"/>
          </when>
          <when test="node-name() = $schxslt:avt-attributes">
            <value-of select="."/>
          </when>
          <otherwise>
            <value-of select="schxslt:protect-curlies(.)"/>
          </otherwise>
        </choose>
      </attribute>
    </for-each>
  </template>

  <function name="schxslt:in-scope-language" as="xs:string?">
    <param name="context" as="node()"/>
    <value-of select="lower-case($context/ancestor-or-self::*[@xml:lang][1]/@xml:lang)"/>
  </function>

  <function name="schxslt:protect-curlies" as="xs:string">
    <param name="value" as="xs:string"/>
    <value-of select="$value => replace('\{', '{{') => replace('\}', '}}')"/>
  </function>

  <function name="schxslt:load-external" as="element()">
    <param name="href" as="attribute(href)"/>

    <variable name="uriParts" as="xs:string+" select="tokenize(string($href), '#')"/>
    <variable name="document" as="document-node()" select="document($uriParts[1], $href)"/>

    <choose>
      <when test="count($uriParts) gt 1">
        <variable name="elements" as="element()*" select="(id($uriParts[2], $document), $document//sch:*[@id = $uriParts[2]])"/>
        <if test="count($elements) eq 0">
          <variable name="message" as="xs:string+">
            The URI {string($href)} does not point to an element.
          </variable>
          <message terminate="yes">
            <text/>
            <value-of select="normalize-space(string-join($message))"/>
          </message>
        </if>
        <if test="count($elements) gt 1">
          <variable name="message" as="xs:string+">
            The URI {string($href)} points to more than one element.
          </variable>
          <message terminate="yes">
            <text/>
            <value-of select="normalize-space(string-join($message))"/>
          </message>
        </if>
        <sequence select="$elements"/>
      </when>
      <otherwise>
        <sequence select="$document/*[1]"/>
      </otherwise>
    </choose>
  </function>

</transform>
