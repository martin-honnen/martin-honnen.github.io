function validate(xml, xsd, resultsSelect) {
  window.xml = xml;
  window.xsd = xsd;
  pyodide.runPython(`
import js
import xmlschema
from xmlschema import XMLSchema, XMLSchema11, iter_errors
schema_class = XMLSchema11
errors = list(iter_errors(xml, xsd, cls=schema_class))
result = 'XML is valid.' if not errors else 'XML is invalid:\\n' + '\\n'.join(map(lambda e: e.reason, errors))
js.setDocument(js.resultEditor, result, 'text');
js.console.log(result)
  `,
  {
    globals: pyoide.globals,
    locals: { xml: xml, xsd: xsd }
  });
}