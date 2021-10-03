const express = require('express');
const router = express.Router();
const { signupValidator, validatorResult } = require('../middelware/validator');
const {signupUser, userInfo, updateUser, deleteUser } = require('../controllers/authController');

//Inscription client
router.post('/signup', signupValidator, validatorResult, signupUser);
//Info du client
router.get('/:id', userInfo);
//Modification du client
router.put('/:id', updateUser);
//Suppression du client
router.delete('/:id', deleteUser);

module.exports = router;