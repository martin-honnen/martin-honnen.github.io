var inputEditor = ace.edit('input-editor');
inputEditor.session.setMode('ace/mode/xml');

inputEditor.session.setTabSize(2);
inputEditor.session.setUseSoftTabs(true);

var xsltEditor = ace.edit('xslt-editor');
xsltEditor.session.setMode('ace/mode/xml');

xsltEditor.session.setTabSize(2);
xsltEditor.session.setUseSoftTabs(true);

var resultEditor = ace.edit('result-editor');
resultEditor.session.setMode('ace/mode/xml');

resultEditor.session.setTabSize(2);
resultEditor.session.setUseSoftTabs(true);