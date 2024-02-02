import { fileOpen, directoryOpen, fileSave, supported } from 'https://cdn.jsdelivr.net/npm/browser-fs-access@0.35.0/+esm';// 'https://unpkg.com/browser-fs-access';

const xmlFiles = {
  description: 'XML files',
  mimeTypes: ['application/xml', 'text/xml', 'text/xsl', 'image/svg+xml', 'application/xslt+xml'],
  extensions: ['.xml', '.xsl', '.xslt', '.svg'],
  multiple: true
};

const textFiles = {
  description: 'Text files',
  mimeTypes: ['text/*'],
  extensions: ['.txt', '.text'],
  multiple: true
};

const jsonFiles = {
  description: 'JSON files',
  mimeTypes: ['application/json'],
  extensions: ['.json'],
  multiple: true
};

const htmlFiles = {
  description: 'HTML files',
  mimeTypes: ['text/html'],
  extensions: ['.htm', '.html'],
  multiple: true
};

export var openedInputFiles = [];

export var openedCodeFiles = [];

(async () => {
  const loadInputFilesBtn = document.getElementById('load-input');

  const loadDataFilesBtn = document.getElementById('load-xslt');

  const inputFilesSelect = document.getElementById('input-files');

  const xsltFilesSelect = document.getElementById('xslt-files');

  loadInputFilesBtn.addEventListener('click', async () => {
    try {
      openedInputFiles = await fileOpen([xmlFiles, jsonFiles, htmlFiles, textFiles]);
      inputFilesSelect.length = 0;
      for (const inputFile of openedInputFiles) {
        const option = new Option(inputFile.webkitRelativePath + inputFile.name, await inputFile.text());
        inputFilesSelect.appendChild(option);
      }
      inputFilesSelect.selectedIndex = 0;
      inputFilesSelect.onchange = function(evt) {
        console.log(this.value);
      }
    }
    catch (e) {
      console.error(e);
    }
  });

  loadDataFilesBtn.addEventListener('click', async () => {
    try {
      openedCodeFiles = await fileOpen([xmlFiles]);
      xsltFilesSelect.length = 0;
      for (const xsltFile of openedCodeFiles) {
        const option = new Option(xsltFile.webkitRelativePath + xsltFile.name, await inputFile.text());
        inputFilesSelect.appendChild(option);
      }
      inputFilesSelect.selectedIndex = 0;
      inputFilesSelect.onchange = function(evt) {
        console.log(this.value);
      }
    }
    catch (e) {
      console.err(e);
    }
  });
})();


