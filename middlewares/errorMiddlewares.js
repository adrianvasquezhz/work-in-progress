module.exports = {
   handleErrors: (error, request, response, next) => {
      console.log('Llegaste al MIDDLEWARE de errores');

      if (error.name === 'Error') {
         console.log(`${error.name}: ${error.message}`.brightRed);
         response.send(error.name + '<br>Error Message: ' + error.message);
      }
      else if (error.name === 'TypeError') {
         console.log(error.name.brightRed);
         console.log(error.message.brightRed);
         // response.send('Error, working...');
      }
      else if (error.name === 'CastError') {
         console.log('CastError!')
         response.status(500).send(`Error name: ${error.name}<br>Reason: ${error.reason.message}`);
      }
      else {
         console.log(error);
         response.status(500).send(error);
      }
   },

   urlNotFound: (request, response) => {
      console.log('URL NOT FOUND: ' + request.url);
      response.status(404).end();
   } 
}