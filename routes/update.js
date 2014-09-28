/*
 * I reorganized these two update routes into the same file.
 */

exports.doPut = function(req, res){
  res.render('verbs', { verb: 'PUT', message: req.body.testString});
};

exports.doPost = function(req, res){
  res.render('verbs', { verb: 'POST', message: req.body.testString});
};