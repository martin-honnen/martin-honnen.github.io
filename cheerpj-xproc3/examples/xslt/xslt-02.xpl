<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <customers>
      <customer>
        <name>PXSLT Company Ltd</name>
      </customer>
    </customers>
  </p:input>
  <p:output port="result"/>

  <p:xslt parameters="map{'comment-text': 'Special comment text by parameter!'}">
    <p:with-input port="stylesheet" href="add-comment.xsl"/>
  </p:xslt>

</p:declare-step>
