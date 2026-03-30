const pendingRequests = {};
let pendingRequestId = 0;

const dotnetWorker =
    new Worker('./Workers/PhoenixmlWorker.razor.js', { type: 'module' });

dotnetWorker.addEventListener('message', e => {
    switch (e.data.command) {
        case 'response':
            const request = pendingRequests[e.data.requestId];
            delete pendingRequests[e.data.requestId];
            if (e.data.error) {
                request.reject(new Error(e.data.error));
            }
            request.resolve(e.data.result);
            break;
        default:
            console.log('Worker said:', e.data);
    }
});

function sendRequestToWorker(request) {
    pendingRequestId++;
    const promise = new Promise((resolve, reject) => {
        pendingRequests[pendingRequestId] = { resolve, reject };
    });

    dotnetWorker.postMessage({ ...request, requestId: pendingRequestId });
    return promise;
}

export async function transform(xslt, xml) {
    const response = await sendRequestToWorker({ command: 'transform', xslt: xslt, xml: xml });
    return response;
}

export async function executeXQuery(xquery, xml) {
    const response = await sendRequestToWorker({ command: 'executeXQuery', xquery: xquery, xml: xml });
    return response;
}