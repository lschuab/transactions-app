const knex = require("../db/knex.js");
const hasher = require("../config/hasher.js");
const jwt = require("jsonwebtoken")
const secret = process.env.JWT_SECRET || 'secret'

module.exports = {
  // index: (req, res) => {
  //   knex('users')
  //   .then(response => res.send(response))
  //   .catch(err => {
  //     res.status(422).send({message: err})
  //   })
  // },
  
  // read: (req, res) => {
  //   knex('users')
  //     .where('id', req.params.id)
  //   .then(response => res.send(response[0]))
  //   .catch(err => {
  //     res.status(422).send({message: err})
  //   })
  // },
  
  create: (req, res) => {
    hasher.hash(req.body)
    .then(user => {
      knex('users')
        .insert({
          email: user.email,
          password: user.password
        }, 'id')
      .then(results => res.send({
        message: "Successfully registered, please log in",
        id: results[0]
      }))
      .catch(err => {
        res.status(400).send({message: err})
      })
    })
  },

  login: (req, res) => {
    knex('users').where('email', req.body.email)
      .first()
      .then(user => {
        if(user) {
          hasher.check(user, req.body).then(isMatch => {
            if (isMatch) {
              const token = jwt.sign(user, secret)
              delete user.password
              res.json({message: "Successfully signed in", token, user})
            } else {
              res.status(400).send({message: 'Invalid Email / Password'})
            }
          })
        } else {
          res.status(400).send({message: 'Invalid Email / Password'})
        }
      }).catch(err => {
        res.status(400).send({message: 'Invalid Email / Password'})
      })
  },

  verify: (req, res) => {
    res.json(req.decoded)
  },
  
  // replace: (req, res) => {
  //   knex('users')
  //     .where('id', req.params.id)
  //     .update({
  //       email: req.body.email,
  //       password: req.body.password
  //     })
  //   .then(() => res.sendStatus(200))
  //   .catch(err => {
  //     res.status(422).send({message: err})
  //   })
  // },
  
  // modify: (req, res) => {
  //   knex('users')
  //     .where('id', req.params.id)
  //     .update({
  //       email: req.body.email,
  //       password: req.body.password
  //     })
  //   .then(() => res.sendStatus(200))
  //   .catch(err => {
  //     res.status(422).send({message: err})
  //   })
  // },
  
  // delete: (req, res) => {
  //   knex('users')
  //     .where('id', req.params.id)
  //     .del()
  //   .then(() => res.sendStatus(200))
  //   .catch(err => {
  //     res.status(422).send({message: err})
  //   })
    
  // },

    readTransactions: (req,res) => {
      const page = req.query.page ? +req.query.page : 1
      knex('transactions')
        .where('user_id', req.params.id)
        .orderBy('id', 'asc')
        .offset(100 * (page - 1)).limit(100)
      .then(response => res.send(response))
      .catch(err => {
        res.status(422).send({message: err})
      })
    },

    createTransaction: (req, res) => {
      knex('transactions')
        .insert({
          user_id: +req.params.id,
          amount: +req.body.amount,
          type: req.body.type,
          business_name: req.body.business_name
        })
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(422).send({message: err})
      })
    }
  
}