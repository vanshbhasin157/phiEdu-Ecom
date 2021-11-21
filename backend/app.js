const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser')
require("dotenv/config")
var usersRouter = require('./routes/users');
var products = require('./routes/product');
var productsCategory = require('./routes/productCategory');
const app = express();
const db = require("./models");
const Role = db.role;


app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/users',usersRouter);
app.use('/products',products);
app.use('/categories',productsCategory);

db.sequelize.sync().then(() => {
  
    app.listen(process.env.PORT, () => {
      console.log(`running on: http://localhost:${process.env.PORT}`);
    });
  });

  function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });
  }