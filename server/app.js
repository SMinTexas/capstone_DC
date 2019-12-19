var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var ticketRouter = require('./routes/tickets');
var usersRouter = require('./routes/users');

require('./helpers/zendesk/scheduler').start()

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/tickets', ticketRouter);
app.use('/api/users', usersRouter);

module.exports = app;
