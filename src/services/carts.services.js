const { loadFile, saveFile } = require('../utils/fileManager');
const path = require('path');
const cartsPath = path.join(__dirname, '../../data/carts.json');
const productsPath = path.join(__dirname, '../../data/products.json');

exports.createCart = () => {
  const carts = loadFile(cartsPath);
  const newCart = { id: Date.now().toString(), products: [] };
  carts.push(newCart);
  saveFile(cartsPath, carts);
  return newCart;
};

exports.getAllCarts = () => loadFile(cartsPath);

exports.getCartById = (cid) => {
  const carts = loadFile(cartsPath);
  return carts.find(c => c.id === cid) || null;
};

exports.getCartProducts = (cid) => {
  const cart = exports.getCartById(cid);
  return cart ? cart.products : null;
};

exports.addProductToCart = (cid, pid, quantity) => {
  if (!quantity || typeof quantity !== 'number') return { error: 'Quantity inválido', status: 400 };
  const products = loadFile(productsPath);
  if (!products.some(p => p.id === pid)) return { error: 'Producto no existe', status: 404 };

  const carts = loadFile(cartsPath);
  const cart = carts.find(c => c.id === cid);
  if (!cart) return { error: 'Carrito no encontrado', status: 404 };

  const existing = cart.products.find(p => p.product === pid);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.products.push({ product: pid, quantity });
  }

  saveFile(cartsPath, carts);
  return cart;
};

exports.removeProductFromCart = (cid, pid) => {
  const carts = loadFile(cartsPath);
  const cart = carts.find(c => c.id === cid);
  if (!cart) return { error: 'Carrito no encontrado', status: 404 };

  const initialLength = cart.products.length;
  cart.products = cart.products.filter(p => p.product !== pid);
  if (cart.products.length === initialLength) return { error: 'Producto no encontrado en el carrito', status: 404 };

  saveFile(cartsPath, carts);
  return cart;
};

exports.emptyCart = (cid) => {
  const carts = loadFile(cartsPath);
  const cart = carts.find(c => c.id === cid);
  if (!cart) return { error: 'Carrito no encontrado' };

  cart.products = [];
  saveFile(cartsPath, carts);
  return cart;
};