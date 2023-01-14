function setEditorFromUrl(url, editor) {
  var req = new XMLHttpRequest();
  req.open('GET', url);
  req.onload = function () {
    setDocument(editor, req.responseText, 'xml');
  };
  req.send();
}

function loadDefaults() {
  setEditorFromUrl('examples/defaults/default-iXML.xml', inputEditor);
  setEditorFromUrl('examples/defaults/default-iXML.xp', xpathEditor);
}


function save(form) {
  history.pushState(null, null, '?' + new URLSearchParams(
    {
      xpath: xpathEditor.session.getValue(),
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
  if (searchParams.has("input") && searchParams.has("xpath") && searchParams.has("input-type")) {
    const inputCode = searchParams.get('input');
    const xpathCode = searchParams.get('xpath');
    const inputType = searchParams.get('input-type');

    setDocument(xpathEditor, xpathCode, 'xml');
    setDocument(inputEditor, inputCode, inputType === 'JSON' ? 'json' : inputType === 'HTML' ? 'html' : 'xml');

    document.getElementById('input-type-form').elements['input-type'].value = inputType;
  }
  else {
    loadDefaults();
  }
}

load(document.location);



