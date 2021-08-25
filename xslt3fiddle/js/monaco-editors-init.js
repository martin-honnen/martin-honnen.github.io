var inputEditor = monaco.editor.create(document.getElementById('input-editor'), { language: 'xml' });
//inputEditor.session.setMode('ace/mode/xml');

//inputEditor.session.setTabSize(2);
//inputEditor.session.setUseSoftTabs(true);

var xsltEditor = monaco.editor.create(document.getElementById('xslt-editor'), { language: 'xml' }); //ace.edit('xslt-editor');
//xsltEditor.session.setMode('ace/mode/xml');

//xsltEditor.session.setTabSize(2);
//xsltEditor.session.setUseSoftTabs(true);

var resultEditor = monaco.editor.create(document.getElementById('result-editor'), { language: 'xml' }); //ace.edit('result-editor');
//resultEditor.session.setMode('ace/mode/xml');

//resultEditor.session.setTabSize(2);
//resultEditor.session.setUseSoftTabs(true);