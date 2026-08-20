declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";

declare option output:method "html";
declare option output:indent "yes";

<table>
    <thead>
    <tr>
        <th>Position</th>
        <th>Country</th>
        <th>City List</th>
        <th>Population</th>
    </tr>
    </thead>
    <tbody>
    {
    for $city at $pos in cities/city
    group by $country := $city/@country
    return
      <tr>
        <td>{ $pos }</td>
        <td>{ $country }</td>
        <td>
        {
        sort($city/@name) => string-join(', ')
        }
        </td>
        <td>{ sum($city/@pop) }</td>
      </tr>
    }
    </tbody>
</table>

