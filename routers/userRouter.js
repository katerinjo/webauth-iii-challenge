const router = require('express').Router();
const bcrypt = require('bcrypt');
const foos = require('../data/fooData');
const db = require('../data/dbConfig');
const restricted = require('../middleware/restricted');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const sessionConfig = {
  name: 'user-session',
  secret: process.env.SESSION_SECRET || "it's a secret",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: process.env.SESSION_SECURE || true,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: db,
    tablename: 'knexsessions',
    sidfieldname: 'sessionid',
    createtable: true,
    clearInterval: 1000 * 60 * 30
  })
};

router.use(session(sessionConfig));

router.get('/', (req, res) => {
  res.status(200).json({ route: req.url, recieved: req.body });
});

module.exports = router;
