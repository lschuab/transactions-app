const knex = require("../db/knex.js");

module.exports = {
  index: (req, res) => {
    knex('transactions')
    .then(response => res.send(response))
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
  },
  
  read: (req, res) => {
    knex('transactions')
      .where('id', req.params.id)
    .then(response => res.send(response[0]))
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
  },
  
  create: (req, res) => {
    knex('transactions')
      .insert({
        user_id: +req.body.user_id,
        amount: +req.body.amount,
        type: req.body.type,
        business_name: req.body.business_name
      })
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
  },
  
  replace: (req, res) => {
    knex('transactions')
      .where('id', req.params.id)
      .update({
        user_id: +req.body.user_id,
        amount: +req.body.amount,
        type: req.body.type,
        business_name: req.body.business_name
      })
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
  },
  
  modify: (req, res) => {
    knex('transactions')
      .where('id', req.params.id)
      .update({
        user_id: +req.body.user_id,
        amount: +req.body.amount,
        type: req.body.type,
        business_name: req.body.business_name
      })
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
  },
  
  delete: (req, res) => {
    knex('transactions')
      .where('id', req.params.id)
      .del()
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
  }
  
}