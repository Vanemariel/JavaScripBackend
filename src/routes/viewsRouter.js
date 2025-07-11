const express = require('express');
const router = express.Router();
const productService = require('../services/productServices');

router.get('/', (req, res) => {
  const products = productService.getAllProducts();
  res.render('home', { title: 'Home', products });
});

router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { title: 'Productos en tiempo real' });
});
module.exports = router;
