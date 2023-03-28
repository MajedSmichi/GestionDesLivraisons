const HTML_TEMPLATEPWD = (text) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>NodeMailer Email Template</title>
     
        </head>
        <body>
              
                <h4>Good Morning,</h4>
                <h3>
                <br/><br/>${text}</h3><br/> 
             
                <p>Gestion Des Livraisons</p>
                

        </body>
      </html>
    `;
  }
  
  exports.HTML_TEMPLATEPWD=HTML_TEMPLATEPWD;