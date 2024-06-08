importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.0/full/pyodide.js");

const python = `
import os
print(os.listdir('/native-fs-test2'))
`;

async function loadPyodideAndPackages() {
    self.pyodide = await loadPyodide();
    await pyodide.loadPackagesFromImports(python);
}


self.onmessage = async (event) => {
    // make sure loading is done
    await pyodideReadyPromise;

    const { id, ...context } = event.data;
    
  // The worker copies the context in its own "memory" (an object mapping name to values)
    for (const key of Object.keys(context)) {
        self[key] = context[key];
    }

    const mountDir = `/native-fs-test2`;
    console.log(mountDir);

    await self.pyodide.mountNativeFS(mountDir, self.dirHandle);

    // Now is the easy part, the one that is similar to working in the main thread:
    await self.pyodide.runPythonAsync(python);

};
