const express = require('express');
const router = express.Router();
const { signupValidator, validatorResult } = require('../middelware/validator');
const {createAdmin, infoAdmin, updateAdmin, deleteAdmin, loginAdmin, logoutAdmin} = require('../controllers/adminController');

//Inscription admin
router.post('/signup', signupValidator, validatorResult, createAdmin);
//Info admin
router.get('/:id', infoAdmin);
//Modification admin
router.put('/:id', updateAdmin);
//Suppression admin
router.delete('/:id', deleteAdmin);
//Connexion admin
router.post('/login', loginAdmin);
//Deconnexion admin
router.get('/logout', logoutAdmin);

module.exports = router;