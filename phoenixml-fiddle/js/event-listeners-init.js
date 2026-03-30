document.addEventListener('DOMContentLoaded',
    function () {
        autoEvaluation = document.getElementById('auto-evaluate').checked;
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
        document.getElementById('code-types').addEventListener('click',
            function (evt) {
                var codeType = evt.currentTarget.form['code-type'].value;
                if (codeType !== undefined) {
                    codeEditor.session.setMode(modes[codeType.toLowerCase()]);
                }
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
		document.getElementById('auto-evaluate').addEventListener('click',
            function (evt) {
                autoEvaluation = evt.target.checked;
            },
            false
        );
    },
    false
)