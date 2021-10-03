const UserModel = require('../models/User');
const ObjectID = require('mongoose').Types.ObjectId;

//Inscription
module.exports.signupUser = async (req, rep) => {
  
  const {pseudo, email, password} = req.body

  try {
    const user = await UserModel.create({pseudo, email, password});
    rep.status(201).json({user: user._id})
  }
  catch(err) {
    console.log("error inscription: " + err)
  }
}

//Info client
module.exports.userInfo = (req, rep) => {

  if(!ObjectID.isValid(req.params.id)) {
    return rep.status(400).send('ID unknown: ' + req.params.id)
  }
  UserModel.findById(req.params.id, (err, docs) => {
    if(!err) rep.send(docs);
    else console.log('ID unknown: ' + err)
  })
  .select('-password')
}

//Modification client
module.exports.updateUser = async (req, rep) => {

  if (!ObjectID.isValid(req.params.id))
    return rep.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          pseudo: req.body,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return rep.send(docs);
      
      }
    );
  } catch (err) {
    return rep.status(500).json({ message: err });
  }
};

//Suppression client
module.exports.deleteUser = async (req, rep) => {

  if (!ObjectID.isValid(req.params.id))
    return rep.status(400).send("ID unknown : " + req.params.id);

    try {
      await UserModel.remove({ _id: req.params.id }).exec();
      rep.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
      return rep.status(500).json({ message: err });
    }
}