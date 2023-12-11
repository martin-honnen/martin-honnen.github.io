async function transform(input, xslt, inputType, inputUri, xsltUri, outputUri) {

  inputUri = inputUri || 'urn:from-string';
  xsltUri = xsltUri || 'urn:from-string';
  outputUri = outputUri || 'file:/files/xslt-output';

  if (xalanInitialized) {
    var transformer = null;
    try {
      transformer = await TransformerFactory.newTransformer(await new StreamSource(await new StringReader(xslt), xsltUri));

      console.log(await (await transformer.getClass()).getName());
    }
    catch (e) {
      if (e instanceof JTransformerException) {
        postMessage({ type: 'error', message: 'Compiling your XSLT failed: ' + await e.getMessage() });
        return;
      }
      await e.printStackTrace();
      return;
    }
    
    var resultWriter = await new StringWriter();
    
    var transformationResult = await new StreamResult(resultWriter);
    
    try {
      await transformer.transform(await new StreamSource(await new StringReader(input), inputUri), transformationResult);
      
      var stringResult = await resultWriter.toString();

      postMessage({ type : 'result', task: 'transform',  results : [stringResult] });
    }
    catch (e) {
      if (e instanceof JTransformerException) {
        postMessage({ type: 'error', message: 'Running your XSLT failed: ' + await e.getMessage() });
        return;
      }
      //else if (e instanceof JException) {
        
        //var errorWriter = await new StringWriter();
        
        //var printWriter = await new PrintWriter(errorWriter, true);
        
        //await e.printStackTrace(printWriter);
        
        //await printWriter.close();
        
        //postMessage({ type: 'error', message: 'Running your XSLT failed: ' + await e.toString() });
      //}
      
      e.printStackTrace();
      return;
    }
  }
  else {
    console.log('Wait for Xalan library to be loaded.');
  }

}