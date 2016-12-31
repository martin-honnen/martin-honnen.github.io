function addXsltResult(xsltNode, xmlInput, nodeToAddTo) {
  console.log('addXsltResult called.');
  var proc = new XSLTProcessor();
  proc.importStylesheet(xsltNode);
  nodeToAddTo.appendChild(proc.transformToFragment(xmlInput, nodeToAddTo.ownerDocument));
}

function testXslt(evt) {
  console.log(evt.type + ' fired.');
  var doc = new DOMParser().parseFromString('<root/>', 'application/xml');
  var stylesheetRoot = document.getElementsByTagNameNS('http://www.w3.org/1999/XSL/Transform', 'stylesheet')[0];
  var nodeToAdd = document.body;
  addXsltResult(stylesheetRoot, doc, document.body);
}

document.addEventListener('DOMContentLoaded', testXslt, false);
console.log('External script loaded.');