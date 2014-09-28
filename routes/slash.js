/*
 * GET home page.
 */

exports.pathless = function(req, res){
  res.render('home.ejs', { title: 'Hello Express'});
};