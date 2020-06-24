require('saxon-js');

SaxonJS.transform({
    'stylesheetFileName': 'json-doc-test-with-schedule-action-9.sef',
    'destination': 'raw',
    'resultForm': 'xdm'
},
    'async').then(result => console.log(result.resultDocuments))
    .catch(error => console.log(error));
