const express = require('express');
const router = express.Router();
const {sendLink, resetPassword} = require('../controllers/passwordController');


//Reinitialisation admin
//Envoie du lien de reinitialisation du mdp
router.post('/', sendLink);
//Reinitialisation mdp admin
router.post('/:id/:token', resetPassword);

module.exports = router;