var inputEditor, xsltEditor, resultEditor;

require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.27.0/min/vs' } });

require(["vs/editor/editor.main"], () => {


  inputEditor = monaco.editor.create(document.getElementById('input-editor'), { language: 'xml' });
  //inputEditor.session.setMode('ace/mode/xml');

  //inputEditor.session.setTabSize(2);
  //inputEditor.session.setUseSoftTabs(true);

  xsltEditor = monaco.editor.create(document.getElementById('xslt-editor'), { language: 'xml' }); //ace.edit('xslt-editor');
  //xsltEditor.session.setMode('ace/mode/xml');

  //xsltEditor.session.setTabSize(2);
  //xsltEditor.session.setUseSoftTabs(true);

  resultEditor = monaco.editor.create(document.getElementById('result-editor'), { language: 'xml' }); //ace.edit('result-editor');
  //resultEditor.session.setMode('ace/mode/xml');

  //resultEditor.session.setTabSize(2);
  //resultEditor.session.setUseSoftTabs(true);

  load(document.location);
});