async function schematronValidate(input, schematron, schxsltVersion) {

  if (saxonInitialized) {
    var inputUri = 'urn:from-string';
    var schematronUri = 'urn:from-string';

    var inputContextItem = null;

    // try {
    //   var streamSource = await new StreamSource(await new StringReader(input), inputUri);
    //
    //   inputContextItem = await docBuilder.build(streamSource);
    // }
    // catch (e) {
    //   if (e instanceof SaxonApiException) {
    //     postMessage({ type: 'error', message: 'Parsing your XML failed: ' + await e.getMessage() });
    //   }
    //   else if (e instanceof Error) {
    //     postMessage({ type: 'error', message: 'Parsing your XML failed: ' + e.message });
    //   }
    //   return;
    // }

    var schxsltTranspilerExecutable = null;

    var schxsltTranspiler = null;

    try {
      schxsltTranspilerExecutable = await xsltCompiler.compile(await new StreamSource('/app/schematron-fiddle/' + schxsltVersion));
      schxsltTranspiler = await schxsltTranspilerExecutable.load30();
    }
    catch (e) {
      if (e instanceof SaxonApiException) {
        postMessage({ type: 'error', message: 'Compiling Schxslt failed: ' + await e.getMessage() });
      }
      else if (e instanceof Error) {
        postMessage({ type: 'error', message: 'Compiling Schxslt failed: ' + e.message });
      }
      return;
    }

    var schematronContextItem = null;

    // try {
    //   var streamSource = await new StreamSource(await new StringReader(schematron), schematronUri);
    //
    //   schematronContextItem = await docBuilder.build(streamSource);
    // }
    // catch (e) {
    //   if (e instanceof SaxonApiException) {
    //     postMessage({ type: 'error', message: 'Parsing your Schematron failed: ' + await e.getMessage() });
    //   }
    //   else if (e instanceof Error) {
    //     postMessage({ type: 'error', message: 'Parsing your Schematron failed: ' + e.message });
    //   }
    //   return;
    // }

    try {
      //await schxsltTranspiler.setGlobalContextItem(schematronContextItem);
      //var compiledSchematron = await schxsltTranspiler.applyTemplates(schematronContextItem);

      try {
        //var compiledSchematronSource = await compiledSchematron.asSource();
        //await compiledSchematronSource.setSystemId('urn:from-string');

        //var compiledSchematronExecutable = await xsltCompiler.compile(compiledSchematronSource);

        //var schematronTransformer = await compiledSchematronExecutable.load30();

        var xsltParameters = await new HashMap();

        await xsltParameters.put(await new QName('', 'instance-text'), await new XdmAtomicValue(input));
        await xsltParameters.put(await new QName('', 'schema-text'), await new XdmAtomicValue(schematron));
        await xsltParameters.put(await new QName('', 'instance-uri'), await new XdmAtomicValue('uri:from-string'));


        await schxsltTranspiler.setStylesheetParameters(xsltParameters);

        //await schematronTransformer.setGlobalContextItem(inputContextItem);

        var svrlResult = await schxsltTranspiler.callTemplate(null); //applyTemplates(inputContextItem);

        var stringResult = await svrlResult.toString();

        postMessage({ type : 'result', task: 'schematron',  results : [stringResult] });

      }
      catch (e) {
        if (e instanceof SaxonApiException) {
          postMessage({ type: 'error', message: 'Compiling your Schematron failed: ' + await e.getMessage() });
        }
      }

    }
    catch (e1) {
      console.log('Error compiling Schematron');
      if (e1 instanceof SaxonApiException) {
        postMessage({ type: 'error', message: 'Error compiling Schematron: ' + await e1.getMessage() + ' (Line ' + await e1.getLineNumber() + ')' });
        await e1.printStackTrace();
      }
      else if (e1 instanceof JException) {
        postMessage({ type : 'error', message : 'Error compiling Schematron: ' + await e1.getMessage() });
        await e1.printStackTrace();
      }
      else if (e1 instanceof Error) {
        postMessage({ type: 'error', message: 'Error compiling Schematron: ' + e1.message });
      }
    }
  }
  else {
    console.log('Wait for Saxon HE library to be loaded.');
  }

}
