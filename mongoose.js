const mongoose = require('mongoose');
const password = require('./password.js');
const connectionString = `mongodb+srv://adrianvasquez02:${password}@cluster0.nes3o.mongodb.net/myDDBB?retryWrites=true&w=majority`


mongoose.connect(connectionString).then(() => {
  console.log('Mongoose(MongoDB): Database connected!'.brightGreen)
}).catch(err => {
  console.error(err)
});

module.exports = {a: 123, b: 456}