<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>XSLT example</title>
  <script src="async-load-transform.js"></script>
</head>
<body>
  <h1>XSLT example</h1>
  <section id="xslt-target"></section>
  <script>
  document.addEventListener(
    'DOMContentLoaded',
    function(evt) {
      transform('test2019062901.xml', 'test2019062902.xsl', { groupSize: 3 }, document.getElementById('xslt-target'));
    },
    false
  );
  </script>
</body>
</html>
