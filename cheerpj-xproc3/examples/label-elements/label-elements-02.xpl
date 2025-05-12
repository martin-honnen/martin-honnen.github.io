<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <movies>
      <movie title="Apocalypse now"/>
      <movie title="Dune" xml:id="1234"/>
    </movies>
  </p:input>
  <p:output port="result"/>

  <p:label-elements match="movie" label="generate-id() || '_' || replace(@title, '\s', '-')" replace="false"/>

</p:declare-step>
