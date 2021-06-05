var xmlEditor = ace.edit('xml-editor');
xmlEditor.session.setMode('ace/mode/xml');

xmlEditor.session.setTabSize(2);
xmlEditor.session.setUseSoftTabs(true);

xmlEditor.session.setValue('<root>This is an example.</root>');

//xmlEditor.setOption("enableEmmet", true);

xmlEditor.session.on('change', runAutoValidate);


var schematronEditor = ace.edit('schematron-editor');
schematronEditor.session.setMode('ace/mode/xml');

schematronEditor.session.setTabSize(2);
schematronEditor.session.setUseSoftTabs(true);

schematronEditor.session.setValue(`<schema xmlns="http://purl.oclc.org/dsdl/schematron" queryBinding="xslt3">
    <pattern>
        <rule context="root">
            <assert test="@*">root has no attributes.</assert>
            <report test=". = 'This is an example.'">root element has value 'This is an example.'</report>
        </rule>
    </pattern>
</schema`);

//schematronEditor.setOption("enableEmmet", true);

schematronEditor.session.on('change', runAutoValidate);


var resultEditor = ace.edit('result-editor');
resultEditor.session.setMode('ace/mode/xml');

resultEditor.session.setTabSize(2);
resultEditor.session.setUseSoftTabs(true);

