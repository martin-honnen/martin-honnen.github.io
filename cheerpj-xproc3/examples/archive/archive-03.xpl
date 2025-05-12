<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" xmlns:c="http://www.w3.org/ns/xproc-step" version="3.0" name="example">

  <p:input port="source" href="in1.xml"/>
  <p:output port="result"/>

  <p:identity name="manifest">
    <p:with-input>
      <c:archive>
        <c:entry name="test/extra.xml" href="test/in2.xml"/>
      </c:archive>
    </p:with-input>
  </p:identity>

  <p:variable name="relative-to" select="resolve-uri('.', static-base-uri())"/>
  <p:archive relative-to="{$relative-to}">
    <p:with-input pipe="source@example"/>
    <p:with-input port="manifest" pipe="result@manifest"/>
  </p:archive>

  <p:store href="tmp/result.zip"/>
  <p:archive-manifest relative-to="{$relative-to}"/>

</p:declare-step>
