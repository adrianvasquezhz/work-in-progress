const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

module.exports = (request, response, next) => {
   const authorization = request.get('authorization');

   if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      try {
         request.decodedToken = jwt.verify(authorization.substring(7), SECRET_KEY);
         next();
      }
      catch {
         response.status(401).json({ error: 'token invalid' })
      }
   }

   else {
      response.status(401).json({ error: 'token missing' })
   }
}