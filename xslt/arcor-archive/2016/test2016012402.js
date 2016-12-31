function addXsltResult(xsltNode, xmlInput, nodeToAddTo) {
  var proc = new XSLTProcessor();
  proc.importStylesheet(xsltNode);
  nodeToAddTo.appendChild(proc.transformToFragment(xmlInput, nodeToAddTo.ownerDocument));
}

function testXslt() {
  var doc = new DOMParser().parseFromString('<root/>', 'application/xml');
  var stylesheetRoot = document.getElementsByTagNameNS('http://www.w3.org/1999/XSL/Transform', 'stylesheet')[0];
  var nodeToAdd = document.body;
  addXsltResult(stylesheetRoot, doc, document.body);
}

document.addEventListener('DOMContentLoaded', testXslt, false);