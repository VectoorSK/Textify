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
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist/')))
// not working
// app.use(express.limit(100000000))
// app.use(express.bodyParser({ limit: '50mb' }))
// app.use(bodyParser.json({ limit: '10mb' }))
// app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))

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
    description: "➡️ Paris 📍\n🎓 Ecole d'ingénieur ESIEA\n🛹 Street skating\n🌍 Traveling",
    colorApp: '#512DA8'
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
    description: "➡️ Paris 📍\n🎓 Ecole d'ingénieur ESIEA\n⚔️ Live-Action RPG \n🌍 Traveling",
    colorApp: '#512DA8'
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
    description: "➡️ Laval 📍\n🎓 Ecole d'ingénieur ESIEA\n⛵ Sailing boat\n⚜️ Scout de France",
    colorApp: '#512DA8'
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
    description: '➡️ Paris 📍\n🎓 Croatian teacher\n🍻 Partying\n🎮 Video games',
    colorApp: '#512DA8'
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
    date: '19/04/1995',
    description: '➡️ Varazdin 📍\n🎓 Faculty of Organization and Informatics (FOI)\n🍻 Partying\n🎮 Video games',
    colorApp: '#512DA8'
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
    date: '05/03/1999',
    description: '➡️ Varazdin 📍\n🎓 Faculty of Organization and Informatics (FOI)\n🍻 Partying\n🎮 Video games',
    colorApp: '#512DA8'
  }, /*
  {
    avatar: 43,
    background: 7,
    name: 'Edgar',
    surname: 'Belin',
    username: 'Vander Aiden',
    password: 'Password123',
    friends: ['Vector', 'Ari'],
    email: 'ebelin@gmail.com',
    date: '01/09/2003',
    description: '➡️ La Celle St Cloud 📍\n🎓 Lycée Passy Buzenval\n🎮 Video games\n📺 Anime',
    colorApp: '#512DA8'
  }, */
  {
    avatar: 19,
    background: 8,
    name: 'Aristide',
    surname: 'Belin',
    username: 'Ari',
    password: 'Password123',
    friends: ['Vector', 'Edgar'],
    email: 'abelin@gmail.com',
    date: '05/07/2002',
    description: '➡️ La Celle St Cloud 📍\n🎓 Lycée Corneille\n🎮 Video games\n📚 Mangas',
    colorApp: '#512DA8'
  }
]

