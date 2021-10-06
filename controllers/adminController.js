const AdminModel = require('../models/Admin');
const ObjectID = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const {signInErrors} = require('../utils/errorUtils');
require('dotenv').config({path: '../config/.env'});

maxAge = 3 * 24 * 60 * 60 * 1000
const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
}

//Inscription admin
module.exports.createAdmin = async (req, rep) => {
  
  const {pseudo, email, password} = req.body

  try {
    const admin = await AdminModel.create({pseudo, email, password});
    rep.status(201).json({admin: admin._id})
  }
  catch(err) {
    console.log("error inscription: " + err)
  }
}

//Info admin
module.exports.infoAdmin = (req, rep) => {

  if(!ObjectID.isValid(req.params.id)) {
    return rep.status(400).send('ID unknown: ' + req.params.id)
  }
  AdminModel.findById(req.params.id, (err, docs) => {
    if(!err) rep.send(docs);
    else console.log('ID unknown: ' + err)
  })
  .select('-password')
}

//Modification admin
module.exports.updateAdmin = async (req, rep) => {

  if (!ObjectID.isValid(req.params.id))
    return rep.status(400).send("ID unknown : " + req.params.id);

  try {
    await AdminModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          pseudo: req.body.pseudo,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        console.log('Resultat 1: ' + req.body)
        if (!err) return rep.send(docs);
        
      }
    );
  } catch (err) {
    console.log('Resultat 2: ' + req.body)
    return rep.status(500).json({ message: err });
  }
};

//Suppression admin
module.exports.deleteAdmin = async (req, rep) => {

  if (!ObjectID.isValid(req.params.id))
    return rep.status(400).send("ID unknown : " + req.params.id);

    try {
      await AdminModel.remove({ _id: req.params.id }).exec();
      rep.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
      return rep.status(500).json({ message: err });
    }
}


//Connexion admin
module.exports.loginAdmin = async (req, rep) => {
  const { email, password } = req.body

  try {
    const admin = await AdminModel.login(email, password);
    const token = createToken(admin._id)
    rep.cookie('jwt', token, { httpOnly: true, maxAge })
    rep.status(200).json({admin: admin._id})
  }
  catch (err) {
    const errors = signInErrors(err)
    rep.status(200).json({ errors })
  }
}

//Deconnexion admin
module.exports.logoutAdmin = (req, rep) => {
  rep.cookie('jwt', '', {maxAge: 1});
  rep.redirect('/');
}

