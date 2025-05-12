<schema xmlns="http://purl.oclc.org/dsdl/schematron" queryBinding="xslt2">

  <pattern>
    <rule context="thingref/@idref">
      <let name="id" value="string(.)"/>
      <assert test="exists(//thing[@id eq $id])">Reference to non-existent id: "<value-of select="$id"/>"</assert>
    </rule>
  </pattern>

</schema>
