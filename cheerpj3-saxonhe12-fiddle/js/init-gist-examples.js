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

var code = null;

var codeType = null;

var inputCode = null;

var inputType = null;

var inputBaseURI = 'urn:from-string';

var codeBaseURI = 'urn:from-string';

function initFilesFromGist(codeFileName, inputFileName, codeFileType, inputFileType) {
   if (currentGist != null) {
     let files = Object.values(currentGist.data.files);
     if (currentGist.data.files[codeFileName]) {
       code = currentGist.data.files[codeFileName].content;
       codeType = currentGist.data.files[codeFileName].language;
       codeBaseURI = new URL('../' + codeFileName, currentGist.data.files[codeFileName].raw_url).href;
       gistBaseURI = new URL('..', currentGist.data.files[codeFileName].raw_url).href;
     }
     else {
       let firstCodeFile = files.find(file => file.language === codeFileType);
       if (firstCodeFile) {
         code = firstCodeFile.content;
         codeType = firstCodeFile.language;
         codeBaseURI = new URL('../' + firstCodeFile.filename, firstCodeFile.raw_url).href;
         gistBaseURI = new URL('..', firstCodeFile.raw_url).href;
       }
     }
     if (currentGist.data.files[inputFileName]) {
       inputCode = currentGist.data.files[inputFileName].content;
       inputType = currentGist.data.files[inputFileName].language;
       inputBaseURI = new URL('../' + inputFileName, currentGist.data.files[inputFileName].raw_url).href;
     }
     else {
       let firstInputFile = files.find(file => file.language === 'XML' || file.language === 'JSON');
       if (firstInputFile) {
         inputCode = firstInputFile.content;
         inputType = firstInputFile.language;
         inputBaseURI = new URL('../' + firstInputFile.filename, firstInputFile.raw_url).href;
       }
       else {
         inputCode = '';
         inputType = 'None';
       }
     }
   }
}

async function getGist(gistId, codeFileName, inputFileName, codeFileType, inputFileType) {
    const result = await request(`GET /gists/${gistId}`, {
      gist_id: gistId,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    currentGist = result;
    window.gistId = gistId,
    
    initFilesFromGist(codeFileName, inputFileName, codeFileType, inputFileType);
}

document.addEventListener(
  'DOMContentLoaded',
  () => {
    document.getElementById('loadGistBtn').addEventListener(
    'click',
    async () => {
      await getGist(document.getElementById('gistId').value, document.getElementById('codeFile').value, document.getElementById('inputFile').value, document.getElementById('input-type-form').elements['code-type'].value, document.getElementById('input-type-form').elements['input-type'].value);
      setDocument(codeEditor, code, codeType.toLowerCase());
      setDocument(inputEditor, inputCode, inputType === 'JSON' ? 'json' : inputType === 'HTML' ? 'html' : 'xml');

      document.getElementById('input-type-form').elements['input-type'].value = inputType;      
    }
    );
  }
);

const sampleDefaults = {
  gistId : '5564ed0897a7e28bd974a96a562fe886',
  code: 'resolve-uri-test1.xsl',
  codeType: 'XSLT',
  input: 'sample1.xml',
  inputType: 'XML'
};

async function loadDefaults() {
  //setEditorFromUrl('examples/defaults/default.xml', inputEditor);
  //setEditorFromUrl('examples/defaults/default.xsl', xsltEditor);
  document.getElementById('gistId').value = sampleDefaults.gistId;
  document.getElementById('codeFile').value = sampleDefaults.code;
  document.getElementById('inputFile').value = sampleDefaults.input;
  document.getElementById('input-type-form').elements['code-type'].value = sampleDefaults.codeType;
  document.getElementById('input-type-form').elements['input-type'].value = sampleDefaults.inputType;
  await getGist(sampleDefaults.gistId, sampleDefaults.code, sampleDefaults.input, sampleDefaults.codeType, sampleDefaults.inputType);
}


export function save(form) {
  history.pushState(null, null, '?' + new URLSearchParams(
    {
      gistId: document.getElementById('gistId').value,
      code: codeEditor.session.getValue(),
      input: inputEditor.session.getValue(),
      'input-type': form.elements['input-type'].value,
      'code-type': form.elements['code-type'].value,
      codeFile: document.getElementById('codeFile').value,
      inputFile: document.getElementById('inputFile').value
    }
  ).toString());
}

async function load(location) {
  if (!location.search) {
    await loadDefaults(); //getGist(sampleDefaults.gistId, sampleDefaults.code, sampleDefaults.input, 'XSLT');
  }
  var searchParams = new URL(location).searchParams;
  if (searchParams.has("gistId")) {
    const gistId = searchParams.get('gistId');
    document.getElementById('gistId').value = gistId;
    const inputFileName = searchParams.get('inputFile');
    document.getElementById('inputFile').value = inputFileName;
    const codeFileName = searchParams.get('codeFile');
    document.getElementById('codeFile').value = codeFileName;
    const inputType = searchParams.get('input-type');
    const codeType = searchParams.get('code-type');

    currentGist = await getGist(gistId, codeFileName, inputFileName, codeType, inputType);
  }

    setDocument(codeEditor, code, 'xml');
    setDocument(inputEditor, inputCode, inputType === 'JSON' ? 'json' : inputType === 'HTML' ? 'html' : 'xml');

    document.getElementById('input-type-form').elements['code-type'].value = codeType;
    document.getElementById('input-type-form').elements['input-type'].value = inputType;
}
  //else {
    //loadDefaults();
  //}
//}

await load(document.location);

