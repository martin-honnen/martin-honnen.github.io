document.addEventListener('DOMContentLoaded',
  function () {
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