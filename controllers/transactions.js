const knex = require("../db/knex.js");

module.exports = {
  index: (req, res) => {
    const page = req.query.page ? +req.query.page : 1
    knex('transactions').orderBy('id', 'asc').offset(100 * (page - 1)).limit(100)
    .then(response => res.send(response))
    .catch(err => {
      res.status(422).send({message: err})
    })
  },
  
  read: (req, res) => {
    knex('transactions')
      .where('id', req.params.id)
    .then(response => res.send(response[0]))
    .catch(err => {
      res.status(422).send({message: err})
    })
  },
  
  create: (req, res) => {
    knex('transactions')
      .insert({
        user_id: +req.decoded.id,
        amount: +req.body.amount,
        type: req.body.type,
        business_name: req.body.business_name
      }, '*')
    .then(response => res.send(response[0]))
    .catch(err => {
      res.status(422).send({message: err})
    })
  },
    
  modify: (req, res) => {
    knex('transactions')
      .where('id', req.params.id)
      .update({
        amount: +req.body.amount,
        type: req.body.type,
        business_name: req.body.business_name
      }, '*')
    .then(response => res.send(response[0]))
    .catch(err => {
      res.status(422).send({message: err})
    })
  },
  
  delete: (req, res) => {
    knex('transactions')
      .where('id', req.params.id)
      .del()
    .then(() => res.status(200).send({message: "Successfully deleted transaction"}))
    .catch(err => {
      res.status(422).send({message: err})
    })
  }
  
}