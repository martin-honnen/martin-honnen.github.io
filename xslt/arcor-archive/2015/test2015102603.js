function displayResult(xmlUrl, xslUrl, targetElement) {
  var req = new XMLHttpRequest();
  req.open('GET', xmlUrl);
  try { req.responseType = "msxml-document"; } catch (e) {}
  req.onload = function() {
    var xmlDoc = req.responseXML;
    var req2 = new XMLHttpRequest();
    req2.open('GET', xslUrl);
    try { req2.responseType = "msxml-document"; } catch (e) {}
    req2.onload = function() {
      var xslDoc = req2.responseXML;
      if (typeof XSLTProcessor != 'undefined') {
        var proc = new XSLTProcessor();
        proc.importStylesheet(xslDoc);
        var frag = proc.transformToFragment(xmlDoc.documentElement, targetElement.ownerDocument);
        targetElement.appendChild(frag);
      }
      else if (typeof xmlDoc.transformNode != 'undefined') {
        targetElement.innerHTML = xmlDoc.documentElement.transformNode(xslDoc);
      }
    };
    req2.send();
  };
  req.send();
}
    