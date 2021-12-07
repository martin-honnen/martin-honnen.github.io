const mySyntaxChecker = new Worker('js/syntaxCheckWorker.js');

const timerDelay = 1000;

var doSyntaxCheck = true;

var lastMessage = '';

var tid;

mySyntaxChecker.onmessage = function (evt) {
  if (evt.data.error) {
    lastMessage = evt.data.message;
    setDocument(resultEditor, lastMessage, 'text');
  }
  else if (lastMessage === resultEditor.session.getValue()) {
    setDocument(resultEditor, '', 'text');
  }
  checkSyntax();
}

function checkSyntax() {
  if (doSyntaxCheck) {
    if (tid) {
      clearTimeout(tid);
      mySyntaxChecker.postMessage({ parse: true, xpathCode: xpathEditor.session.getValue() });
    }
    tid = setTimeout(checkSyntax, timerDelay);
  }
}

function stopCheckingSyntax() {
  clearTimeout(tid);
}