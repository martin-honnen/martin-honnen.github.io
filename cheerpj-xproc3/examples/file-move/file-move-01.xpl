<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0" xmlns:xpref="http://www.xtpxlib.nl/ns/xprocref">

  <p:output port="result"/>
  <p:group xpref:example-remove="true">
    <!-- Some preparations to make sure this operation is repeatable. Removing this means an empty line, so as it is spaced here 
         it will come out fine in the example. -->
    <p:file-delete href="build/x1-copied.xml" fail-on-error="false"/>
    <p:file-mkdir href="build/" fail-on-error="false"/>
    <p:file-copy href="data/x1-source.xml" target="data/x1.xml"/>
  </p:group>
  <p:file-move href="data/x1.xml" target="build/x1-copied.xml"/>

</p:declare-step>
