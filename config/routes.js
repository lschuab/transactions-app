const users = require("../controllers/users.js")
const transactions = require("../controllers/transactions.js")
const jwt = require("jsonwebtoken")
const secret = process.env.JWT_SECRET || 'secret'


module.exports = function(app){

  
  // app.get('/users', users.index)
  // app.get('/users/:id', users.read)
  app.post('/users', users.create)
  app.post('/sessions', users.login)
  // app.put('/users/:id', users.replace)
  // app.patch('/users/:id', users.modify)
  // app.delete('/users/:id', users.delete)
  
  
  app.use(verifyToken)
  app.get('/user', users.verify)

  app.get('/users/:id/transactions', users.readTransactions)
  app.post('/users/:id/transactions',users.createTransaction)
  
  app.get('/transactions', transactions.index)
  app.get('/transactions/:id', transactions.read)
  app.post('/transactions', transactions.create)
  app.patch('/transactions/:id', transactions.modify)
  app.delete('/transactions/:id', transactions.delete)

};

function verifyToken(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['token']

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({success: false, message: "You are not authorized to view that resource, Please log in to continue."})
      } else {
        delete decoded.password
        req.decoded = decoded;
        next()
      }
    })
  } else {
    return res.status(401).send({message: "You are not authorized to view that resource, Please log in to continue."})
  }
}