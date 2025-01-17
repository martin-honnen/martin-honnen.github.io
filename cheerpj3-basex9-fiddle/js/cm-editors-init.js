if (document.getElementById('input-editor')) {
  var inputEditor = CodeMirror(
    document.getElementById('input-editor'),
    { 
      mode : 'xml',
      lineNumber: true
    }
  );
    ;
//inputEditor.session.setMode('ace/mode/xml');

//inputEditor.session.setTabSize(2);
//inputEditor.session.setUseSoftTabs(true);
//inputEditor.setOption('placeholder', 'Enter your XML or JSON input data here...');
//inputEditor.session.on('change', autoEvaluate);

}


if (document.getElementById('code-editor')) {
var codeEditor = CodeMirror(
  document.getElementById('code-editor'),
  { 
    mode : 'xquery',
    lineNumber: true
  }
);
//codeEditor.session.setMode('ace/mode/xquery');

//codeEditor.session.setTabSize(2);
//codeEditor.session.setUseSoftTabs(true);
//codeEditor.setOption('placeholder', 'Enter your XQuery code here...');
//codeEditor.session.on('change', autoEvaluate);

}

var resultEditor = CodeMirror(
  document.getElementById('result-editor'),
  { 
    mode : 'xml',
    lineNumber: true
  }
);
//resultEditor.session.setMode('ace/mode/xml');

//resultEditor.session.setTabSize(2);
//resultEditor.session.setUseSoftTabs(true);
//resultEditor.setOption('placeholder', 'Results will appear here...');
