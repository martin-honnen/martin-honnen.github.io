document.addEventListener('DOMContentLoaded',
    function () {
        document.getElementById('input-types').addEventListener('click',
            function (evt) {
                var inputType = evt.currentTarget.form['input-type'].value;
                if (inputType !== 'None') {
                    inputEditor.session.setMode(modes[inputType.toLowerCase()]);
                }
                document.getElementById('input-col').style.display =
                    inputType === 'None' ? 'none' : '';
                return true;
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
      document.getElementById('syntaxCheck').onchange = function (evt) {
        doSyntaxCheck = this.checked;
        if (this.checked) {
          checkSyntax();
        }
        else {
          stopCheckingSyntax();
        }
      };
    },
    false
)