<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source"/>
  <p:output port="result" pipe="result-uri@store-pdf"/>

  <p:css-formatter content-type="application/pdf">
    <p:with-input port="stylesheet" href="my-paged-media-stylesheet.css"/>
  </p:css-formatter>
  <p:store href="result.pdf" name="store-pdf"/>

</p:declare-step>
