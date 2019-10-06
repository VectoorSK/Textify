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
    background: 7,
    name: 'Victor',
    surname: 'Belin',
    username: 'Vector',
    password: 'Password123',
    friends: ['Aetaugan', 'Knokerr', 'Nanami', 'Sima', 'Elic', 'Ari', 'Edgar'],
    email: 'belin@et.esiea.fr',
    date: '13/11/1997',
    description: '🛹✈️🌍'
  },
  {
    avatar: 16,
    background: 2,
    name: 'Camille',
    surname: 'Regis',
    username: 'Aetaugan',
    password: 'Password123',
    friends: ['Vector', 'Knokerr', 'Nanami', 'Sima', 'Elic'],
    email: 'regis@et.esiea.fr',
    date: '11/04/1997',
    description: ''
  },
  {
    avatar: 1,
    background: 3,
    name: 'Alexis',
    surname: 'Cuvillier',
    username: 'Knokerr',
    password: 'Password123',
    friends: ['Aetaugan', 'Vector'],
    email: 'acuvillier@et.esiea.fr',
    date: '01/01/1994',
    description: ''
  },
  {
    avatar: 17,
    background: 4,
    name: 'Marina',
    surname: 'Kovacic',
    username: 'Nanami',
    password: 'Password123',
    friends: ['Aetaugan', 'Vector', 'Sima', 'Elic'],
    email: 'mkovacic@gmail.com',
    date: '25/05/1992',
    description: ''
  },
  {
    avatar: 7,
    background: 5,
    name: 'Simona',
    surname: 'Kovacic',
    username: 'Sima',
    password: 'Password123',
    friends: ['Aetaugan', 'Vector', 'Nanami', 'Elic'],
    email: 'skovacic@gmail.com',
    date: '01/01/1995',
    description: ''
  },
  {
    avatar: 47,
    background: 6,
    name: 'Ela',
    surname: 'Kovacic',
    username: 'Elic',
    password: 'Password123',
    friends: ['Aetaugan', 'Vector', 'Nanami', 'Sima'],
    email: 'ekovacic@gmail.com',
    date: '01/01/1998',
    description: ''
  },
  {
    avatar: 43,
    background: 7,
    name: 'Edgar',
    surname: 'Belin',
    username: 'Edgar',
    password: 'Password123',
    friends: ['Vector', 'Ari'],
    email: 'abelin@gmail.com',
    date: '01/09/2003',
    description: ''
  },
  {
    avatar: 19,
    background: 8,
    name: 'Aristide',
    surname: 'Belin',
    username: 'Ari',
    password: 'Password123',
    friends: ['Vector', 'Edgar'],
    email: 'ebelin@gmail.com',
    date: '05/07/2002',
    description: ''
  }
]

const conversations = [
  {
    from: 'Vector',
    to: 'Aetaugan',
    content: [
      {
        type: 'text',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis officia fugiat sunt id dignissimos porro, corrupti iusto, ullam animi nemo dolore totam doloremque ipsam magni, ea similique. Voluptatum, perferendis perspiciatis?',
        sender: 'Vector',
        from: 'Paris - 75001 (France)',
        date: new Date()
      },
      {
        type: 'text',
        content: 'Veritatis officia fugiat sunt id dignissimos porro, corrupti iusto, ullam animi nemo dolore totam doloremque ipsam magni, ea similique. Voluptatum, perferendis perspiciatis?',
        sender: 'Aetaugan',
        from: 'Varazdin - 42000 (Hrvatska)',
        date: new Date()
      }
    ]
  },
  {
    from: 'Vector',
    to: 'Nanami',
    content: [
      {
        type: 'text',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis officia fugiat sunt id dignissimos porro, corrupti iusto, ullam animi nemo dolore totam doloremque ipsam magni, ea similique. Voluptatum, perferendis perspiciatis?',
        sender: 'Vector',
        from: 'Paris - 75001 (France)',
        date: new Date()
      },
      {
        type: 'text',
        content: 'Veritatis officia fugiat sunt id dignissimos porro, corrupti iusto, ullam animi nemo dolore totam doloremque ipsam magni, ea similique. Voluptatum, perferendis perspiciatis?',
        sender: 'Nanami',
        from: 'Varazdin - 42000 (Hrvatska)',
        date: new Date()
      },
      {
        type: 'text',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        sender: 'Vector',
        from: 'Paris - 75001 (France)',
        date: new Date()
      },
      {
        type: 'text',
        content: 'blablablabla',
        sender: 'Vector',
        from: 'Paris - 75001 (France)',
        date: new Date()
      },
      {
        type: 'text',
        content: 'blablablablablablablabla',
        sender: 'Nanami',
        from: 'Varazdin - 42000 (Hrvatska)',
        date: new Date()
      }
    ]
  }
]

app.post('/api/loadUser', (req, res) => {
  const user = users.find(u => u.username === req.body.username)
  if (user) {
    res.json({
      message: 'user loaded',
      friends: user.friends
    })
  } else {
    res.json({
      message: 'user not found'
    })
  }
})

app.post('/api/getInfo', (req, res) => {
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
            res.json({
              message: friend + ' has been added to your friendlist'
            })
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
          }
        }
      }
    }
  }
})

