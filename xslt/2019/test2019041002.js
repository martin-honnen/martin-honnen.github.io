function testInsertion(targetElement, htmlFragmentString) {
  var range = targetElement.ownerDocument;
  range.selectNode(targetElement);
  var fragment = range.createContextualFragment(htmlFragmentString);
  targetElement.appendChild(fragment);
}

function test1() {
  var htmlFragmentString = 
`<section><h2>Family Members</h2>
<table id="tbl" border="1" style="display:none">
<thead><tr>
<th>Role</th>
<th>Name</th>
<th>Age</th>
</tr></thead>
<tbody>
<tr>
<td>Mom</td>
<td>Alison</td>
<td>44</td>
</tr>
<tr>
<td>Father</td>
<td>Ben</td>
<td>45</td>
</tr>
<tr>
<td>Son</td>
<td>Ian</td>
<td>8</td>
</tr>
</tbody>
</table>
<script>document.getElementById('tbl').style.display = '';</script></section>`;

  testInsertion(document.getElementById('d1'), htmlFragmentString);
}

document.addEventListener('DOMContentLoaded', test1, false);
