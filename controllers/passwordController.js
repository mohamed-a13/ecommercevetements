const AdminModel = require("../models/Admin");
const TokenSchema = require("../models/Token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Joi = require("joi");

const validate = (Admin) => {
  const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
  });
  return schema.validate(Admin);
};

//Reinitialisation admin

//Envoie du lien de reinitialisation du mdp
module.exports.sendLink = async (req, res) => {

  try {

    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    
    if (error) return res.status(400).send(error.details[0].message)
    
    const admin = await AdminModel.findOne({ email: req.body.email });
    
    if (!admin) return res.status(400).send("L'administrateur avec l'adresse indiqué n'existe pas");
   
      let token = await TokenSchema.findOne({ adminId: admin._id });
    
    if (!token) {
        token = await new TokenSchema({
            adminId: admin._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
    }

    const link = `${process.env.BASE_URL}/password-reset/${admin._id}/${token.token}`;
    await sendEmail(admin.email, "Réinitialisation du mot de passe", link);

    res.send("Un lien vous a été envoyé pour la réinitialisation du mot de passe");
  } catch (error) {
      console.log('Resultat 8: ' + error)
      res.send("Une erreur s'est produit");
      
  }

  }

  //Reinitialisation mdp admin
  module.exports.resetPassword = async (req, res) => {

    try {
      const schema = Joi.object({ password: Joi.string().required() });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const admin = await AdminModel.findById(req.params.adminId);
      if (!admin) return res.status(400).send("Lien invalid ou expiré");

      const token = await Token.findOne({
          adminId: admin._id,
          token: req.params.token,
      });
      if (!token) return res.status(400).send("Lien invalid ou expiré");

      admin.password = req.body.password;
      await admin.save();
      await token.delete();

      res.send("Réinitialisation du mot de passe éffectué.");
    } catch (error) {
        res.send("Un erreur s'est produite");
        console.log(error);
    }

}