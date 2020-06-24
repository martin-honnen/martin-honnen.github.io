require('saxon-js');

SaxonJS.transform(
  {
    'stylesheetFileName': 'return-xml-test1.sef',
    'destination': 'document',
    'resultForm': 'default',
    'deliverResultDocument': uri => {
      return {
        'destination': 'document',
        'save': (url, content, encoding) => {
          console.log(url);
          console.log(content);
        }
      }
    }
  },
  'async'
)
.then(result => console.log(result))
.catch(error => console.log(error));
