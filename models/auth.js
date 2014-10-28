// expose our config directly to our application using module.exports
module.exports = {

	'googleAuth' : {
		'clientID' 		: "1081633470046-i1mu5lod8r6t1q2om0tipi1q3nittgoi.apps.googleusercontent.com",
		'clientSecret' 	: "l4IIzpqyXK6oz84K0-yYOeKO",
		'callbackURL' 	: 'http://localhost:44444/auth/google/callback'
	},

	'this_user' : {
	  email: "",
	  name: "",
	  first_name: "",
	  last_name: "",
	  picture: "",
	  uid: "",
	  house_id: "",
	  members: []
	},

	'google_user' : {
	  'name': "",
	  'first_name': "",
	  'email': "You are not logged in",
	  'accessToken': "",
	  'refreshToken': "",
	  'picture': "images/no_user.png",
	  'log': "in"
	},

	'venmo_user' : {
	  'name': "",
	  'first_name': "",
	  'email': "You are not logged in",
	  'accessToken': "",
	  'refreshToken': "",
	  'picture': "images/no_user.png",
	  'log': "in"
	},

	'groupme_user' : {
	  'name': "",
	  'first_name': "",
	  'email': "You are not logged in",
	  'accessToken': "",
	  'refreshToken': "",
	  'picture': "images/no_user.png",
	  'log': "in"
	}

};