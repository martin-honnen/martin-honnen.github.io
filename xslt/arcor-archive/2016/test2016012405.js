function test(evt) {
  console.log(evt.type + ' fired.');
  document.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'body')[0].insertAdjacentHTML('beforeEnd', '<p>' + evt.type + ' fired.</p>');
}

document.addEventListener('DOMContentLoaded', test, false);
console.log('External script executed');