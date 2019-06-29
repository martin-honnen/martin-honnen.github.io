function Pager(page, lastPage, tableId) {
    var pager = this;
    this.page = page;
    this.lastPage = lastPage;
    this.tableId = tableId;
    
    this.table = document.getElementById(tableId);
     
    this.nextPageBtn = this.table.querySelector('#next-page');
    this.nextPageBtn.addEventListener('click',
       function(evt) {
          pager.displayPage(pager.page + 1);
       },
       false
    );
    
    this.previousPageBtn = this.table.querySelector('#previous-page');
    this.previousPageBtn.addEventListener('click',
       function(evt) {
          pager.displayPage(pager.page - 1);
       },
       false
    );
    
    this.firstPageBtn = this.table.querySelector('#first-page');
    this.makeListener(1, this.firstPageBtn);
    
    this.lastPageBtn = this.table.querySelector('#last-page');
    this.makeListener(this.lastPage, this.lastPageBtn);

}

Pager.prototype.makeListener = function(pageNr, button) {
    var pager = this;
    button.addEventListener(
      'click',
      function(evt) {
          pager.displayPage(pageNr);
      },
      false
    );
}

Pager.prototype.displayPage = function(pageNr) {
   this.page = pageNr;
   this.table.tBodies[this.page - 1].style.display = '';
   Array.from(this.table.tBodies).filter((el, i) => i != (this.page - 1)).forEach(el => el.style.display = 'none'); 
   this.table.querySelector('#page').textContent = page;
   this.previousPageBtn.disabled = this.page === 1;
   this.nextPageBtn.disabled = this.page === lastPage;
};

var scriptUrl = new URL(document.currentScript.src);

var searchParams = scriptUrl.searchParams;

var pager1 = new Pager(parseInt(searchParams.get('page')), parseInt(searchParams.get('lastPage')), searchParams.get('tableId'));

pager1.displayPage(pager1.page);
