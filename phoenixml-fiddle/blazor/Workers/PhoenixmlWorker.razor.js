import { dotnet } from '../_framework/dotnet.xkapyjmvct.js';

let assemblyExports;
let startupError;

try {
    const { getAssemblyExports, getConfig } = await dotnet.create();
    const config = getConfig();
    assemblyExports = await getAssemblyExports(config.mainAssemblyName);
} catch (err) {
    startupError = err.message;
}

self.addEventListener('message', async e => {
    try {
        if (!assemblyExports) {
            throw new Error(startupError || 'worker exports not loaded');
        }

        let result;
        switch (e.data.command) {
            case 'transform':
                result = await assemblyExports.PhoenixmlWorker.Transform(e.data.xslt, e.data.xml);
                result = JSON.parse(result);
                break;
            case 'executeXQuery':
                result = await assemblyExports.PhoenixmlWorker.ExecuteXQuery(e.data.xquery, e.data.xml);
                break;
            default:
                throw new Error(`Unknown command: ${e.data.command}`);
        }
        
        self.postMessage({
            command: 'response',
            requestId: e.data.requestId, result
        });
    } catch (err) {
        self.postMessage({
            command: 'response',
            requestId: e.data.requestId, error: err.message
        });
    }
});