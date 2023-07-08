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

var xsltCode = null;

var inputCode = null;

var inputType = null;

function initFilesFromGist(xsltFileName, inputFileName) {
   if (currentGist != null) {
     if (currentGist.files[xsltFileName])
       xsltCode = currentGist.files[xsltFileName].content;
     if (currentGist.files[inputFileName]) {
       inputCode = currentGist.files[inputFileName].content;
       inputType = currentGist.files[inputFileName].language;
     }
   }
}

async function getGist(gistId, xsltFileName, inputFileName) {
    const result = await request('GET /gists/{gist_id}', {
      gist_id: gistId,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    currentGist = result;
    initFilesFromGist(xsltFileName, inputFileName);
}

document.addEventListener(
  'DOMContentLoaded',
  () => {
    document.getElementById('loadGistBtn').addEventListener(
    'click',
    async () => {
      currentGist = await getGist(document.getElementById('gistId').value, document.getElementById('xsltFile').value, document.getElementById('inputFile').value);
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
    await getGist(sampleDefaults.gistId, sampleDefaults.xslt, sampleDefaults.input);
  }
  var searchParams = new URL(location).searchParams;
  if (searchParams.has("gistId") && searchParams.has("xsltFile")) {
    const gistId = searchParams.get('gistId');
    document.getElementById('gistId').value = gistId;
    const inputFileName = searchParams.get('inputFile');
    document.getElementById('inputFile').value = inputFile;
    const xsltFileName = searchParams.get('xsltFile');
    document.getElementById('xsltFile').value = xsltFile;
    const inputType = searchParams.get('input-type');

    currentGist = await getGist(gistId, xsltFileName, inputFileName);
  }

    setDocument(xsltEditor, xsltCode, 'xml');
    setDocument(inputEditor, inputCode, inputType === 'JSON' ? 'json' : inputType === 'HTML' ? 'html' : 'xml');

    document.getElementById('input-type-form').elements['input-type'].value = inputType;
}
  //else {
    //loadDefaults();
  //}
//}

await load(document.location);


