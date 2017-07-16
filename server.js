var express = require('express'),
    app = exress(),
    port = process.env.port || 8080,
    mongoose = require('mongoose'),
    passport = require('passport'),
    flash = require('connect-flash'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    configDB = require('./config/database.js');

mongoose.connect(configDB.url);

// require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');

app.use(session({secret: 'yrsecrethere'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);

app.listen(port);
console.log('The port ' + port);