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
     let files = Object.values(currentGist.data.files);
     if (currentGist.data.files[xsltFileName])
       xsltCode = currentGist.data.files[xsltFileName].content;
     else {
       let firstXsltFile = files.find(file => file.language === 'XSLT');
       if (firstXsltFile)
         xsltCode = firstXsltFile.content;
     }
     if (currentGist.data.files[inputFileName]) {
       inputCode = currentGist.data.files[inputFileName].content;
       inputType = currentGist.data.files[inputFileName].language;
     }
     else {
       let firstInputFile = files.find(file => file.language === 'XML' || file.language === 'JSON');
       if (firstInputFile) {
         inputCode = firstInputFile.content;
         inputType = firstInputFile.language;
       }
       else {
         inputCode = '';
         inputType = 'None';
       }
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
      await getGist(document.getElementById('gistId').value, document.getElementById('xsltFile').value, document.getElementById('inputFile').value);
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
  if (searchParams.has("gistId")) {
    const gistId = searchParams.get('gistId');
    document.getElementById('gistId').value = gistId;
    const inputFileName = searchParams.get('inputFile');
    document.getElementById('inputFile').value = inputFileName;
    const xsltFileName = searchParams.get('xsltFile');
    document.getElementById('xsltFile').value = xsltFileName;
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


