if (document.getElementById('input-editor')) {
  var inputEditor = ace.edit('input-editor');
inputEditor.session.setMode('ace/mode/xml');

inputEditor.session.setTabSize(2);
inputEditor.session.setUseSoftTabs(true);
inputEditor.setOption('placeholder', 'Enter your XML or JSON input data here...');
inputEditor.session.on('change', autoEvaluate);

}


if (document.getElementById('code-editor')) {
var codeEditor = ace.edit('code-editor');
codeEditor.session.setMode('ace/mode/xml');

codeEditor.session.setTabSize(2);
codeEditor.session.setUseSoftTabs(true);
codeEditor.setOption('placeholder', 'Enter your XQuery code here...');
codeEditor.session.on('change', autoEvaluate);

}

var resultEditor = ace.edit('result-editor');
resultEditor.session.setMode('ace/mode/xml');

resultEditor.session.setTabSize(2);
resultEditor.session.setUseSoftTabs(true);
resultEditor.setOption('placeholder', 'Results will appear here...');
