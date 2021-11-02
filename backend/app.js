const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser')
require("dotenv/config")
var usersRouter = require('./routes/users');
const {database} = require('./models/modelExport');
database.sequelize.sync();

const app = express();




app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/users',usersRouter);

app.listen(process.env.PORT,()=>{});

