document.addEventListener('DOMContentLoaded',
  function () {
    document.getElementById('auto-validate').addEventListener('click',
      function (evt) {
        autoValidate = evt.target.checked;
      },
      false
    );
    document.getElementById('render-result').addEventListener('click',
      function (evt) {
        document.getElementById('result-frame-container').style.display =
          document.getElementById('render-box').checked ? '' : 'none';
        return true;
      },
      false
    );
  },
  false
)