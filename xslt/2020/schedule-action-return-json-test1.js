require('saxon-js');

SaxonJS.transform({
  'stylesheetFileName': 'schedule-action-return-json-test1.sef',
  'destination': 'raw',
  'resultForm': 'xdm',
  'deliverResultDocument': uri => {
    return { 'destination': 'raw' }
  }
},
  'async').then(result => console.log(result))
  .catch(error => console.log(error));