app.post('/api/delFriend', (req, res) => {
  console.log('req.query', req.query)
  console.log('req.body', req.body)
  const username = req.body.username
  const fname = req.body.friend
  let done = 0

  const user = users.find(u => u.username === username)
  if (user) {
    const id = user.friends.findIndex(f => f === fname)
    user.friends.splice(id, 1)
    done++
  }

  const friend = users.find(u => u.username === fname)
  if (friend) {
    const id = friend.friends.findIndex(f => f === username)
    friend.friends.splice(id, 1)
    done++
  }

  if (done === 0) {
    res.json({
      message: 'erreur lors des suppressions dans la friend list'
    })
  } else if (done === 1) {
    res.json({
      message: "erreur lors d'une suppression dans la friend list"
    })
  } else {
    res.json({
      message: 'Amis supprimés correctement'
    })
  }
})

app.post('/api/getConvList', (req, res) => {
  const username = req.body.username
  const convList = []
  const convs = conversations.filter(c => (c.from === username || c.to === username))

  if (convs) {
    for (const conv of convs) {
      const item = conv.from === username ? conv.to : conv.from
      convList.push(item)
    }
  }
  res.json({
    convList: convList
  })
})

app.post('/api/changeAvatar', (req, res) => {
  const username = req.body.username
  const newAv = req.body.avatar

  const user = users.find(u => u.username === username)

  if (user) {
    for (const usr of users) {
      if (usr.username === user.username) {
        usr.avatar = newAv
      }
    }
    res.json({
      status: 1,
      message: 'avatar changed'
    })
  } else {
    res.json({
      status: -1,
      message: 'user not found'
    })
  }
})

app.post('/api/changeBackground', (req, res) => {
  const username = req.body.username
  const newBG = req.body.background

  const user = users.find(u => u.username === username)

  if (user) {
    for (const usr of users) {
      if (usr.username === user.username) {
        usr.background = newBG
      }
    }
    res.json({
      status: 1,
      message: 'background changed'
    })
  } else {
    res.json({
      status: -1,
      message: 'user not found'
    })
  }
})

app.post('/api/getConv', (req, res) => {
  const user1 = req.body.from
  const user2 = req.body.to

  const conv = conversations.find(c => (c.from === user1 && c.to === user2) || (c.from === user2 && c.to === user1))
  const From = users.find(u => u.username === user1)
  const To = users.find(u => u.username === user2)

  if (conv) {
    res.json({
      status: 1,
      message: 'conversation trouvé',
      content: conv.content,
      From: From,
      To: To
    })
  } else if (From && To) {
    res.json({
      status: 0,
      message: 'aucune conversation trouvé',
      From: From,
      To: To
    })
  } else {
    const wrongUser = !From ? user1 : user2
    res.json({
      status: -1,
      message: wrongUser + " n'existe pas"
    })
  }
})

app.post('/api/sendMess', (req, res) => {
  const { from, to, message } = req.body

  const conv = conversations.find(c => (c.from === from && c.to === to) || (c.from === to && c.to === from))
  const userFrom = users.find(u => u.username === from)
  const userTo = users.find(u => u.username === to)

  if (conv) {
    conv.content.push(message)

    if (message.type === 'pos') {
      let loadId = conv.content.findIndex(m => m.type === 'load')
      while (loadId !== -1) {
        conv.content.splice(loadId, 1)
        loadId = conv.content.findIndex(m => m.type === 'load')
      }
    }

    res.json({
      message: 'message ajouté à la discution'
    })
  } else if (userTo && userFrom) {
    // on crée une nouvelle conv
    const conv = {
      from: from,
      to: to,
      content: [message]
    }
    conversations.push(conv)
    res.json({
      message: 'une nouvelle discution à été créee'
    })
  } else {
    const notFound = !userFrom ? from : to
    res.json({
      message: notFound + " n'existe pas"
    })
  }
})

app.post('/api/upload-file', (req, res) => {
  console.log(req)
})

app.post('/api/addUser', (req, res) => {
  const userCheck = users.find(u => u.username === req.body.username)
  const emailCheck = users.find(u => u.email === req.body.email)
  // A CHANGER
  if (!userCheck) {
    if (!emailCheck) {
      users.push({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        birthday: req.body.date
      })
      res.json({
        message: 'In !'
      })
    } else {
      res.status(400).json({
        error: 'Email already used'
      })
    }
  } else {
    res.status(400).json({
      error: 'Username already used'
    })
  }
})

app.post('/api/changeSettings', (req, res) => {
  const userCheck = users.find(u => u.username === req.body.username)

  if (userCheck) {
    userCheck.email = req.body.email
    userCheck.description = req.body.description

    res.json({
      email: userCheck.email,
      description: userCheck.description
    })
  } else {
    res.status(400).json({
      error: 'Username not found'
    })
  }
})

app.post('/api/login', (req, res) => {
  console.log('req.query', req.query)
  console.log('req.body', req.body)

  if (!req.session.userId) {
    // connect the user
    const user = users.find(u => u.username === req.body.username)
    if (!user) {
      res.status(401).json({
        message: 'Wrong Username'
      })
    } else {
      if (user.password !== req.body.password) {
        res.status(401).json({
          message: 'Wrong Password'
        })
      } else {
        res.json({
          user: user
        })
      }
    }
  } else {
    res.status(401)
    res.json({
      message: 'You are already connected'
    })
  }
})

app.get('/api/logout', (req, res) => {
  if (req.session.userId) {
    res.json({
      message: 'You are now disconnected'
    })
  } else {
    res.status(401)
    res.res({
      message: 'You are already disconnected'
    })
  }
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
