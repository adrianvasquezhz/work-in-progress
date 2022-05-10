const router = require('express').Router();
const { User, Note, Team, Membership } = require('../models/index');
const extractToken = require('../middlewares/extractToken');
const toJSON = (b) => b[0].dataValues

const isAdmin = (request, response, next) => {

   User.findByPk(request.decodedToken.id)
      .then(user => {
         if (!user.admin) return response.status(401).json({ error: 'You can\'t do that' })
         next();
   })
}

router.get('/', (request, response) => {
   User.findAll({
      include: [
         {
            model: Note,
            attributes: {
               exclude: ['userId']
            }
         },
         {
            model: Team,
            attributes: ['id', 'name'],
            through: {
               attributes: []
            }
         }
      ], 
      order: [
         ['id', 'ASC']
      ]
   })
      .then(res => {
         console.log(`${res.length} registros encontrados!`.brightBlue);
         response.status(200).json(res)
      })
})

router.get('/:id', (request, response) => {
   const { id } = request.params;

   User.findByPk(id, {
      // eager fetch
      include: [
         {
            model: Note,
            attributes: {
               exclude: ['user_id']
            }
         },
         {
            model: Note,
            as: 'marked_notes',
            attributes: {
               exclude: ['user_id']
            },
            through: {
               attributes: []
            },
            include: {
               model: User,
               attributes: ['username']
            }
         }
      ]
   })
      .then(async (user) => {
         if (!user) return response.status(400).json({ error: 'User Not found' });

         let teams;
         // lazy fetch
         if (request.query.teams) {
            teams = await user.getTeams({
               attributes: ['name'],
               joinTableAttributes: []
            })
         }
         response.json({ ...user.toJSON(), teams })
      })
})

router.get('/test/test', async (request, response) => {
   const users = await User.scope('admin').findAll();
   response.json(users)
})

router.post('/', (request, response) => {
   if (request.body.username) {
      const { username, name } = request.body
      User.create({
         username,
         name
      })
         .then(res => {
            response.status(201).json(res)
         })
   }
   else {
      response.status(400).send('Not json body found!')
   }
})

router.put('/:username', extractToken, isAdmin, (request, response) => {
   
   User.findOne({
      where: {
         username: request.params.username
      }
   })
      .then(user => {
         if (user) {
            user.disabled = request.body.disabled;
            user.save();
            response.status(200).json(user)
         }
         else {
            response.status(404).end('username not found')
         }
      })
})


module.exports = router