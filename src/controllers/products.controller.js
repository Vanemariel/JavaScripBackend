const cartService = require('../services/cart.service');

exports.createCart = (req, res) => {
  const cart = cartService.createCart();
  res.status(201).json(cart);
};

exports.getAllCarts = (req, res) => {
  res.json(cartService.getAllCarts());
};

exports.getCartProducts = (req, res) => {
  const products = cartService.getCartProducts(req.params.cid);
  if (!products) return res.status(404).json({ error: 'Carrito no encontrado' });
  res.json(products);
};

exports.addProductToCart = (req, res) => {
  const result = cartService.addProductToCart(req.params.cid, req.params.pid, req.body.quantity);
  if (result.error) return res.status(result.status).json({ error: result.error });
  res.json(result);
};

exports.removeProductFromCart = (req, res) => {
  const result = cartService.removeProductFromCart(req.params.cid, req.params.pid);
  if (result.error) return res.status(result.status).json({ error: result.error });
  res.json(result);
};

exports.emptyCart = (req, res) => {
  const result = cartService.emptyCart(req.params.cid);
  if (result.error) return res.status(404).json({ error: result.error });
  res.json({ mensaje: 'Carrito vaciado correctamente' });
};