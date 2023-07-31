declare namespace output = 'http://www.w3.org/2010/xslt-xquery-serialization';

declare option output:method 'xml';
declare option output:indent 'yes';

<results>
<doc-test>
{
  try { 
    doc('sample1.xml')
  }
  catch * {
    $err:description
  }  
}
</doc-test>
<unparsed-text-test>
{
  try { 
    unparsed-text('sample1.txt')
  }
  catch * {
    $err:description
  }  
}
</unparsed-text-test>
</results>
