async function xquery(input, xquery, inputType, inputUri, xqueryUri) {

  if (basexInitialized) {
    
    inputUri = inputUri || 'urn:from-string';
    xqueryUri = xqueryUri || 'urn:from-string';
    

    try {
      if (inputType === 'None') {
		    queryProcessor = await new QueryProcessor(xquery, context);
      }
      else if (inputType === 'XML') {
        queryProcessor = await new QueryProcessor('declare context item external; ' + xquery, context);
        await queryProcessor.context(input);
      }
      else if (inputType === 'JSON') {
        queryProcessor = await new QueryProcessor('declare context item external; ' + xquery, context);
        await queryProcessor.context(input);
      }

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
