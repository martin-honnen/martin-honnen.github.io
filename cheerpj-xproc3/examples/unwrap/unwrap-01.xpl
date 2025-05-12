<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <person>
      <name>
        <firstname>John</firstname>
        <lastname>Doe</lastname>
        <spouse>
          <name>
            <firstname>Clara</firstname>
            <lastname>Doe</lastname>
          </name>
        </spouse>
      </name>
    </person>
  </p:input>
  <p:output port="result"/>

  <p:unwrap match="name"/>

</p:declare-step>
