    /**Generate a document part to be shown in HTML-document
     * 
     * @param {XMLDocument} xml VSF file to be transformed.
     * @param {XMLDocument} xsl XSLT style sheet being used for the VSF.
     * @param {HTMLDocument} document HTML document where the created fragment belongs to.
     * @returns {DocumentFragment} The fragment HTML-document. 
     */
    function createFragSpecification(xml, xsl, document) {
        var xsltProcessor = new XSLTProcessor();
        try {
            xsltProcessor.importStylesheet(xsl);
        } catch (err) {
            console.error(err);
        }

        return xsltProcessor.transformToFragment(xml, document);
    }
