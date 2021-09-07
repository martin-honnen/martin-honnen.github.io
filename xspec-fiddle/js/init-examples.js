var xspecUrl, xsltUrl;

function setEditorFromUrl(url, editor) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function () {
        setDocument(editor, req.responseText, 'xml');
    };
    req.send();
}

function loadDefaults() {
  xspecUrl = '../xspec/samples/tutorial/escape-for-regex.xspec';
  setEditorFromUrl(xspecUrl, xspecEditor);
  xsltUrl = '../xspec/samples/tutorial/escape-for-regex.xsl';
  setEditorFromUrl(xsltUrl, xsltEditor);
}


function save(form) {
  history.pushState(null, null, '?' + new URLSearchParams(
    {
      xslt: xsltEditor.session.getValue(),
      xspec: xspec.session.getValue()
    }
  ).toString());
}

function load(location) {
  if (!location.search) {
    loadDefaults();
  }
  var searchParams = new URL(location).searchParams;
  if (searchParams.has("xspec") && searchParams.has("xslt")) {
    const xspecCode = searchParams.get('xspec');
    const xsltCode = searchParams.get('xslt');

    setDocument(xsltEditor, xsltCode, 'xml');
    setDocument(xspecEditor, xspecCode,'xml');

  }
  else {
    loadDefaults();
  }
}

load(document.location);



