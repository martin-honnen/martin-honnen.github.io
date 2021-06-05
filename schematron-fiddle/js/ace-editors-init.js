var xmlEditor = ace.edit('input-editor');
xmlEditor.session.setMode('ace/mode/xml');

xmlEditor.session.setTabSize(2);
xmlEditor.session.setUseSoftTabs(true);

//xmlEditor.setOption("enableEmmet", true);

xmlEditor.session.on('change', runAutoValidate;


var schematronEditor = ace.edit('xslt-editor');
schematronEditor.session.setMode('ace/mode/xml');

schematronEditor.session.setTabSize(2);
schematronEditor.session.setUseSoftTabs(true);

//schematronEditor.setOption("enableEmmet", true);

schematronEditor.session.on('change', runAutoValidate);


var resultEditor = ace.edit('result-editor');
resultEditor.session.setMode('ace/mode/xml');

resultEditor.session.setTabSize(2);
resultEditor.session.setUseSoftTabs(true);

