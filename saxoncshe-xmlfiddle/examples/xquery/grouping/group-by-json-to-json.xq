declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";

declare option output:method "json";
declare option output:indent "yes";

declare function local:group($items as item()*, $key as function(item()) as item()*) as item()* {
  for-each(
    $items,
    function($item) {
      for-each(
        $key($item),
        function($k) {
          map:entry($k, $item?name)
        }
      )
    }
  )
  => map:merge(map { 'duplicates' : 'combine' })
  => map:for-each(function($k, $v) { map { 'category' : $k, 'items' : array { $v } } })
};

array { local:group(?*, function($item) { $item?categories?* }) }
