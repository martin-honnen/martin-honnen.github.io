function setEditorFromUrl(url, editor) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function () {
        setDocument(editor, req.responseText, 'xml');
    };
    req.send();
}

function loadDefaults() {
  setEditorFromUrl('examples/defaults/default-saxonjs3.xml', inputEditor);
  setEditorFromUrl('examples/defaults/default.xsl', xsltEditor);
}


function save(form) {
  history.pushState(null, null, '?' + new URLSearchParams(
    {
      xslt: xsltEditor.session.getValue(),
      input: inputEditor.session.getValue(),
      'input-type': form.elements['input-type'].value
    }
  ).toString());
}

function load(location) {
  if (!location.search) {
    loadDefaults();
  }
  var searchParams = new URL(location).searchParams;
  if (searchParams.has("input") && searchParams.has("xslt") && searchParams.has("input-type")) {
    const inputCode = searchParams.get('input');
    const xsltCode = searchParams.get('xslt');
    const inputType = searchParams.get('input-type');

    setDocument(xsltEditor, xsltCode, 'xml');
    setDocument(inputEditor, inputCode, inputType === 'JSON' ? 'json' : inputType === 'HTML' ? 'html' : 'xml');

    document.getElementById('input-type-form').elements['input-type'].value = inputType;
  }
  else {
    loadDefaults();
  }
}

load(document.location);


