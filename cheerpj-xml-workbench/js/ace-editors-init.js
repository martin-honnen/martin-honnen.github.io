var inputEditor = ace.edit('input-editor');
inputEditor.session.setMode('ace/mode/xml');

inputEditor.session.setTabSize(2);
inputEditor.session.setUseSoftTabs(true);
inputEditor.setOption('placeholder', 'Enter your XML or JSON input data here...');

var codeEditor = ace.edit('code-editor');
codeEditor.session.setMode('ace/mode/xml');

codeEditor.session.setTabSize(2);
codeEditor.session.setUseSoftTabs(true);
codeEditor.setOption('placeholder', 'Enter your XSLT or XQuery or XPath or XSD code here...');

var resultEditor = ace.edit('result-editor');
resultEditor.session.setMode('ace/mode/xml');

resultEditor.session.setTabSize(2);
resultEditor.session.setUseSoftTabs(true);
resultEditor.setOption('placeholder', 'Results will appear here...');
