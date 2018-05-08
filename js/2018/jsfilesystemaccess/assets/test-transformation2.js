document.addEventListener(
  'DOMContentLoaded',
  function() {
    Promise
    .all([loadDoc('assets/example-input.xml'), loadDoc('assets/example-xslt.xsl')])
    .then(data => {
      let xml = data[0];
      let xslt = data[1];
      let targetElement = document.getElementById('result');
      let resultFrag = createFragSpecification(xml, xslt, targetElement.ownerDocument);
      targetElement.appendChild(resultFrag);
    })
  },
  false
);