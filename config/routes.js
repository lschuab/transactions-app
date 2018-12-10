const users = require("../controllers/users.js")
const transactions = require("../controllers/transactions.js")

module.exports = function(app){
  app.get('/users', users.index)
  app.get('/users/:id', users.read)
  app.post('/users', users.create)
  app.put('/users/:id', users.replace)
  app.patch('/users/:id', users.modify)
  app.delete('/users/:id', users.delete)

  app.get('/users/:id/transactions', users.readTransactions)
  app.post('/users/:id/transactions',users.createTransaction)
  
  app.get('/transactions', transactions.index)
  app.get('/transactions/:id', transactions.read)
  app.post('/transactions', transactions.create)
  app.patch('/transactions/:id', transactions.modify)
  app.delete('/transactions/:id', transactions.delete)

};