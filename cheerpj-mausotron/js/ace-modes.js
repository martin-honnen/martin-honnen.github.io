var modes = {
    'xml': 'ace/mode/xml',
};

var filetypes = {
    '.xml': 'xml',
    '.sch': 'xml'
};

function setDocument(editor, content, mode) {
    if (mode && modes[mode]) {
        editor.session.setMode(modes[mode]);
        editor.session.setUseWrapMode(mode === 'text');
    }
    editor.session.setValue(content);
}
