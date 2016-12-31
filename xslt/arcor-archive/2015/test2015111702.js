log('External script in HTML fragment created by XSLT');

function foo() {
  return 'function ' + arguments.callee.name + ' has been called.';
}