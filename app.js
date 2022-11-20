require('./models/db');

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./router');



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Set Templating Enginge
app.set('view engine', 'ejs')

app.use('/', require('./router'));

app.listen(3000);