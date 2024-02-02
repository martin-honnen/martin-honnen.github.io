import { fileOpen, directoryOpen, fileSave, supported } from 'https://unpkg.com/browser-fs-access';

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

  loadInputFilesBtn.addEventListener('click', async () => {
    try {
      openedInputFiles = await fileOpen([xmlFiles, jsonFiles, htmlFiles, textFiles]);
      const firstInput = await openedInputFiles[0].text();
      console.log(firstInput);
    }
    catch (e) {
      console.err(e);
    }
  });
})();


