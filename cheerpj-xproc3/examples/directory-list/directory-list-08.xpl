<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:output port="result"/>

  <p:directory-list path="data" include-filter="\.xml$" max-depth="unbounded"/>
  <p:make-absolute-uris match="@name"/>

</p:declare-step>
