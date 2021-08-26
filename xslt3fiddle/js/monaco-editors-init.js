var inputEditorContainer, inputEditor, xsltEditorContainer, xsltEditor, resultEditorContainer, resultEditor;

require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.27.0/min/vs' } });

window.MonacoEnvironment = {
  getWorkerUrl: function (workerId, label) {
    return 'js/my-loader.js';
  }
};

require(["vs/editor/editor.main"], () => {

  inputEditorContainer = document.getElementById('input-editor');
  inputEditor = monaco.editor.create(inputEditorContainer, { language: 'xml', tabSize: 2, automaticLayout: true, minimap: { enabled: false } });
  
  //inputEditor.session.setUseSoftTabs(true);

  xsltEditorContainer = document.getElementById('xslt-editor');
  xsltEditor = monaco.editor.create(xsltEditorContainer, { language: 'xml', tabSize: 2, automaticLayout: true, minimap : { enabled: false } });
  
  //xsltEditor.session.setUseSoftTabs(true);

  resultEditorContainer = document.getElementById('result-editor');
  resultEditor = monaco.editor.create(resultEditorContainer, { language: 'xml', tabSize: 2, automaticLayout: true, minimap : { enabled: false } });
  
  //resultEditor.session.setUseSoftTabs(true);

  load(document.location);
  
  /*
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      if (entry.target === inputEditorContainer) {
        inputEditor.layout();
      }
      if (entry.target === xsltEditorContainer) {
        xsltEditor.layout();
      }
      if (entry.target === resultEditorContainer) {
        resultEditor.layout();
      }
    }
  });
                                            
  resizeObserver.observe(inputEditorContainer);
  resizeObserver.observe(xsltEditorContainer);
  resizeObserver.observe(resultEditorContainer);
  */
});
