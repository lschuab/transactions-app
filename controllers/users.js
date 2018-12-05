const knex = require("../db/knex.js");

module.exports = {
  index: (req, res) => {
    knex('users')
    .then(response => res.send(response))
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
  },
  
  read: (req, res) => {
    knex('users')
      .where('id', req.params.id)
    .then(response => res.send(response[0]))
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
  },
  
  create: (req, res) => {
    knex('users')
      .insert({
        email: req.body.email,
        password: req.body.password
      })
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
  },
  
  replace: (req, res) => {
    knex('users')
      .where('id', req.params.id)
      .update({
        email: req.body.email,
        password: req.body.password
      })
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
  },
  
  modify: (req, res) => {
    knex('users')
      .where('id', req.params.id)
      .update({
        email: req.body.email,
        password: req.body.password
      })
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
  },
  
  delete: (req, res) => {
    knex('users')
      .where('id', req.params.id)
      .del()
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
    
  },

    readTransactions: (req,res) => {
      knex('transactions')
        .where('user_id', req.params.id)
      .then(response => res.send(response))
      .catch(err => {
        console.log(err)
        res.sendStatus(500)
      })
    },

    createTransactions: (req, res) => {
      knex('transactions')
        .insert({
          user_id: +req.params.id,
          amount: +req.body.amount,
          type: req.body.type,
          business_name: req.body.business_name
        })
      .then(() => res.sendStatus(200))
      .catch(err => {
        console.log(err)
        res.sendStatus(500)
      })
    }
  
}