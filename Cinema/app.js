var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var Customer=require('./routes/Customer');
var Movie=require('./routes/Movie');

var app = express();

var StaffsModels = require('./models-sequelize/Staffs');
var ChairsModels = require('./models-sequelize/Chairs');
var RoomModels = require('./models-sequelize/Room');
var Room_ChairsModels = require('./models-sequelize/Room_Chairs');
var TicketPriceModels = require('./models-sequelize/TicketPrice');
var ScheduleModels = require('./models-sequelize/Schedule');
var MovieModels = require('./models-sequelize/Movie');
var CustomerModels = require('./models-sequelize/Customer');
var TicketInfoModels = require('./models-sequelize/TicketInfo');

Customer.configure(CustomerModels);
Movie.configure(MovieModels);

StaffsModels.connect(require('./sequelize-params'),
    function(err) {
        if(err)
            throw err;
    });
ChairsModels.connect(require('./sequelize-params'),
    function(err) {
        if(err)
            throw err;
    });
RoomModels.connect(require('./sequelize-params'),
    function(err) {
        if(err)
            throw err;
    });
Room_ChairsModels.connect(require('./sequelize-params'),
    function(err) {
        if(err)
            throw err;
    });
TicketPriceModels.connect(require('./sequelize-params'),
    function(err) {
        if(err)
            throw err;
    });
ScheduleModels.connect(require('./sequelize-params'),
    function(err) {
        if(err)
            throw err;
    });
MovieModels.connect(require('./sequelize-params'),
    function(err) {
        if(err)
            throw err;
    });
CustomerModels.connect(require('./sequelize-params'),
    function(err) {
        if(err)
            throw err;
    });
TicketInfoModels.connect(require('./sequelize-params'),
    function(err) {
        if(err)
            throw err;
    });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//Static page lib
app.use(express.static("public"));
app.use(express.static(__dirname + '/'));




app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/quan-ly-khach-hang',Customer.View);
app.use('/quan-ly-phim', Movie.View);
/*app.post('/customersave', Customer.Insert);*/
app.post('/customersave',Customer.Insert);
app.use('/deleteCustomer',Customer.Delete);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
