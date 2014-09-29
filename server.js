var express = require('express'),
    routes = require('./routes/slash'),
    user = require('./routes/user'),
    update = require('./routes/update'),
    http = require('http'),
    path = require('path'),
    passport = require('passport'),
    util = require('util'),
    url = require('url'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    gcal = require('google-calendar'),
    configAuth = require('./auth'),
    //for local authentication
    mongoose = require('mongoose'),
    flash    = require('connect-flash'),
    morgan       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    session      = require('express-session');

db_url='mongodb://localhost:27017/housemates'
// configuration ===============================================================
mongoose.connect(db_url); // connect to our database

require('./passport')(passport); // pass passport for configuration

    // google_calendar = new gcal.GoogleCalendar(accessToken);

// load the auth variables
var this_user = {
  username: "chanamoney",
  name: "Chanamon Ratanalert",
  first_name: "Chanamon",
  email: "chanamon@cmu.edu",
  picture: "images/temp2.jpg"
};

var google_user = {
  'name': "",
  'first_name': "",
  'email': "You are not logged in",
  'accessToken': "",
  'refreshToken': "",
  'picture': "images/no_user.png",
  'log': "in"
}

var venmo_user = {
  'name': "",
  'first_name': "",
  'email': "You are not logged in",
  'accessToken': "",
  'refreshToken': "",
  'picture': "images/no_user.png",
  'log': "in"
}

var groupme_user = {
  'name': "",
  'first_name': "",
  'email': "You are not logged in",
  'accessToken': "",
  'refreshToken': "",
  'picture': "images/no_user.png",
  'log': "in"
}


var GOOGLE_CLIENT_ID = configAuth.googleAuth.clientID,
  GOOGLE_CLIENT_SECRET = configAuth.googleAuth.clientSecret,
  GOOGLE_CALLBACK_URL = configAuth.googleAuth.callbackURL;

var calendars = {};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var users = [];

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Google
    process.nextTick(function() {
      google_user = {
        'name': profile.displayName,
        'first_name': profile.name.givenName,
        'email': profile.emails[0].value,
        'accessToken': accessToken,
        'refreshToken': refreshToken,
        'picture': profile._json.picture,
        'log': 'out'
      };
      return done(null, profile);
    });
  }
));

var app = express();

app.configure(function(){
  app.set('views', __dirname + '/views'); // Set the directory for views
  app.set('view engine', 'ejs');  // Set the view engine to EJS
  app.use(express.favicon()); // Return a favicon if requested
  app.use(express.logger('tiny'));  // Log requests to the console.log
  app.use(express.cookieParser());
  app.use(express.bodyParser());  // Parse the request body into req.body object
  app.use(express.methodOverride()); // Allows you to override HTTP methods on old browsers
  app.use(express.session({ secret: 'pineapple' }));

  // required for passport
  // app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session

  app.use(app.router); // Do the routes defined below
  app.use(express.static(path.join(__dirname, 'public')));  // Process static files

  app.use(morgan('dev')); // log every request to the console
});

require('./routes.js')(app,passport);
// app.get('/', routes.pathless);

// app.post('/login', function(req, res){
//   res.render('dashboard', { user: req.body.user });
// });

// app.get('/localLogin', function(req, res){
//   console.log('req: '+req, " res: "+res);
//   localLogin("ThisIsMyUsername", "Chanamon Ratanalert", "", req, res);
// })



// route for logging out
// app.get('/logout', function(req, res) {
//   req.logout();
//   res.redirect('/');
// });

// app.get('/dashboard', isLoggedIn, function(req, res){
// app.get('/dashboard', function(req, res){
//   res.render('dashboard', {
//     user: this_user
//   });
// })






app.listen(44444);
console.log("Express server listening on port 44444");


