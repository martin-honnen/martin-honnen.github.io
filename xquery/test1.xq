declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";

declare option output:method 'html';
declare option output:indent 'yes';


<items>
{
random-number-generator(current-dateTime())?permute(1 to 10) ! <item>{.}</item>
}
</items>
