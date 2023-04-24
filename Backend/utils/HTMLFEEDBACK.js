const HTMLFeedback = (text) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>NodeMailer Email Template</title>
     
        </head>
        <body>
              
                <h4>Good Morning,</h4>
                <h3>check your feedBack list:<br/><br/>${text}</h3><br/> 
             
                <p>Gestion Des Livraisons</p>
                

        </body>
      </html>
    `;
  }
  
  exports.HTMLFeedback=HTMLFeedback;