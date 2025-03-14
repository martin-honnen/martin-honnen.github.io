async function transform(input, xslt, inputType, inputUri, xsltUri, outputUri) {

  inputUri = inputUri || 'urn:from-string';
  xsltUri = xsltUri || 'urn:from-string';
  outputUri = outputUri || 'file:/files/xslt-output';

  if (xalanInitialized) {
    var transformer = null;
    
    var errors;
    try {
      var errorListenerHelper = await new ErrorListenerImplementationClass();
      
      await TransformerFactory.setErrorListener(errorListenerHelper);

      transformer = await TransformerFactory.newTransformer(await new StreamSource(await new StringReader(xslt), xsltUri));

      //const transformerImpl = await (TransformerImpl)transformer;
      await transformer.setProperty(await transformer.XSL_EVALUATE_PROPERTY, true);
      
      errors = await getJavaScriptMessages(errorListenerHelper);
      
      var fatalError = errors.some((msg) => msg.type === 'fatalError');
      
      if (fatalError) {
        postMessage({ type: 'error', message: 'XSLT compilation failed with error(s)\n' + errors.map((msg) => msg.type + ': ' + msg.message).join('\n') });
        return;
      }
      
      if (transformer === null) {
        
        postMessage({ type: 'error', message: 'Creation of Transfomer failed!' + (errors.length > 0 ? errors.map((msg) => msg.type + ': ' + msg.message).join('\n') : '')});
        
        return;
      }

      //console.log(await (await transformer.getClass()).getName());
            
      await transformer.setErrorListener(errorListenerHelper);
    }
    catch (e) {
      if (e instanceof JTransformerConfigurationException) {
        postMessage({ type: 'error', message: 'Compiling your XSLT failed: ' + await e.getMessage() });
        return        
      }
      else if (e instanceof JTransformerException) {
        postMessage({ type: 'error', message: 'Compiling your XSLT failed: ' + await e.getMessage() });
        return;
      }
      else if (e instanceof JSAXParseException) {
        postMessage({ type: 'error', message: 'Parsing failed: ' + await e.getMessage() });
        return;
      }
      else if (e instanceof JException) {
        
        var errorWriter = await new StringWriter();
        
        var printWriter = await new PrintWriter(errorWriter, true);
        
        await e.printStackTrace(printWriter);
        
        await printWriter.close();
        
        postMessage({ type: 'error', message: 'Running your XSLT failed: ' + await e.toString() });
        
        e.printStackTrace();

      }
      else if (e instanceof Error) {
        postMessage({ type: 'error', message: e.message });
      }
      else if (typeof e === 'string') {
        postMessage({ type: 'error', message: e });
      }
      return;
    }
    
    var resultWriter = await new StringWriter();
    
    var transformationResult = await new StreamResult(resultWriter);
        
    try {
      await transformer.transform(await new StreamSource(await new StringReader(input), inputUri), transformationResult);
      
      errors = await getJavaScriptMessages(errorListenerHelper);
   
      var fatalError = errors.some((msg) => msg.type === 'fatalError');
      
      if (fatalError) {
        postMessage({ type: 'error', message: 'XSLT transformation failed with error(s)\n' + errors.map((msg) => msg.type + ': ' + msg.message).join('\n') });
        return;
      }
      
      var stringResult = await resultWriter.toString();

      postMessage({ type : 'result', task: 'transform',  results : [stringResult + (errors.length > 0 ? '\n\nWarnings/errors:\n' + errors.map((msg) => msg.type + ': ' + msg.message).join('\n') : '') ] });
    }
    catch (e) {
      if (e instanceof JTransformerException) {
        postMessage({ type: 'error', message: 'Running your XSLT failed: ' + await e.getMessage() + (errors.length > 0 ? '\n\nWarnings/errors:\n' + errors.map((msg) => msg.type + ': ' + msg.message).join('\n') : '') });
        return;
      }
      else if (e instanceof JSAXParseException) {
        postMessage({ type: 'error', message: 'Parsing failed: ' + await e.getMessage() });
        return;
      }
      else if (e instanceof JException) {
 
        var fatalError = errors.some((msg) => msg.type === 'fatalError');
        
        if (fatalError) {
          postMessage({ type: 'error', message: 'XSLT transformation failed with error(s)\n' + errors.map((msg) => msg.type + ': ' + msg.message).join('\n') });
          return;
        } 
        
        var errorWriter = await new StringWriter();
        
        var printWriter = await new PrintWriter(errorWriter, true);
        
        await e.printStackTrace(printWriter);
        
        await printWriter.close();
        
        postMessage({ type: 'error', message: 'Running your XSLT failed: ' + await errorWriter.toString() + (errors.length > 0 ? '\n\nWarnings/errors:\n' + errors.map((msg) => msg.type + ': ' + msg.message).join('\n') : '') });
        
        e.printStackTrace();

      }
      else if (typeof e === 'string') {
        postMessage({ type: 'error', message: 'XSLT transformation failed: ' + e });
      }
     
      return;
    }
  }
  else {
    console.log('Wait for Xalan library to be loaded.');
  }

}


async function getJavaScriptMessages(errorListenerHelper) {
  
  var errorsJavaArray = await errorListenerHelper.getMessages();
  
  var errors = [];
  
  for (var i = 0; i < errorsJavaArray.length; i++) {
    var javaMessage = errorsJavaArray[i];
    errors.push({ type: await javaMessage.getType(), message: await javaMessage.getMessage() });
  } 
  
  return errors;
}
