const mySyntaxChecker = new Worker('js/syntaxCheckWorker.js');

const timerDelay = 700;

var tid;

mySyntaxChecker.onmessage = function (evt) {
  setDocument(resultEditor, evt.data.error ? evt.data.message : '', 'text');
  checkSyntax();
}

function checkSyntax() {
  tid = setTimeout(function () { mySyntaxChecker.postMessage({ parse: true, xpathCode: xpathEditor.session.getValue() }) }, timerDelay);
}

function stopCheckingSyntax() {
  clearTimeout(tid);
}