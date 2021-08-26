var inputEditor, xsltEditor, resultEditor;

require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.27.0/min/vs' } });

window.MonacoEnvironment = {
  getWorkerUrl: function (workerId, label) {
    return 'js/my-loader.js';
  }
};

require(["vs/editor/editor.main"], () => {


  inputEditor = monaco.editor.create(document.getElementById('input-editor'), { language: 'xml', tabSize: 2, minimap: { enabled: false } });
  
  //inputEditor.session.setUseSoftTabs(true);

  xsltEditor = monaco.editor.create(document.getElementById('xslt-editor'), { language: 'xml', tabSize: 2, minimap : { enabled: false } });
  
  //xsltEditor.session.setUseSoftTabs(true);

  resultEditor = monaco.editor.create(document.getElementById('result-editor'), { language: 'xml', tabSize: 2, minimap : { enabled: false } });
  
  //resultEditor.session.setUseSoftTabs(true);

  load(document.location);
  
  window.addEventListener(
    'resize',
    function(evt) {
      inputEditor.layout();
      xsltEditor.layout();
      resultEditor.layout();
    }
  );
});
