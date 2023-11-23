function setEditorFromUrl(url, editor) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function () {
        setDocument(editor, req.responseText, 'xml');
    };
    req.send();
}

function loadDefaults() {
    //setEditorFromUrl('examples/defaults/default.xml', inputEditor);
    //setEditorFromUrl('examples/defaults/default.xsl', codeEditor);
}


function save(form) {
    history.pushState(null, null, '?' + new URLSearchParams(
        {
            code: schematronEditor.session.getValue(),
            input: xmlEditor.session.getValue(),
            schxsltVersion: document.getElementById('schxsltVersionSelect').value
        }
    ).toString());
}

function load(location) {
    if (!location.search) {
        loadDefaults();
    }
    var searchParams = new URL(location).searchParams;
  
    if (searchParams.has("input") && searchParams.has("code")) {
        const inputCode = searchParams.get('input');
        const code = searchParams.get('code');
        const schxsltVersion = searchParams.get('schxsltVersion');

        setDocument(schematronEditor, code, 'xml');
        setDocument(xmlEditor, inputCode, 'xml');

        document.getElementById('schxsltVersionSelect').value = schxsltVersion;
    }
    else {
        loadDefaults();
    }
}

load(document.location);
