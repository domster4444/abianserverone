//TODO:authenticationMiddlware
function authenticationMW(req, res, next) {
  console.log('_________auth middleware________ ');
  next();
}

module.exports = authenticationMW;
