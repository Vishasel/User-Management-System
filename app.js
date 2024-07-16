
require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const connectDB = require('./server/config/db');

const app = express();
const port = 5000 || process.env.PORT;

//connect to Database 
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static files
app.use(express.static('public'));

//Express session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, //1 week 
    }
  })
);

// Flash Message
app.use(flash({ sessionKeyName: 'flashMessage' }));

//Template engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//Routes
app.use('/', require('./server/routes/customer'));

//Handle 404
app.get('*', (req, res) => {
  res.status(404).render('404');
});

app.listen(port, ()=> {
  console.log(`App listening on port ${port}`);
});


