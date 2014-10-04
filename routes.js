var express = require('express'),

    //controllers
    routes = require('./routes/slash'),
    update = require('./routes/update'),
    chore_controller = require('./routes/chore_controller'),
    house_controller = require('./routes/house_controller'),

    //
    http = require('http'),
    path = require('path'),
    passport = require('passport'),
    util = require('util'),
    url = require('url'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    gcal = require('google-calendar'),
    configAuth = require('./models/auth'),

    //for local authentication
    mongoose = require('mongoose'),
    flash    = require('connect-flash'),
    morgan       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    session      = require('express-session'),
    
    // load the auth variables
    this_user = configAuth.this_user,
    google_user = configAuth.google_user,
    venmo_user = configAuth.venmo_user,
    groupme_user = configAuth.groupme_user;


module.exports = function(app,passport){
app.get('/', function(req,res){
	message = req.flash('loginMessage');
	res.render('home.ejs', {message: message});
});

/* ===== TABLE OF CONTENTS =====

- SIGNUP
- LOGIN
- GOOGLE
- LOGOUT
- DASHBOARD AND SETTINGS
- HOUSE
- CHORES
- BILLS
- CALENDAR
- GROCERY
- CHAT

- FUNCTIONS

   ===== Please update as you go ===== */

// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form
app.get('/signup', function(req, res) {
	// render the page and pass in any flash data if it exists
	res.render('signup.ejs', { message: req.flash('signupMessage') });
});

// process the signup form
app.post('/signup', passport.authenticate('local-signup', {
	successRedirect : '/dashboard', // redirect to the secure profile section
	failureRedirect : '/signup', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));

// =====================================
// LOGIN ===============================
// =====================================
// show the login form
app.get('/login', function(req, res) {
	// render the page and pass in any flash data if it exists
	res.render('login.ejs', { message: req.flash('loginMessage') }); 
});

// process the login form
app.post('/login', passport.authenticate('local-login', {
	successRedirect : '/dashboard', // redirect to the secure profile section
	failureRedirect : '/', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));

// =====================================
// GOOGLE ==============================
// =====================================
//google login
app.get('/login-google', function(req, res){
  // if (isLoggedIn){
  //   gapi.auth.signOut();
  // }else{
    res.redirect('/auth/google');
  // } 
});

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
  passport.authenticate('google', { failureRedirect: '/login-google' }),
  function(req, res) {
    // Successful authentication, redirect home.
    // res.redirect('/');
    // res.redirect('/settings'); << uncomment this
    getCalendarInformation(req, res);
});


// =====================================
// LOGOUT ==============================
// =====================================
app.get('/logout', function(req, res) {
	resetUsers();

	req.logout();
	res.redirect('/');
});

// =====================================
// DASHBOARD AND SETTINGS ==============
// =====================================
app.get('/dashboard', isLoggedIn, function(req, res) {
	if (this_user.email == ""){
		this_user.email = req.user.local.email;
		this_user.first_name = req.user.local.firstname;
		this_user.last_name = req.user.local.lastname;
		this_user.name = req.user.local.firstname + " " + req.user.local.lastname;
		this_user.picture = req.user.local.picture;
	}
	res.render('dashboard.ejs', {
		user : this_user // get the user out of session and pass to template
	});
});

app.get('/settings', isLoggedIn, function(req, res){
	console.log(this_user);
	res.render('settings', {
    user: this_user,
    google_user: google_user,
    venmo_user: venmo_user,
    groupme_user: groupme_user
  })
})


// =====================================
// HOUSE ===============================
// =====================================

// show house registration form
app.get('/house', function(req, res) {
  res.render('house_register.ejs', { message: req.flash('signupMessage') });
});

//makes new House object is Houses collection
app.post('/house', house_controller.post);



// =====================================
// CHORES ==============================
// =====================================

app.get('/chores', isLoggedIn, function(req, res){
  getChores(req, res, this_user);
  res.render('chore', {
    user: this_user
  });
})

app.post('/addchore', isLoggedIn, function(req, res){
  // getChores(req, res, this_user);
  res.render('addChore', {
    user: this_user
  });
})

// app.get('/addchore', isLoggedIn, function(req, res){
//   // getChores(req, res, this_user);
//   // res.render('addChore', {
//   //   user: this_user
//   // });
// 	// res.render('chore', {user: this_user});
// 	console.log("------ GET /ADDCHORE redirect ------");
// 	res.redirect('/newchore');
// })

app.put('/addchore', chore_controller.addChore);

// app.put('/addchore', isLoggedIn, function(req, res){
// 	console.log("req.body: ",req.body);
// 	console.log("req.body.chore_name: ",req.body.chore_name);
// 	console.log("body.chore_date: ",req.body.chore_date);
// })


// =====================================
// BILLS ===============================
// =====================================

app.get('/bills', isLoggedIn, function(req, res){
  res.render('bills', {
    user: this_user
  });
})


// =====================================
// CALENDAR ============================
// =====================================

app.get('/calendar', isLoggedIn, function(req, res){
  res.render('calendar', {
    user: this_user
  });
})

app.get('/calendar/addevent', isLoggedIn, isLoggedIntoGoogle, function(req, res){
  var query = url.parse(req.url, true).query;
  var event_name = query.event_name;
  console.log("QUERY: ", query);
  console.log('POOOOOOOOOOOP.. start_date: ', query.start_date, +", end_date: "+ query.end_date);
  var start_date = new Date();
  var end_date = new Date();
  end_date.setHours(end_date.getHours() + 1);
  console.log("RANDOM EVENT: start_date: ", start_date, +", end_date: "+end_date);
  createEvent(req, req, "random event tester", start_date, end_date);
})


// =====================================
// GROCERY =============================
// =====================================

app.get('/grocery', isLoggedIn, function(req, res){
  res.render('grocery', {
    user: this_user
  });
})


// =====================================
// CHAT ================================
// =====================================

app.get('/chat', isLoggedIn, function(req, res){
  res.render('chat', {
    user: this_user
  });
})


};

//=====================================================================
//=========================== FUNCTIONS ===============================
//=====================================================================


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}


// function localLogin(username, name, password, req, res){
//   res.redirect('/dashboard');
// }

function isLoggedIntoGoogle(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/login-google');
}



//============================== CALENDAR FUNCTIONS ==============================//
//================================================================================//

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
    'calendarId': google_user.email},
    new_event)
  .withAuthClient(GoogleStrategy)
          .execute(function(err, result) {
            if(err) next(err);
            else {
              console.log("Result: " + result);
              next(null);
            } 
          });


    // { 
    //         start: {
    //           date: start_date
    //         }, 
    //         end: {
    //           date: end_date
    //         }, 
    //         summary: event_name,
    //         description: "pineapples"
    //       });
          // .withAuthClient(jwt)
          // .execute(function(err, result) {
          //   if(err) next(err);
          //   else {
          //     console.log("Result: " + result);
          //     next(null);
          //   } 
          // });

  console.log("new event: "+new_event.summary);
  return false;
}


//============================== CHORE FUNCTIONS ==============================//
//=============================================================================//

function getChores(req, res, user){
 // get all chores
 // if for this_user, add to left side of table
    //get time of event
    //check if time is in google calendar
        //if not: "add to calendar"
        //if yes: "view in calendar"

}

//============================== EXTRA FUNCTIONS ==============================//
//=============================================================================//

function resetUsers(){
	this_user.email = "";
	this_user.name = "";
	this_user.first_name = "";
	this_user.last_name = "";
	this_user.picture = "";
}
