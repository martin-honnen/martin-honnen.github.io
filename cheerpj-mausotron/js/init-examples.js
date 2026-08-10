function setEditorFromUrl(url, editor, type) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function () {
        setDocument(editor, req.responseText, type ? type : 'xml');
    };
    req.send();
}

function loadDefaults() {
    setEditorFromUrl('examples/defaults/default.xml', inputEditor);
    setEditorFromUrl('examples/defaults/default.sch', codeEditor);
}

function loadExample(codeSample, codeType, inputSample, inputType) {
  if (codeSample) {
    setEditorFromUrl(codeSample, codeEditor, codeType);
    codeBaseURI = new URL(codeSample, document.location).href;
    document.getElementById('input-type-form').elements['code-type'].value = codeType;
  }

  if (inputSample) {
    setEditorFromUrl(inputSample, inputEditor, inputType);
    inputBaseURI = new URL(inputSample, document.location).href;
    document.getElementById('input-type-form').elements['input-type'].value = inputType;
  }
}


function save(form) {
    history.pushState(null, null, '?' + new URLSearchParams(
        {
            code: codeEditor.session.getValue(),
            input: inputEditor.session.getValue(),
            'auto-evaluate' : document.getElementById('auto-evaluate').checked
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
        const autoEval = searchParams.get('auto-evaluate') === 'true';

        setDocument(codeEditor, code, 'xml');
        setDocument(inputEditor, inputCode, 'xml');

        document.getElementById('auto-evaluate').checked = autoEval;
    }
    else {
        loadDefaults();
    }
}

load(document.location);