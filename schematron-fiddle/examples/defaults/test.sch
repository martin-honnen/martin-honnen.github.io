<schema xmlns="http://purl.oclc.org/dsdl/schematron" queryBinding="xslt3">
    <pattern>
        <rule context="root">
            <assert test="@*">root has no attributes.</assert>
            <report test=". = 'This is an example.'">root element has value 'This is an example.'</report>
        </rule>
    </pattern>
</schema>