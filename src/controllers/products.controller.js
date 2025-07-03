const cartService = require('../services/cart.service');

exports.createCart = async (req, res) => {
  try {
    const cart = cartService.createCart();
    res.status(201).json(cart);
  } catch (error) {
    console.error('Error creando carrito:', error);
    throw error;
  }

  /*const cart = cartService.createCart();
  res.status(201).json(cart);*/
};

exports.getAllCarts = async (req, res) => {
  try {
    const carts = await cartService.getAllCarts(); 
    res.json(carts);
  } catch (error) {
     next(error);
  }
  res.json(cartService.getAllCarts());
};

exports.getCartProducts = async (req, res) => {
  try {
    const products = cartService.getCartProducts(req.params.cid);
    if (!products) return res.status(404).json({ error: 'Carrito no encontrado' });
  res.json(products);
  } catch (error) {
    console.error('Error creando carrito:', error);
    throw error;
  }

  /*const products = cartService.getCartProducts(req.params.cid);
  if (!products) return res.status(404).json({ error: 'Carrito no encontrado' });
  res.json(products);*/
};

exports.addProductToCart = async (req, res) => {
  try {
    const result = cartService.addProductToCart(req.params.cid, req.params.pid, req.body.quantity);
  if (result.error) return res.status(result.status).json({ error: result.error });
  res.json(result);
  } catch (error) {
    console.error('Error creando carrito:', error);
    throw error;
  }

  /*const result = cartService.addProductToCart(req.params.cid, req.params.pid, req.body.quantity);
  if (result.error) return res.status(result.status).json({ error: result.error });
  res.json(result);*/
};

exports.removeProductFromCart = async (req, res) => {
  try {
    const result = cartService.removeProductFromCart(req.params.cid, req.params.pid);
  if (result.error) return res.status(result.status).json({ error: result.error });
  res.json(result);
  } catch (error) {
    console.error('Error creando carrito:', error);
    throw error;
  }

  /*const result = cartService.removeProductFromCart(req.params.cid, req.params.pid);
  if (result.error) return res.status(result.status).json({ error: result.error });
  res.json(result);*/
};

exports.emptyCart = async (req, res) => {
  try {
     const result = cartService.emptyCart(req.params.cid);
     if (result.error) return res.status(404).json({ error: result.error });
     res.json({ mensaje: 'Carrito vaciado correctamente' });
  } catch (error) {
    console.error('Error creando carrito:', error);
    throw error;
  }

  /*const result = cartService.emptyCart(req.params.cid);
  if (result.error) return res.status(404).json({ error: result.error });
  res.json({ mensaje: 'Carrito vaciado correctamente' });*/
};