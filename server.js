const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const cors = require('cors')
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

const corsWhiteList = ['http://localhost:3000']
const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin)
    if (corsWhiteList.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(null, false)
    }
  }
}
app.use(cors(corsOptions))



var routes_setter = require('./config/routes.js');
routes_setter(app);

app.listen(port, function() {
  console.log('Listening on', port);
});