require('colors');
require('dotenv').config();

const { PORT } = process.env;

const express = require('express');
const app = express();

const { sequelize, runMigrations } = require('./util/sequelize.js');
const { handleErrors } = require('./middlewares/errorMiddlewares')
const userRouter = require('./controllers/usersRouter');
const pruebaRouter = require('./controllers/notesRouter');
const loginRouter = require('./controllers/loginRouter');

app.use(express.json());


app.use('/users', userRouter);
app.use('/notes', pruebaRouter);
app.use('/login', loginRouter)
app.use(handleErrors)


// sequelize.sync({alter: true}).then(() => {
   app.listen(PORT, () => {
      console.log('Server listening PORT 3050 and all table were synchronized successfully!'.yellow.underline);
   })
// })



// Promise.all(
//    [sequelize.sync(), app.listen(PORT)]
// ).then((res) => {
//    console.log('Server listening PORT 3050 and all table were synchronized successfully!'.yellow.underline)
// })