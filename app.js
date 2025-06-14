const express = require('express');
const app = express();
const cartRoutes = require('./routes/cart.routes');
const productRoutes = require('./routes/product.routes');

app.use(express.json());
app.use('/api/carts', cartRoutes);
app.use('/api/products', productRoutes);

module.exports = app;