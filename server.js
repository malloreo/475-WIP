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
    configAuth = require('./auth');
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
  // app.use(flash()); // use connect-flash for flash messages stored in session

  app.use(app.router); // Do the routes defined below
  app.use(express.static(path.join(__dirname, 'public')));  // Process static files


});

app.get('/', routes.pathless);  
// app.get('/users', user.list);   
// app.post('/request', update.doPost);  // example handling of a POST request 
// app.put('/request', update.doPut);      // example handling of a PUT request

app.post('/login', function(req, res){
  res.render('dashboard', { user: req.body.user });
});

app.get('/localLogin', function(req, res){
  console.log('req: '+req, " res: "+res);
  localLogin("ThisIsMyUsername", "Chanamon Ratanalert", "", req, res);
})

app.get('/settings', function(req, res){
  res.render('settings', {
    user: this_user,
    google_user: google_user,
    venmo_user: venmo_user,
    groupme_user: groupme_user
  })
})

app.get('/login-google', function(req, res){
  // if (isLoggedIn){
  //   gapi.auth.signOut();
  // }else{
    res.redirect('/auth/google');
  // } 
});

// route for logging out
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// app.get('/dashboard', isLoggedIn, function(req, res){
app.get('/dashboard', function(req, res){
  res.render('dashboard', {
    user: this_user
  });
})

//-------------------- CHORES --------------------//

app.get('/chores', function(req, res){
  res.render('chore', {
    user: this_user
  });
})

//-------------------- BILLS --------------------//

app.get('/bills', function(req, res){
  res.render('bills', {
    user: this_user
  });
})

//-------------------- CALENDAR --------------------//

app.get('/calendar', function(req, res){
  res.render('calendar', {
    user: this_user
  });
})

app.get('/calendar/addevent', function(req, res){
  var query = url.parse(req.url, true).query;
  var event_name = query.event_name;
  console.log("QUERY: ", query);
  console.log('POOOOOOOOOOOP.. start_date: ', query.start_date, +", end_date: "+ query.end_date);
  var start_date = new Date();
  var end_date = new Date();
  end_date.setHours(end_date.getHours() + 1);
  console.log("RANDOM EVENT: start_date: ", start_date, +", end_date: "+end_date);
  createEvent(req, req, event_name, start_date, end_date);
})

//-------------------- GROCERY --------------------//

app.get('/grocery', function(req, res){
  res.render('grocery', {
    user: this_user
  });
})

//-------------------- CHAT --------------------//

app.get('/chat', function(req, res){
  res.render('chat', {
    user: this_user
  });
})


app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
                                            'https://www.googleapis.com/auth/userinfo.email',
                                            'https://www.googleapis.com/auth/calendar',
                                            'https://www.googleapis.com/auth/calendar.readonly'] }),
  function(req, res){
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
  });

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    // res.redirect('/');
    // res.redirect('/settings'); << uncomment this
    getCalendarInformation(req, res);
  });


app.listen(44444);
console.log("Express server listening on port 44444");


function localLogin(username, name, password, req, res){
  res.redirect('/dashboard');
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}



//------------------------------ CALENDAR FUNCTIONS ------------------------------//

function getCalendarInformation(req, res){
  var accessToken = google_user.accessToken;
  var google_calendar = new gcal.GoogleCalendar(accessToken);
  //Query parameter setup
  var today = new Date();
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(23);
  tomorrow.setMinutes(59);
  var cal_items = [];
  google_calendar.calendarList.list(function(err, calendarList) {
    //Use this for just their personal calendar
    cal_items = [{"id": google_user.email}]; //google_user.email}];

    console.log("----Cal Items----: ", cal_items);
    google_calendar.events.list(google_user.email, {'timeMin':today}, function(err, data) {
        console.log("Error: ", err);
        console.log('events');
        console.log(data);
      }
    );
    var freeBusyInfo = google_calendar.freebusy.query({
        'timeMin': today,
        'timeMax': tomorrow,
        'items': cal_items
      },
      {},
      function(err, data){
        // console.log(google_user);
        console.log("Error: ", err);
        console.log("CALENDAR FREEBUSY: ", data);
        //Only accounts for the user's personal calendar
        console.log('Busy Object', data.calendars[google_user.email].busy);
        calendars[google_user.email] = data.calendars[google_user.email].busy;
        console.log(google_user);
        console.log(calendars);
        res.redirect('/settings');
      }
    );


  });
  // res.redirect('/dashboard');// { keep commented out
    // user: google_user.name,
    // name: google_user.first_name,
    // email: google_user.email,
    // picture: google_user.picture });
}

//http://stackoverflow.com/questions/11607465/need-good-example-google-calendar-api-in-javascript/11622475#11622475

function createEvent(req, res, event_name, start_date, end_date){
  var accessToken = user.accessToken;
  var google_calendar = new gcal.GoogleCalendar(accessToken);

  var new_event = {
    "summary": "RANDOM EVENT",
    "location": "Somewhere",
    "start": {
      "dateTime": start_date,
    },
    "end": {
      "dateTime": end_date,
    }
  };
  google_calendar.events.insert({
    'calendarId': google_user.email,
    'new_event': new_event
  });
  // request.execute(function(resp) {
  //   console.log(resp);
  // });

  console.log("new event: "+new_event);

  // Event createdEvent = service.events().insert('primary', event).execute();
}
