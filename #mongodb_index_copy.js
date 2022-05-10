require('dotenv').config();
// const disconnect = require('./mongoose');
const path = require('path')
const colors = require('colors');
colors.enable();
const {PORT, author } = process.env;
let notes = require('./notes.json');


// process.on('uncaughtException', (err, origin) => {
//    console.log('Se cerró la conexión con mongoose por una Exception no detectada (Uncaught Exception):'.brightRed + '\n' + err.message);
//    console.log('----------------------------------------------------------------------------------------------------'.red)
//    console.log(err)
//    console.log('----------------------------------------------------------------------------------------------------'.red)
//    disconnect();
// });


const { handleErrors, urlNotFound } = require('./middlewares/errorMiddlewares');

// ------------------------------------------------- //

const express = require('express');
const app = express();

const cors = require('cors');
const Notes = require('./models/Notes');

const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");










app.use(express.json());
app.use(cors());
app.use('/public', express.static('images'));

console.log('NODE_ENV:'.brightBlue,process.env.NODE_ENV)

Sentry.init({
   dsn: "https://87801cae528f48cdbf8b8c516d616e14@o1216737.ingest.sentry.io/6359873",
   integrations: [
     new Sentry.Integrations.Http({ tracing: true }),
     new Tracing.Integrations.Express({ app }),
   ],
   tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.get('/images/:image', (request, response) => {
   const { image } = request.params
   response.sendFile(path.resolve(__dirname, 'images', image ));
});

app.get('/', (request, response) => {
   response.send('<b>Hello World!</b>');
});

app.get('/test', (request, response) => {

   // Notes.findOne({}).then(res => {
   //    res.isImportant = !res.important;
   //    res.save()
   //    response.json(res)
   // })

   // response.json({'nice': true})

   const doc = new Notes({
      content: 'Validating test',
      important: true,
      date: new Date(),
      age: 15
   })

   doc.validate().then(res => {
      console.log(res)
   }).catch(e => {
      console.log(e.message+'\n'+e.name)
   })

   response.json(doc)
   // Notes.find({important: true}, (res, nose) => {
   //    console.log(res.map(el => {
   //    const {__v, ...rest} = el._doc;
   //    return rest
   // }))})

/* -------------------------------------- */
   // Notes.findByIdAndUpdate('625978fbd04b1151cbf756ab', {content: 'asdsadasdsa'}, {returnDocument: 'after'})

   // ----------- ES EQUIVALENTE A ESTO ----------- // 

   // (async () => { 
   //    const doc = await Notes.findOne({_id: "625978fbd04b1151cbf756ab"})
   //    doc.important = !doc.important;
   //    await doc.save()
   //    response.json(doc)
   //    // console.log(doc)
   // })();

/* -------------------------------------- */


   /* PROBANDO VALIDATORS */
   // Notes.create({
   //    content: 'createPrueba',
   //    important: true,
   //    date: new Date(),
   //    age: 10
   // })
   //   .then(res => {
   //    console.log(res)
   // })
   //   .catch(e => {
   //      const errmsg = e.errors.age.properties.message
   //      console.log(errmsg)
   //      response.json(errmsg)
   // })

});

app.get('/notes', (request, response) => {
   // response.header('Access-Control-Allow-Origin', '*');
   Notes.find({})
      .then(res => {
         response.status(302).json(res.map(el => {
            clearTimeout(timeout)
            const {_id, __v, ...rest} = el._doc
            return {...rest, id: _id} 
         }))
   })

   const timeout = setTimeout(() => {
      console.log('error')
      response.status(404).end();
   }, 3000)
});

app.get('/notes/:id', (request, response, next) => {
   const { id } = request.params;

   Notes.findById(id)
      .then(res => {
         if (res) response.json(res);
         else response.status(400).send({"No_Found": 'No matches found'});
      })
      .catch(err => {
         next(err);
      })
});

app.post('/notes', (request, response) => {
   const note = request.body
   if (!note.content) {
      response.status(400).json({
         error: 'note.content no existe',
         status: 400
      });
      return
   }

   Notes.create({
      content: note.content,
      date: new Date(),
      important: note.important,
      age: note.age || 20
   })
     .then(res => {
        response.status(201).json(res)
        console.log(res)
     })
});

app.put('/notes/:id', (request, response) => {
   const { id } = request.params;
   const note = request.body;

   Notes.findByIdAndUpdate(id, note, {returnDocument: 'after'}).then(res => {
      response.json({updatedDocument: res, status: 200, statusMessage: 'OK'});
   });
});

app.delete('/notes/:id', (request, response, next) => {
   const { id } = request.params;
   Notes.findByIdAndRemove(id)
      .then(res => {
         response.status(200).json({deletedDocument: res, status: 200, statusMessage: 'OK'});
      })
      .catch(error => {
         next(error);
      })
});

app.get("/debug-sentry", (req, res) => {
   throw new ("My Sentry error!");
});

app.use(urlNotFound);

app.use(Sentry.Handlers.errorHandler());

app.use(handleErrors);


const server = app.listen(PORT, () => {
   // myEvent.emit('event');
   console.log(`Listening PORT: ${PORT}`.yellow);
});































































const events = require('events');
const { resolve, resolve4, resolve6, resolveCaa, resolvePtr, resolveTxt } = require('dns');
const { response } = require('express');
const res = require('express/lib/response');
const { modelName } = require('./models/Notes');
const { CONSOLE_LEVELS } = require('@sentry/utils');
const { privateDecrypt } = require('crypto');

class MyEvents extends events {}

const myEvent = new MyEvents();

myEvent.on('event', () => {
   console.log('an event ocurred!')
});

myEvent.on('ready', () => {
   console.log('App ready!')
});


































































// const http = require('http');
// const fs = require('fs');
// const path = require('path')

// const { PORT=3000 } = process.env;

// http.createServer((request, response) => {

//     let stream;
//     let contentType = 'text/html'
//     let status = 200

//     const PUBLIC_PATH = path.join(__dirname, 'public')
//     const { url } = request;

//     if (url === '/') {
//         stream = fs.createReadStream(`${PUBLIC_PATH}/index.html`)
//     }
//     else if (url.match(/\.css$/)) {
//         contentType = 'text/css';
//         stream = fs.createReadStream(`${PUBLIC_PATH + url}`);
//     }
//     else if (url.match("\.js$")) {
//         contentType = 'application/javascript';
//         stream = fs.createReadStream(`${PUBLIC_PATH + url}`)
//     }
//     else {
//         contentType = 'text/plain'
//         status = 400
//     }

//     response.writeHead(status, { 'Content-Type': contentType });
    
//     console.log(url)
    
//     if (stream) stream.pipe(response)
//     else response.end('Error 404');

// }).listen(PORT);

// console.log(`Escuchando el puerto ${PORT}`)
