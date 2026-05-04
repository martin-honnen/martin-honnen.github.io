function setEditorFromUrl(url, editor, type) {
  var req = new XMLHttpRequest();
  req.open('GET', url);
  req.onload = function () {
    setDocument(editor, req.responseText, type ? type : 'xml');
    if (editor === codeEditor) {
      samplesLoaded.codeLoaded = true;
    } else if (editor === inputEditor) {
      samplesLoaded.inputLoaded = true;
    }
  };
  req.send();
}

function loadDefaults() {
  samplesLoaded.codeLoaded = false;
  samplesLoaded.inputLoaded = false;
  samplesToEvaluate = true;
  samplesEvaluated = false;
  setEditorFromUrl('examples/defaults/default.xml', inputEditor);
  setEditorFromUrl('examples/defaults/default.xsl', codeEditor);
}

function loadExample(codeSample, codeType, inputSample, inputType) {
  samplesLoaded.codeLoaded = false;
  samplesLoaded.inputLoaded = false;
  samplesToEvaluate = true;
  samplesEvaluated = false;
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