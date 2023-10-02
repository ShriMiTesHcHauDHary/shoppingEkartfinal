const express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer') // HERE
const route = require('./route/route.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any()) // HERE
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://miteshchaudhary:aA0mvD0zhSy2FDm9@cluster0.xbauynt.mongodb.net/", 
{ useNewUrlParser: true })
    .then(() => console.log('mongodb Rock n Roll on 3000'))
    .catch(err => console.log(err))


app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});