function transform_xslt_1(xml, xslt, resultsSelect) {
  let localsMap = new Map();
  localsMap.set('xml', xml);
  localsMap.set('xslt', xslt);
  
  pyodide.runPython(`
import js
import lxml
from lxml import etree as ET
try:
    xml_tree = ET.fromstring(xml)
    xslt_tree = ET.fromstring(xslt)
    xslt_transformer = ET.XSLT(xslt_tree)
    transformation_result = xslt_transformer(xml_tree)
    result = str(transformation_result)
    js.setDocument(js.resultEditor, result, 'html');
    js.console.log(result)
except Exception as e:
    js.setDocument(js.resultEditor, f'Error: {e}', 'text')
  `,
  {
    globals: pyodide.globals,
    locals: localsMap
  });
}
