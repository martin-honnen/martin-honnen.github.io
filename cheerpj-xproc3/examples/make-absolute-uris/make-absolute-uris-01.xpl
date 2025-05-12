<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <URIs>
      <URI>image.jpg</URI>
      <URI>A/B/C/</URI>
      <URI>/image.jpg</URI>
      <URI>https://xprocref.org/index.html</URI>
    </URIs>
  </p:input>
  <p:output port="result"/>

  <p:make-absolute-uris match="URI" base-uri="file:///X/Y/Z/"/>

</p:declare-step>
