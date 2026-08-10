document.addEventListener('DOMContentLoaded',
    function () {
        autoEvaluation = document.getElementById('auto-evaluate').checked;

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