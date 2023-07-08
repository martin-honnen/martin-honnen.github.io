function setEditorFromUrl(url, editor) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function () {
        setDocument(editor, req.responseText, 'xml');
    };
    req.send();
}
  
import { request } from "https://esm.sh/@octokit/request";

var currentGist = null;

async function getGist(gistId) {
    const result = await request('GET /gists/{gist_id}', {
      gist_id: gistId,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    currentGist = result;
}

document.addEventListener(
  'DOMContentLoaded',
  () => {
    document.getElementById('loadGistBtn').addEventListener(
    'click',
    async () => {
      let result = await getGist(document.getElementById('gistId').value);
      console.log(result);
    }
    );
  }
);

const sampleDefaults = {
  gistId : '36da4adcf7f85665d2b9b006bd89ccf0',
  xslt: 'sheet1.xsl',
  input: 'sample1.xml'
};

async function loadDefaults() {
  //setEditorFromUrl('examples/defaults/default.xml', inputEditor);
  //setEditorFromUrl('examples/defaults/default.xsl', xsltEditor);
  await getGist(sampleDefaults.gistId);
}


function save(form) {
  history.pushState(null, null, '?' + new URLSearchParams(
    {
      gistId: document.getElementById('gistId').value,
      xslt: xsltEditor.session.getValue(),
      input: inputEditor.session.getValue(),
      'input-type': form.elements['input-type'].value
    }
  ).toString());
}

async function load(location) {
  if (!location.search) {
    await loadDefaults();
  }
  var searchParams = new URL(location).searchParams;
  if (searchParams.has("gistId") && searchParams.has("input") && searchParams.has("xslt") && searchParams.has("input-type")) {
    const gistId = searchParams.get('gistId');
    document.getElementById('gistId').value = gistId;
    const inputFile = searchParams.get('input');
    document.getElementById('inputFile').value = inputFile;
    const xsltFile = searchParams.get('xslt');
    document.getElementById('xsltFile').value = xsltFile;
    const inputType = searchParams.get('input-type');

    currentGist = await getGist(gistId);
  }

    const xsltCode = currentGist.files[xsltFile].content;
    const inputCode = currentGist.files[inputFile].content;

    setDocument(xsltEditor, xsltCode, 'xml');
    setDocument(inputEditor, inputCode, inputType === 'JSON' ? 'json' : inputType === 'HTML' ? 'html' : 'xml');

    document.getElementById('input-type-form').elements['input-type'].value = inputType;
  }
  //else {
    //loadDefaults();
  //}
}

await load(document.location);


