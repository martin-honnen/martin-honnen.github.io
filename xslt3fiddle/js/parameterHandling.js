function addParameterRow(currentRow) {
  const newRow = currentRow.cloneNode(true);
  for (let input in newRow.querySelectorAll('input[type="text"]')) {
    input.defaultValue = '';
  }
  currentRow.parentElement.insertBefore(newRow, currentRow.nextSibling);
}


document.addEventListener(
  'DOMContentLoaded',
  () => {

  }
)