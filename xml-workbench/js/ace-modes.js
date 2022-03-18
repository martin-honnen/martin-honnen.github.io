var modes = {
    'xml': 'ace/mode/xml',
    'html': 'ace/mode/html',
    'xhtml': 'ace/mode/xml',
    'json': 'ace/mode/json',
    'text': 'ace/mode/text',
    'xquery': 'ace/mode/xquery'
};

var filetypes = {
    '.htm': 'html',
    '.html': 'html',
    '.xml': 'xml',
    '.xsl': 'xml',
    '.xslt': 'xml',
    '.xhtml' : 'xml',
    '.xquery' : 'xquery',
    '.xq' : 'xquery',
    '.json' : 'json'
};

function setDocument(editor, content, mode) {
    if (mode && modes[mode]) {
        editor.session.setMode(modes[mode]);
        editor.session.setUseWrapMode(mode === 'text');
    }
    editor.session.setValue(content);
}