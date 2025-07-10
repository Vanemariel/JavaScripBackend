const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Obtener todos los productos
router.get('/', productController.getAllProducts);

// Obtener un producto por ID
router.get('/:pid', productController.getProductById);

// Agregar un nuevo producto
router.post('/', productController.addProduct);

// Actualizar un producto existente
router.put('/:pid', productController.updateProduct);

// Eliminar un producto por ID
router.delete('/:pid', productController.deleteProduct);

module.exports = router;