const conversations = [
  {
    from: 'Vector',
    to: 'Aetaugan',
    from_seen: true,
    to_seen: false,
    content: [
      {
        type: 'text',
        content: 'Hey! Ca va ? 😊',
        sender: 'Vector',
        from: 'Rueil Malmaison - 92500 (France)',
        date: new Date()
      },
      {
        type: 'text',
        content: "Yosh! Ca va tranquille. Tu serais chaud d'aller à Inox à Chatou ? 🎵",
        sender: 'Aetaugan',
        from: 'Fontainebleau - 77920 (France)',
        date: new Date()
      },
      {
        type: 'text',
        content: "Euh bah ouais pourquoi pas c'est quand ? Tu connais les artistes ?",
        sender: 'Vector',
        from: 'Rueil Malmaison - 92500 (France)',
        date: new Date()
      },
      {
        type: 'text',
        content: "C'est le 7 septembre. De ce que je sais y'a Hilight Tribe, ca me suffit! 😝",
        sender: 'Aetaugan',
        from: 'Fontainebleau - 77920 (France)',
        date: new Date()
      },
      {
        type: 'text',
        content: "Bah ouais j'suis chaud 😎, tu sais combien c'est ? Et sinon après on peut toujours squatter chez moi à La Celle si ca te va. Je crois qu'il me reste des bières de Samedi dernier 🍻",
        sender: 'Vector',
        from: 'Rueil Malmaison - 92500 (France)',
        date: new Date()
      },
      {
        type: 'text',
        content: 'Okay, ca marche. Bah vas-y je regarde ca avec la team et je te confirme ca! 😘',
        sender: 'Aetaugan',
        from: 'Fontainebleau - 77920 (France)',
        date: new Date()
      },
      {
        type: 'smiley',
        content: '👌',
        sender: 'Vector',
        from: '',
        date: new Date()
      }
    ]
  },
  {
    from: 'Vector',
    to: 'Nanami',
    from_seen: true,
    to_seen: false,
    content: [
      {
        type: 'text',
        content: 'Hey!! How is your new flat?',
        sender: 'Vector',
        from: 'Paris - 75001 (France)',
        date: new Date()
      },
      {
        type: 'text',
        content: "It's awesome!!! 🤩 My roomates are so nice, they also come from abroad (Brazil and Chile) so we'll both learn French togethers!",
        sender: 'Nanami',
        from: 'Malakoff - 92240 (France)',
        date: new Date()
      },
      {
        type: 'text',
        content: "Oh I see, that's so cool!! Send me some photos when you can 😊",
        sender: 'Vector',
        from: 'Paris - 75001 (France)',
        date: new Date()
      },
      {
        type: 'text',
        content: 'So your flat is next to Malakoff station on M13 ?',
        sender: 'Vector',
        from: 'Paris - 75001 (France)',
        date: new Date()
      },
      {
        type: 'text',
        content: 'Yes exactly, I send you the location so you can see 👀',
        sender: 'Nanami',
        from: 'Malakoff - 92240 (France)',
        date: new Date()
      },
      {
        type: 'pos',
        content: 'https://www.google.com/maps?q=48.817335,2.301201',
        sender: 'Nanami',
        from: '',
        date: new Date()
      },
      {
        type: 'text',
        content: "Oh okay, you're really close! I look forward to see you there 😁",
        sender: 'Vector',
        from: 'Paris - 75001 (France)',
        date: new Date()
      },
      {
        type: 'text',
        content: 'Yessss ofc!! Grab some beers and come when you want 😜🍻',
        sender: 'Nanami',
        from: 'Malakoff - 92240 (France)',
        date: new Date()
      },
      {
        type: 'smiley',
        content: '🍻',
        sender: 'Vector',
        from: 'Paris - 75001 (France)',
        date: new Date()
      }
    ]
  },
  {
    from: 'Elic',
    to: 'Aetaugan',
    from_seen: true,
    to_seen: false,
    content: [
      {
        type: 'text',
        content: 'Hey! Ca va ? 😊',
        sender: 'Elic',
        from: 'Rueil Malmaison - 92500 (France)',
        date: new Date()
      }
    ]
  },
  {
    from: 'Sima',
    to: 'Aetaugan',
    from_seen: true,
    to_seen: false,
    content: [
      {
        type: 'text',
        content: 'Hey! Ca va ? 😊',
        sender: 'Sima',
        from: 'Rueil Malmaison - 92500 (France)',
        date: new Date()
      }
    ]
  },
  {
    from: 'Nanami',
    to: 'Aetaugan',
    from_seen: true,
    to_seen: false,
    content: [
      {
        type: 'text',
        content: 'Hey! Ca va ? 😊',
        sender: 'Nanami',
        from: 'Rueil Malmaison - 92500 (France)',
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
  const { username, friendname } = req.body
  const friend = users.find(u => u.username === friendname)
  const conv = conversations.find(c => (c.from === username && c.to === friendname) || (c.from === friendname && c.to === username))

  if (friend) {
    const reqFriend = {
      avatar: friend.avatar,
      name: friend.name,
      surname: friend.surname
    }
    const isConv = !!conv
    let notif
    if (conv) {
      notif = !!((conv.from === username && !conv.from_seen) || (conv.to === username && !conv.to_seen))
    }

    res.json({
      message: 'found',
      friend: reqFriend,
      isConv: isConv,
      notif: notif
    })
  } else {
    res.json({
      message: 'not_found'
    })
  }
})

app.post('/api/getFriendProfile', (req, res) => {
  const user = users.find(u => u.username === req.body.username)
  if (user) {
    const friend = {
      name: user.name,
      surname: user.surname,
      username: user.username,
      email: user.email,
      birthday: user.date,
      avatar: user.avatar,
      background: user.background,
      description: user.description
    }
    res.json({
      message: 'found',
      friend: friend
    })
  } else {
    res.json({
      message: 'not_found'
    })
  }
})

app.post('/api/addFriend', (req, res) => {
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
              list: user.friends,
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

app.post('/api/getNotif', (req, res) => {
  const username = req.body.username
  const convs = conversations.filter(c => (c.from === username || c.to === username))
  // console.log(convs)
  let notif = 0
  if (convs) {
    for (const conv of convs) {
      if ((conv.from === username && !conv.from_seen) || (conv.to === username && !conv.to_seen)) {
        notif++
      }
    }
    res.json({
      notif: notif
    })
  }
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

app.post('/api/changeColor', (req, res) => {
  const username = req.body.username
  const newColor = req.body.color

  const user = users.find(u => u.username === username)

  if (user) {
    for (const usr of users) {
      if (usr.username === user.username) {
        usr.colorApp = newColor
      }
    }
    res.json({
      status: 1,
      message: 'color changed'
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

  const to = To ? {
    avatar: To.avatar,
    background: To.background,
    name: To.name,
    surname: To.surname,
    username: To.username,
    email: To.email,
    birthday: To.date,
    description: To.description,
    colorApp: To.colorApp
  } : {}

  if (conv) {
    for (const c of conversations) {
      if ((c.from === user1 && c.to === user2) || (c.from === user2 && c.to === user1)) {
        c.from_seen = c.from === user1 ? true : c.from_seen
        c.to_seen = c.to === user1 ? true : c.to_seen
      }
    }
    res.json({
      status: 1,
      message: 'conversation trouvé',
      content: conv.content,
      From: From,
      To: to,
      from_seen: conv.from === user1 ? conv.from_seen : conv.to_seen,
      to_seen: conv.to === user1 ? conv.from_seen : conv.to_seen
    })
  } else if (From && To) {
    res.json({
      status: 0,
      message: 'aucune conversation trouvé',
      From: From,
      To: to
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

    for (const c of conversations) {
      if (c.from === from && c.to === to) {
        c.from_seen = true
        c.to_seen = false
      } else if (c.from === to && c.to === from) {
        c.from_seen = false
        c.to_seen = true
      }
    }

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
    const mess = {
      from: from,
      to: to,
      from_seen: true,
      to_seen: false,
      content: [message]
    }
    conversations.push(mess)
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
  const userCheck = users.find(u => u.username === req.body.user.username)
  const emailCheck = users.find(u => u.email === req.body.user.email)
  if (!userCheck) {
    if (!emailCheck) {
      users.push(req.body.user)
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
