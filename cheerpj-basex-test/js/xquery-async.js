async function xquery(input, xquery, inputType, inputUri, xqueryUri) {

  if (basexInitialized) {
    
    inputUri = inputUri || 'urn:from-string';
    xqueryUri = xqueryUri || 'urn:from-string';
    

    try {
      queryProcessor = await new QueryProcessor(xquery, context);
      if (inputType === 'XML') {
        var xmlParser = await new QueryProcessor('parse-xml(.)', context);
        await xmlParser.context(input);
        var xmlInput = await xmlParser.value();		    
        await queryProcessor.context(xmlInput);
      }
      else if (inputType === 'JSON') {
        var jsonParser = await new QueryProcessor('parse-json(.)', context);
        await jsonParser.context(input);
        var jsonInput = await jsonParser.value();		    
        await queryProcessor.context(jsonInput);
      }

      //var result = await queryProcessor.value();

      var os = await new ByteArrayOutputStream();

      var iter = await queryProcessor.iter();
      
      var serializer = await queryProcessor.getSerializer(os);

      const method = await BaseX11Helper.getSerializerMethod(serializer);

      console.log('method: ' + method);

      var item = await iter.next();

      while (item != null) {
        await serializer.serialize(item);
        item = await iter.next();
      }

		  postMessage({ type : 'xquery-result', task: 'xquery',  results : [{ uri : '*** query result ***', content : await os.toString('utf8'), method: method === 'basex' ? 'xml' : method }]});

	  }
	  catch (e) {
 		  console.log('Error evaluating XQuery');
      if (e instanceof QueryException) {
        postMessage({ type: 'error', message: 'Error evaluating XQuery: ' + await e.getMessage() + ' (Line ' + await e.line() + ':' + await e.column() + ')' });
        await e.printStackTrace();
      }
      else if (e instanceof JException) {
        postMessage({ type : 'error', message : 'Error evaluating XQuery' + await e.getMessage() });
        await e.printStackTrace();
      }
      else if (e instanceof Error) {
        postMessage({ type: 'error', message: 'Error evaluating XQuery: ' + e.message });
      }
    }
  }
  else {
	  console.log('Wait for BaseX library to be loaded.');
  }
    
}
