const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.post('/', cartController.createCart);
router.get('/', cartController.getAllCarts);
router.get('/:cid', cartController.getCartProducts);
router.post('/:cid/product/:pid', cartController.addProductToCart);
router.delete('/:cid/product/:pid', cartController.removeProductFromCart);
router.delete('/:cid', cartController.emptyCart);

module.exports = router;