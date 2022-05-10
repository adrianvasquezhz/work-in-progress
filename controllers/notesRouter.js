const router = require('express').Router();
const { Note, User } = require('../models/index');
const { Op } = require('sequelize')
const extractToken = require('../middlewares/extractToken')

const finderPk = (request, response, next) => {
   const { id } = request.params;
   Note.findByPk(id).then(res => {
      request.note = res;
      next();
   })
}


router.get('/', (request, response) => {
   // sequelize.query('SELECT * FROM pruebas ORDER BY id', { type: QueryTypes.SELECT }).then(res => {
   //    response.json(res)
   //    console.log(res)
   // })
   //
  
   const where = {}

   if (request.query.important) {
      where.important = request.query.important
   }

   if (request.query.content) {
      where.content = {
         [Op.iLike]: '%' + request.query.content + '%'
      }
   }

   Note.findAll({
      attributes: {
         exclude: ['userId'],
      },
      include: {
         model: User,
         attributes: ['name']
      },
      where,
      logging: console.log
   })
      .then(res => {
         response.status(200).json(res);
         console.log('All notes selected!')
      })
      .catch(error => console.log(error))
})

router.post('/', extractToken, (request, response) => {

   const { content, important } = request.body;

   User.findByPk(request.decodedToken.id).then(user => {
      Note.create({
         content,
         important,
         date: new Date(),
         userId: user.id
      })
         .then(res => {
            response.status(200).json(res)
            console.log('New Note created!'.rainbow)
         })
   })
});

router.get('/test', async (request, response) => {
   const note = await Note.findByPk(1)
   console.log(await note.whatUser());
   response.json({nice: 'OK'})
})

router.get('/:id', (request, response) => {

   const { id } = request.params;

   Note.findByPk(id, {
      include: [
         {
            model: User
         },
         // {
         //    model: User,
         //    as: 'users_marked'
         // }
      ]
   })
      .then(note => {
         note.getUser().then(users => {
            console.log(users)
         })
         response.status(201).json({...note.toJSON(), })
      })
});

router.delete('/:id', finderPk, (request, response) => {
   const { note } = request;
   
   if (note) {
      note.destroy()
      response.send('Note has been deleted!');
   }
   else response.status(404).end('Note not found!')
});

router.put('/:id', finderPk, (request, response) => {
   const { note } = request;
   const newAge = request.body.age
   if (note) {
      request.note.age = newAge;
      request.note.save()
         .then(res => {
            response.status(200).json(res)
            console.log('Note has been updated!')
         })
   }
   else response.status(404).send('Note not found!')
});


module.exports = router