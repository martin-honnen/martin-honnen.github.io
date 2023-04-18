var pyodide = null;

async function main() {
    pyodide = await loadPyodide();
    // Pyodide is now ready to use...
    console.log(pyodide.runPython(`
import sys
sys.version
`));
    await pyodide.loadPackage("micropip");
    const micropip = pyodide.pyimport("micropip");
    await micropip.install('XMLSchema');
};

main();
