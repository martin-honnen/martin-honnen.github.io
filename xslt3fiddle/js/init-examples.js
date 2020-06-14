function setEditorFromUrl(url, editor) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function () {
        setDocument(editor, req.responseText, 'xml');
    };
    req.send();
}

setEditorFromUrl('examples/defaults/default.xml', inputEditor);
setEditorFromUrl('examples/defaults/default.xsl', xsltEditor);

