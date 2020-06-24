require('saxon-js');

SaxonJS.transform({
    'stylesheetFileName': 'static-base-uri-test1.sef',
    'destination': 'raw',
    'resultForm': 'xdm'
},
    'async').then(result => console.log(result))
    .catch(error => console.log(error));
