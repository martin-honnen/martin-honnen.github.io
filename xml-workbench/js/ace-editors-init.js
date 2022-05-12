var inputEditor = ace.edit('input-editor');
inputEditor.session.setMode('ace/mode/xml');

inputEditor.session.setTabSize(2);
inputEditor.session.setUseSoftTabs(true);

var codeEditor = ace.edit('code-editor');
codeEditor.session.setMode('ace/mode/xml');

codeEditor.session.setTabSize(2);
codeEditor.session.setUseSoftTabs(true);

var resultEditor = ace.edit('result-editor');
resultEditor.session.setMode('ace/mode/xml');

resultEditor.session.setTabSize(2);
resultEditor.session.setUseSoftTabs(true);