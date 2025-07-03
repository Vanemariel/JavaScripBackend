const { loadFile, saveFile } = require('../utils/fileManager');
const path = require('path');
const cartsPath = path.join(__dirname, '../../data/carts.json');
const productsPath = path.join(__dirname, '../../data/products.json');

exports.createCart = async () => {
  try {
    const carts = await loadFile(cartsPath);
    const newCart = { id: Date.now().toString(), products: [] };
    carts.push(newCart);
    await saveFile(cartsPath, carts);
    return newCart;
  } catch (error) {
    console.error('Error creando carrito:', error);
    throw error;
  }

  /*const carts = await loadFile(cartsPath);
  const newCart = { id: Date.now().toString(), products: [] };
  carts.push(newCart);
  await saveFile(cartsPath, carts);
  return newCart;*/
};

/*exports.getAllCarts = () => loadFile(cartsPath);*/

exports.getAllCarts = async () => {
  try {
    const carts = await loadFile(cartsPath);
  return carts;
  } catch (error) {
    console.error('Error creando carrito:', error);
    throw error;
  }

  /*const carts = await loadFile(cartsPath);
  return carts;*/
};

exports.getCartProducts = async (cid) => {
  try {
     const carts = loadFile(cartsPath);
  const cart = carts.find(c => c.id === cid);
  return cart ? cart.products : null;
  } catch (error) {
    console.error('Error creando carrito:', error);
    throw error;
  }
  
  /*const carts = loadFile(cartsPath);
  const cart = carts.find(c => c.id === cid);
  return cart ? cart.products : null;*/
};

exports.addProductToCart = async (cid, pid, quantity) => {
  try {
    if (!quantity || typeof quantity !== 'number') return { error: 'Quantity inválido', status: 400 };
    const products = loadFile(productsPath);
    if (!products.some(p => p.id === pid)) return { error: 'Producto no existe', status: 404 };

    const carts = loadFile(cartsPath);
    const cart = carts.find(c => c.id === cid);
    if (!cart) return { error: 'Carrito no encontrado', status: 404 };

    const prod = cart.products.find(p => p.product === pid);
    if (prod) {
      prod.quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }
    saveFile(cartsPath, carts);
    return cart;
  } catch (error) {
    console.error('Error creando carrito:', error);
    throw error;
  }
  /*if (!quantity || typeof quantity !== 'number') return { error: 'Quantity inválido', status: 400 };
  const products = loadFile(productsPath);
  if (!products.some(p => p.id === pid)) return { error: 'Producto no existe', status: 404 };

  const carts = loadFile(cartsPath);
  const cart = carts.find(c => c.id === cid);
  if (!cart) return { error: 'Carrito no encontrado', status: 404 };

  const prod = cart.products.find(p => p.product === pid);
  if (prod) {
    prod.quantity += quantity;
  } else {
    cart.products.push({ product: pid, quantity });
  }

  saveFile(cartsPath, carts);
  return cart;*/
};

exports.removeProductFromCart = async (cid, pid) => {
  try {
    const carts = loadFile(cartsPath);
    const cart = carts.find(c => c.id === cid);
    if (!cart) return { error: 'Carrito no encontrado', status: 404 };

    const initial = cart.products.length;
    cart.products = cart.products.filter(p => p.product !== pid);
    if (cart.products.length === initial) return { error: 'Producto no encontrado en el carrito', status: 404 };

    saveFile(cartsPath, carts);
    return cart;
  } catch (error) {
    console.error('Error creando carrito:', error);
    throw error;
  }

  /*const carts = loadFile(cartsPath);
  const cart = carts.find(c => c.id === cid);
  if (!cart) return { error: 'Carrito no encontrado', status: 404 };
  const initial = cart.products.length;
  cart.products = cart.products.filter(p => p.product !== pid);
  if (cart.products.length === initial) return { error: 'Producto no encontrado en el carrito', status: 404 };
  saveFile(cartsPath, carts);
  return cart;*/
};

exports.emptyCart = async (cid) => {
  try {
    const carts = loadFile(cartsPath);
    const cart = carts.find(c => c.id === cid);
    if (!cart) return { error: 'Carrito no encontrado' };

    cart.products = [];
    saveFile(cartsPath, carts);
    return cart;
  } catch (error) {
    console.error('Error creando carrito:', error);
    throw error;
  }
  
  /*const carts = loadFile(cartsPath);
  const cart = carts.find(c => c.id === cid);
  if (!cart) return { error: 'Carrito no encontrado' };
  cart.products = [];
  saveFile(cartsPath, carts);
  return cart;*/
};