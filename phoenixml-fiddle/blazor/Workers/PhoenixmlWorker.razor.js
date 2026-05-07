import { dotnet } from '../_framework/dotnet.9yakjqnp07.js';

let assemblyExports;
let startupError;

try {
    const { getAssemblyExports, getConfig } = await dotnet.create();
    const config = getConfig();
    assemblyExports = await getAssemblyExports(config.mainAssemblyName);
    assemblyExports.PhoenixmlWorker.Initialize(self.location.origin);
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
                result = await assemblyExports.PhoenixmlWorker.Transform(e.data.xslt, e.data.xml, e.data.codeBaseURI, e.data.inputBaseURI);
                result = JSON.parse(result);
                break;
            case 'executeXQuery':
                result = await assemblyExports.PhoenixmlWorker.ExecuteXQuery(e.data.xquery, e.data.xml);
                break;
            case 'schematron':
                result = await assemblyExports.PhoenixmlWorker.Schematron(e.data.schematron, e.data.xml, e.data.codeBaseURI, e.data.inputBaseURI);
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