<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:output port="result"/>

  <p:directory-list path="data" max-depth="unbounded">
    <p:with-option name="include-filter" select="('\.xml$', '\.txt$')"/>
  </p:directory-list>

</p:declare-step>
