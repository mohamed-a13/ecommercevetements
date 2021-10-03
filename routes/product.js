const express = require('express');
const router = express.Router();
const { createProduct, productInfo, updateProduct, deleteProduct} = require('../controllers/productController');

//Creation d'un produit
router.post('/create', createProduct);
//Info du produit
router.get('/:id', productInfo);
//Modification du produit
router.put('/:id', updateProduct);
//Supression du produit
router.delete('/:id', deleteProduct);

module.exports = router;