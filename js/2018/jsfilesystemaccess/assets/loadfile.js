function loadDoc(url) {
   return new Promise(function(resolve) {
     var req = new XMLHttpRequest();
     req.open("GET", url);
     req.onload = function() {
       resolve(this.responseXML)
     }
     req.send();
   });
}

