var inputEditor = ace.edit('input-editor');
inputEditor.session.setMode('ace/mode/xml');

inputEditor.session.setTabSize(2);
inputEditor.session.setUseSoftTabs(true);

var xpathEditor = ace.edit('xpath-editor');
xpathEditor.session.setMode('ace/mode/xpath');

xpathEditor.session.setTabSize(2);
xpathEditor.session.setUseSoftTabs(true);

xpathEditor.session.on('change', function () {
  checkSyntax();
});

var resultEditor = ace.edit('result-editor');
resultEditor.session.setMode('ace/mode/xml');

resultEditor.session.setTabSize(2);
resultEditor.session.setUseSoftTabs(true);