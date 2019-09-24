/*
 entrez la commande suivante:
 npm install --save express express-session body-parser morgan cors
*/
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')
const path = require('path')

const app = express()

app.use(session({
  secret: 'jnH6a1rKa&3@L74', // changez cette valeur
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // ne changez que si vous avez activé le https
}))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist/')))

const users = [
  {
    avatar: 6,
    name: 'Victor',
    surname: 'Belin',
    username: 'Vector',
    password: 'pswd',
    friends: ['Aetaugan', 'Knokerr', 'Nanami', 'Sima', 'Elic', 'Aristide', 'Edgar']
  },
  {
    avatar: 16,
    name: 'Camille',
    surname: 'Regis',
    username: 'Aetaugan',
    password: 'pswd',
    friends: ['Vector', 'Knokerr', 'Nanami', 'Sima', 'Elic']
  },
  {
    avatar: 1,
    name: 'Alexis',
    surname: 'Cuvillier',
    username: 'Knokerr',
    password: 'pswd',
    friends: ['Aetaugan', 'Vector']
  },
  {
    avatar: 17,
    name: 'Marina',
    surname: 'Kovacic',
    username: 'Nanami',
    password: 'pswd',
    friends: ['Aetaugan', 'Vector', 'Sima', 'Elic']
  },
  {
    avatar: 7,
    name: 'Simona',
    surname: 'Kovacic',
    username: 'Sima',
    password: 'pswd',
    friends: ['Aetaugan', 'Vector', 'Nanami', 'Elic']
  },
  {
    avatar: 47,
    name: 'Ela',
    surname: 'Kovacic',
    username: 'Elic',
    password: 'pswd',
    friends: ['Aetaugan', 'Vector', 'Nanami', 'Sima']
  },
  {
    avatar: 43,
    name: 'Edgar',
    surname: 'Belin',
    username: 'Edgar',
    password: 'pswd',
    friends: ['Vector', 'Aristide']
  },
  {
    avatar: 19,
    name: 'Aristide',
    surname: 'Belin',
    username: 'Aristide',
    password: 'pswd',
    friends: ['Vector', 'Edgar']
  }
]

app.post('/api/test', (req, res) => {
  console.log('coucou')
  res.json({
    message: "ceci est envoyé depuis l'API"
  })
})

app.post('/api/login', (req, res) => {
  console.log('req.query', req.query)
  console.log('req.body', req.body)

  if (!req.session.userId || req.session.userId === 1000) {
    const user = users.find(u => u.username === req.body.username && u.password === req.body.password)
    if (user) {
      // connect the user
      req.session.userId = 1000 // connect the user, and change the id
      res.json({
        message: 'connected',
        friends: user.friends
      })
    } else {
      res.json({
        message: 'user not found'
      })
    }
  } else {
    res.status(401)
    res.json({
      message: 'you are already connected'
    })
  }
})

app.post('/api/getInfo', (req, res) => {
  console.log('req.query', req.query)
  console.log('req.body', req.body)

  const user = users.find(u => u.username === req.body.username)
  if (user) {
    res.json({
      message: 'found',
      avatar: user.avatar,
      name: user.name,
      surname: user.surname
    })
  } else {
    res.json({
      message: 'not_found'
    })
  }
})

app.post('/api/addFriend', (req, res) => {
  console.log('req.query', req.query)
  console.log('req.body', req.body)
  const username = req.body.username
  const friend = req.body.friend

  if (username === friend) {
    res.json({
      error: 'self_friend',
      message: 'You cannot be friend with yourself'
    })
  } else {
    const userF = users.find(u => u.username === friend)
    if (userF) {
      for (const user of users) {
        if (user.username === username) {
          const already = user.friends.find(u => u === friend)
          if (!already) {
            user.friends.push(friend)
          } else {
            res.json({
              error: 'already_friend',
              message: 'You are already friend with this user'
            })
          }
        }
        if (user.username === friend) {
          const already = user.friends.find(u => u === username)
          if (!already) {
            user.friends.push(username)
          } else {

          }
        }
      }
    }
  }
})

app.post('/api/logout', (req, res) => {
  if (req.session.userId) {
    req.session.userId = 0
    res.json({
      message: 'You are now disconnected'
    })
  } else {
    res.status(401)
    res.json({
      message: 'you are already disconnected'
    })
  }
})

app.post('/api/admin', (req, res) => {
  if (!req.session.userId || req.session.isAdmin === false) {
    res.status(401)
    res.json({ message: 'Unauthorized' })
    return
  }

  res.json({
    message: 'congrats, you are connected'
  })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
