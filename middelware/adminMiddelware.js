const jwt = require('jsonwebtoken');
const AdminModel = require('../models/Admin');
require('dotenv').config({path: '../config/.env'});


module.exports.checkAdmin = (req, rep, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if(err) {
      rep.locals.admin = null;
      // rep.cookie('jwt', '', {maxAge: 1})
      next();
      } else {
        let admin = await AdminModel.findById(decodedToken.id);
        rep.locals.admin = admin;
        console.log(rep.locals.admin)
        next();
      }
    })
  } else {
    rep.locals.admin = null;
    next();
  }
}

module.exports.requireAdmin = (req, rep, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        rep.send(200).json('no token')
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log('No token');
  }
};
