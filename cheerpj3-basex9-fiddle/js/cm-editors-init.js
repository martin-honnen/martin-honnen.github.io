if (document.getElementById('input-editor')) {
  // Prefix use in button ID naming
// Default : CMEditorPrefix
// More explanation on Buttons Section
var EditorPrefix = 'CMEditorPrefix';
// EditorSetting[ParentName]
var EditorSetting = {
'input-editor' : {
    // Global var to save editor doc into, if updatelistener is true
    // In wrapper will be : window[EditorSetting['editor']['data']]
    // Default : ParentName + "data"
    data: "editordoc",
    // Editor doc update listener, in miliseconds
    // Default : false
    updatelistener: 300,
    // Delay to update history button (Undo Redo), in miliseconds
    // Default : 10
    historydelay: 50,
    // Language of editor : text , html , javascript , css , json , php
    // Default : text (no language)
    lang: 'xml',
    // Snippets to be used in editor
    // Array : ['xml', 'javascript', 'jquery', 'php']
    snippets: ['xml', 'json'],
    // Default : DefaultTheme (Ace Cobalt)
    theme: 'DefaultTheme',
    // Enable extension
    extension: [ "cm6-texttolink" ],
    // IndenUnit default : 2
    indentunit: 2,
    // linewrap default : false
    linewrap: true,
    // lineNumbers default : true
    lineNumbers: true,
    // Default line where the cursor would be on editor load
    defaultline: 12,
    // readonly default : false
    readonly: 0,
    // KeyMap to be used : 'indentWithTab' , 'searchKeymap' , 'completionKeymap'
    keymap: ['indentWithTab', 'searchKeymap', 'completionKeymap'],
    control: {
	// Control button on panel
	// Default : False
	// panel: 'top' => Panel on top position of editor
	// panel: true => Panel on bottom position of editor
	// Show / hide panel button (Not the panel itself)
	// Default : true
	// List of buttons to add

	// Control button prepended into parent element
	// Default : False
	// Also as an amount of newline in between

	// Control button appended into parent element
	// Default : False
	// Also as an amount of newline in between

	// Control button added into certain element
	// Element will be emptied first => element.html('')
	// Default : False
    },
    // Add CSS Style into CodeMirror
    // Read more on https://codemirror.net/examples/styling/
}
};

}


if (document.getElementById('code-editor')) {
// Prefix use in button ID naming
// Default : CMEditorPrefix
// More explanation on Buttons Section
var EditorPrefix = 'CMEditorPrefix';
// EditorSetting[ParentName]
var EditorSetting = {
'code-editor' : {
    // Global var to save editor doc into, if updatelistener is true
    // In wrapper will be : window[EditorSetting['editor']['data']]
    // Default : ParentName + "data"
    data: "editordoc",
    // Editor doc update listener, in miliseconds
    // Default : false
    updatelistener: 300,
    // Delay to update history button (Undo Redo), in miliseconds
    // Default : 10
    historydelay: 50,
    // Language of editor : text , html , javascript , css , json , php
    // Default : text (no language)
    lang: 'xquery',
    // Snippets to be used in editor
    // Array : ['html', 'javascript', 'jquery', 'php']
    snippets: ['xquery', 'xml'],
    // Default : DefaultTheme (Ace Cobalt)
    theme: 'DefaultTheme',
    // Enable extension
    extension: [ "cm6-texttolink" ],
    // IndenUnit default : 2
    indentunit: 2,
    // linewrap default : false
    linewrap: true,
    // lineNumbers default : true
    lineNumbers: true,
    // Default line where the cursor would be on editor load
    defaultline: 12,
    // readonly default : false
    readonly: 0,
    // KeyMap to be used : 'indentWithTab' , 'searchKeymap' , 'completionKeymap'
    keymap: ['indentWithTab', 'searchKeymap', 'completionKeymap'],
    control: {
	// Control button on panel
	// Default : False
	// panel: 'top' => Panel on top position of editor
	// panel: true => Panel on bottom position of editor
        panel: 1,
	// Show / hide panel button (Not the panel itself)
	// Default : true
	panelshow: false,
	// List of buttons to add
        // 'history' , 'linewrap' , 'readonly' , 'indent' , 'selectall' , 'search' , 'lang' , 'theme'
	// Control button prepended into parent element
	// Default : False
	// Also as an amount of newline in between
	// Control button appended into parent element
	// Default : False
	// Also as an amount of newline in between
	// Control button added into certain element
	// Element will be emptied first => element.html('')
	// Default : False
    },
    // Add CSS Style into CodeMirror
    // Read more on https://codemirror.net/examples/styling/
}
};


}

// Prefix use in button ID naming
// Default : CMEditorPrefix
// More explanation on Buttons Section
var EditorPrefix = 'CMEditorPrefix';
// EditorSetting[ParentName]
var EditorSetting = {
'result-editor' : {
    // Global var to save editor doc into, if updatelistener is true
    // In wrapper will be : window[EditorSetting['editor']['data']]
    // Default : ParentName + "data"
    data: "editordoc",
    // Editor doc update listener, in miliseconds
    // Default : false
    updatelistener: 300,
    // Delay to update history button (Undo Redo), in miliseconds
    // Default : 10
    historydelay: 50,
    // Language of editor : text , html , javascript , css , json , php
    // Default : text (no language)
    lang: 'json',
    // Snippets to be used in editor
    // Array : ['html', 'javascript', 'jquery', 'php']
    snippets: ['html', 'javascript'],
    // Default : DefaultTheme (Ace Cobalt)
    theme: 'DefaultTheme',
    // Enable extension
    extension: [ "cm6-texttolink" ],
    // IndenUnit default : 2
    indentunit: 2,
    // linewrap default : false
    linewrap: true,
    // lineNumbers default : true
    lineNumbers: true,
    // Default line where the cursor would be on editor load
    defaultline: 12,
    // readonly default : false
    readonly: 0,
    // KeyMap to be used : 'indentWithTab' , 'searchKeymap' , 'completionKeymap'
    keymap: ['indentWithTab', 'searchKeymap', 'completionKeymap'],
    control: {
	// Control button on panel
	// Default : False
	// panel: 'top' => Panel on top position of editor
	// panel: true => Panel on bottom position of editor
	// Show / hide panel button (Not the panel itself)
	// Default : true
	// List of buttons to add
        // 'history' , 'linewrap' , 'readonly' , 'indent' , 'selectall' , 'search' , 'lang' , 'theme'
	// Control button prepended into parent element
	// Default : False
	// Also as an amount of newline in between

	// Control button appended into parent element
	// Default : False
	// Also as an amount of newline in between

	// Control button added into certain element
	// Element will be emptied first => element.html('')
	// Default : False

    },
    // Add CSS Style into CodeMirror
    // Read more on https://codemirror.net/examples/styling/

}
};
