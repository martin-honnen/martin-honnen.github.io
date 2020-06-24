require('saxon-js');

SaxonJS.transform(
  {
    'stylesheetFileName': 'schedule-action-return-xml-test1.sef',
    'destination': 'document',
    'resultForm': 'default',
    'deliverResultDocument': uri => {
      return { 'destination': 'document' }
    }
  },
  'async')
  .then(result => console.log(result))
  .catch(error => console.log(error));
