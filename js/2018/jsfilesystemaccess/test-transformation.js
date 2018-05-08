document.addEventListener(
  'DOMContentLoaded',
  function() {
    Promise
    .all([loadDoc('example-input.xml'), loadDoc('example-xslt.xsl')])
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