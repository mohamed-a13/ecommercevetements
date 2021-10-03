//Validation creation d'un client
const { check, validationResult } = require('express-validator');

exports.signupValidator = [
  check('pseudo')
    .not()
    .isEmpty()
    .isLength({min: 3, max: 20})
    .trim()
    .escape()
    .withMessage('Le pseudoit doit comporter entre 3 et 30 caractères !'),
  check('email')
    .isEmail()
    .normalizeEmail()
    .withMessage("L'adresse mail n'est pas valide !"),
  check('password')
    .isLength({min: 8, max:8})
    .withMessage('Le mot de passe doit comporter 8 caractères !')
]

exports.validatorResult = (req, rep, next) => {
  
  const result = validationResult(req);
  const hasError = !result.isEmpty();

  if (hasError) {
    const firstError = result.array()[0].msg;
    return rep.status(400).json({
      errorMessage: firstError
    })
    
  }

  next();
}