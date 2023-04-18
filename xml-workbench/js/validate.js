var pyodide = null

function validate(xml, xsd, resultsSelect) {
  window.xml = xml;
  window.xsd = xsd;
  pyodide.runPython(`
import js
import xmlschema
from xmlschema import XMLSchema, XMLSchema11, iter_errors
schema_class = XMLSchema11
errors = list(iter_errors(js.xml, js.xsd, cls=schema_class))
result = 'XML is valid.' if not errors else 'XML is invalid:\\n' + '\\n'.join(map(lambda e: e.reason, errors))
js.setDocument(resultEditor, result, 'text');
js.console.log(result)
  `);
}
