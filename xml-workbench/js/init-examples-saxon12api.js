function setEditorFromUrl(url, editor) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function () {
        setDocument(editor, req.responseText, 'xml');
    };
    req.send();
}

function loadDefaults() {
    setEditorFromUrl('examples/defaults/default-saxon12api.xml', inputEditor);
    setEditorFromUrl('examples/defaults/default.xsl', codeEditor);
}


function save(form) {
    history.pushState(null, null, '?' + new URLSearchParams(
        {
            code: codeEditor.session.getValue(),
            input: inputEditor.session.getValue(),
            'code-type' : form.elements['code-type'].value,
            'input-type': form.elements['input-type'].value
        }
    ).toString());
}

function load(location) {
    if (!location.search) {
        loadDefaults();
    }
    var searchParams = new URL(location).searchParams;
    if (searchParams.has("input") && searchParams.has("code") && searchParams.has("input-type") && searchParams.has("code-type")) {
        const inputCode = searchParams.get('input');
        const code = searchParams.get('code');
        const codeType = searchParams.get('code-type');
        const inputType = searchParams.get('input-type');

        setDocument(codeEditor, code, codeType.toLocaleLowerCase());
        setDocument(inputEditor, inputCode, inputType === 'JSON' ? 'json' : inputType === 'HTML' ? 'html' : 'xml');

        document.getElementById('input-type-form').elements['code-type'].value = codeType;

        document.getElementById('input-type-form').elements['input-type'].value = inputType;
    }
    else {
        loadDefaults();
    }
}

load(document.location);