var services, xsltProcessors;
var currentProcessor = null;
var doneTypingInterval = 1000;
var typingTimeout;

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
        fetch('services/services.json').
            then(response => response.json()).
            then(json => {
            services = json;
            xsltProcessors = services.xsltProcessors;
            currentProcessor = xsltProcessors[0];
            initSelect(document.getElementById('xsltProcessors'), xsltProcessors);
        }).then(() => { load(document.location); runAutoTransform(); });;
        document.getElementById('auto-transform').addEventListener('click',
            function (evt) {
                autoTransform = evt.target.checked;
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
);


function initSelect(select, xsltProcessors) {
    for (var i = 0; i < xsltProcessors.length; i++) {
        select.options[select.options.length] = new Option(xsltProcessors[i].name, xsltProcessors[i].shortName, i === 0, i === 0);
    }
    select.addEventListener('change',
        function () {
            currentProcessor = xsltProcessors.find(proc => proc.shortName === select.value);
            console.log(currentProcessor);
        },
        false
    );
}