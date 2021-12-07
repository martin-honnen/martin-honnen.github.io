const mySyntaxChecker = new Worker('js/syntaxCheckWorker.js');

const timerDelay = 1000;

var doSyntaxCheck = true;

var lastMessage = '';

var tid;

mySyntaxChecker.onmessage = function (evt) {
  if (evt.data.error) {
    setDocument(resultEditor, evt.data.message, 'text');
  }
  else if (lastMessage === resultEditor.session.getValue()) {
    setDocument(resultEditor, '', 'text');
  }
  checkSyntax();
}

function checkSyntax() {
  if (doSyntaxCheck) {
    tid = setTimeout(function () { mySyntaxChecker.postMessage({ parse: true, xpathCode: xpathEditor.session.getValue() }) }, timerDelay);
  }
}

function stopCheckingSyntax() {
  clearTimeout(tid);
}