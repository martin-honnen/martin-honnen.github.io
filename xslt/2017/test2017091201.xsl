<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">
    
    <xsl:output method="html" indent="yes" version="5.1" doctype-system="about:legacy-compat"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <title>Test</title>
                <style>
     /* The Modal (background) */
    .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }

    /* Modal Content/Box */
    .modal-content {
        background-color: #fefefe;
        margin: 15% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
        width: 80%; /* Could be more or less, depending on screen size */
    }

    /* The Close Button */
    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }                   
                </style>
                <script>
     var modals = {
      currentModal : null,
      openModal : function(id) {
        this.currentModal = document.getElementById(id);
        this.currentModal.style.display = 'block';
      },
      close : function() {
        if (this.currentModal != null) {
          this.currentModal.style.display = 'none';
          this.currentModal = null;
        }
      }
    }


    // When the user clicks anywhere outside of a modal, close it
    window.onclick = function(event) {
        if (event.target == modals.currentModal) {
            modals.close();
        }
    }                 
                </script>
            </head>
            <body>
                <h1>Test</h1>
                <xsl:apply-templates select="items/item"/>
                <xsl:apply-templates select="items/item" mode="dialogue"/>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="items/item">
        <p onclick="modals.openModal('modal{position()}');">
          <xsl:value-of select="title"/>
        </p>
    </xsl:template>

    <xsl:template match="items/item" mode="dialogue">
      <xsl:comment>The Modal <xsl:value-of select="position()"/></xsl:comment>
      <div id="modal{position()}" class="modal">
        <div class="modal-content">
          <span class="close" onclick="modals.close();">&#215;</span>
          <section>
            <xsl:apply-templates mode="dialogue"/>
          </section>
        </div>
      </div>
    </xsl:template>

    <xsl:template match="items/item/title" mode="dialogue">
      <h2>
        <xsl:apply-templates mode="dialogue"/>
      </h2>   
    </xsl:template>

    <xsl:template match="items/item/description" mode="dialogue">
      <p>
        <xsl:apply-templates mode="dialogue"/>
      </p>
    </xsl:template>

    <xsl:template match="items/item/footer" mode="dialogue">
      <h3>
        <xsl:apply-templates mode="dialogue"/>
      </h3>
    </xsl:template>

</xsl:stylesheet>
