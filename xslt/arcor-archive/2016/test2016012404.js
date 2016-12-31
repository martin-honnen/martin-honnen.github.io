function test(evt) {
  console.log(evt.type + ' fired.');
  document.body.insertAdjacentHTML('beforeEnd', '<p>' + evt.type + ' fired.</p>');
}

document.addEventListener('DOMContentLoaded', test, false);
console.log('External script executed');