function setEditorFromUrl(url, editor, type) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function () {
        setDocument(editor, req.responseText, type ? type : 'xml');
    };
    req.send();
}

function loadDefaults() {
    setEditorFromUrl('examples/xslt/function/fibonacci-memo-function-input.xml', inputEditor);
    setEditorFromUrl('examples/xslt/function/memo-function-fibonacci1.xsl', codeEditor);
}

function loadExample(codeSample, codeType, inputSample, inputType) {
  if (codeSample) {
    setEditorFromUrl(codeSample, codeEditor, codeType);
    document.getElementById('input-type-form').elements['code-type'].value = codeType;
  }

  if (inputSample) {
    setEditorFromUrl(inputSample, inputEditor, inputType);
    document.getElementById('input-type-form').elements['input-type'].value = inputType;
  }
}


function save(form) {
    history.pushState(null, null, '?' + new URLSearchParams(
        {
            code: codeEditor.session.getValue(),
            input: inputEditor.session.getValue(),
            'code-type' : form.elements['code-type'].value,
            'input-type': form.elements['input-type'].value,
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
        const codeType = searchParams.get('code-type');
        const inputType = searchParams.get('input-type');
        const autoEval = searchParams.get('auto-evaluate') === 'true';

        setDocument(codeEditor, code, codeType.toLocaleLowerCase());
        setDocument(inputEditor, inputCode, inputType === 'JSON' ? 'json' : inputType === 'HTML' ? 'html' : 'xml');

        document.getElementById('input-type-form').elements['code-type'].value = codeType;

        document.getElementById('input-type-form').elements['input-type'].value = inputType;

        document.getElementById('auto-evaluate').checked = autoEval;
    }
    else {
        loadDefaults();
    }
}

load(document.location);