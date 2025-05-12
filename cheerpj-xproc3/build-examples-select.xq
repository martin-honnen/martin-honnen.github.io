declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";

declare option output:method "html";
declare option output:indent "yes";

<select id="examples-select">
<option value="">Select an XProc example</option>
{
for $example in uri-collection('examples?select=*.xpl;recurse=yes')
group by $base-uri := $example => replace('^.*/martin-honnen.github.io/cheerpj-xproc3/|/[^/]+$', '')
order by $base-uri
return
  <optgroup label="{$base-uri => tokenize('/') => subsequence(-2) => string-join('/')}">
   {
    for $example in $example
    return
      <option value="{($base-uri, ($example => tokenize('/'))[last()]) => string-join('/')}">{(($example => tokenize('/'))[position() ge last() - 1]) => string-join('/')}</option>
    }
  </optgroup>
}
</select>