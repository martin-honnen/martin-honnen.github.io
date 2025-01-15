async function xquery(input, xquery, inputType, inputUri, xqueryUri) {

  if (basexInitialized) {
    
    inputUri = inputUri || 'urn:from-string';
    xqueryUri = xqueryUri || 'urn:from-string';
    

    try {
		  queryProcessor = await new QueryProcessor(xquery, context);

      var result = await queryProcessor.value();

		  postMessage({ type : 'xquery-result', task: 'xquery',  results : [{ uri : '*** query result ***', content : await result.toString(), method: 'xml'}]});

	  }
	  catch (e) {
 		  console.log('Error evaluating XQuery');
      if (e instanceof QueryException) {
        postMessage({ type: 'error', message: 'Error evaluating XQuery: ' + await e.getMessage() + ' (Line ' + await e.getLineNumber() + ')' });
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
