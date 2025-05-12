<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:output port="result"/>

  <p:file-copy href="data/" target="build/"/>
  <p:file-move href="build/data/" target="build/data-renamed/"/>

</p:declare-step>
