importScripts('RExXPath31Fast.js');

var xpath31Parser;

onmessage = function (evt) {
  if (evt.data.parse) {
    try {
      xpath31Parser = new RExXPath31Fast(evt.data.xpathCode);
      xpath31Parser.parse_XPath();
      postMessage({ error: false });
    }
    catch (pe) {
      if (pe instanceof xpath31Parser.ParseException) {
        postMessage({ error: true, message: xpath31Parser.getErrorMessage(pe));
      }
    }
  }
};