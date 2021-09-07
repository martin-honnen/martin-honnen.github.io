var xspecEditor = ace.edit('xspec-editor');
xspecEditor.session.setMode('ace/mode/xml');

xspecEditor.session.setTabSize(2);
xspecEditor.session.setUseSoftTabs(true);

var xsltEditor = ace.edit('xslt-editor');
xsltEditor.session.setMode('ace/mode/xml');

xsltEditor.session.setTabSize(2);
xsltEditor.session.setUseSoftTabs(true);

var resultEditor = ace.edit('result-editor');
resultEditor.session.setMode('ace/mode/html');

resultEditor.session.setTabSize(2);
resultEditor.session.setUseSoftTabs(true);