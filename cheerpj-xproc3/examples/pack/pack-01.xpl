<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:output port="result"/>

  <p:pack wrapper="pair-wrapper">
    <p:with-input port="source">
      <source-doc-1/>
      <source-doc-2/>
    </p:with-input>
    <p:with-input port="alternate">
      <alternate-doc-1/>
      <alternate-doc-2/>
      <alternate-doc-3/>
    </p:with-input>
  </p:pack>

  <p:wrap-sequence wrapper="all-packed-results"/>

</p:declare-step>
