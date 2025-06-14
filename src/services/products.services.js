const { loadFile, saveFile } = require('../utils/fileManager');
const path = require('path');
const productsPath = path.join(__dirname, '../../data/products.json');

exports.getAllProducts = () => loadFile(productsPath);

exports.getProductById = (pid) => {
  const products = loadFile(productsPath);
  return products.find(p => p.id === pid);
};

exports.addProduct = (data) => {
  const { title, description, code, price, status, stock, category, thumbnails } = data;
  if (!title || !description || !code || typeof price !== 'number' || typeof status !== 'boolean' || typeof stock !== 'number' || !category || !Array.isArray(thumbnails)) {
    return { error: 'Datos inválidos' };
  }
  const products = loadFile(productsPath);
  const newProduct = { id: Date.now().toString(), title, description, code, price, status, stock, category, thumbnails };
  products.push(newProduct);
  saveFile(productsPath, products);
  return newProduct;
};

exports.updateProduct = (pid, updatedFields) => {
  const products = loadFile(productsPath);
  const index = products.findIndex(p => p.id === pid);
  if (index === -1) return { error: 'Producto no encontrado' };
  delete updatedFields.id;
  products[index] = { ...products[index], ...updatedFields };
  saveFile(productsPath, products);
  return products[index];
};

exports.deleteProduct = (pid) => {
  let products = loadFile(productsPath);
  const index = products.findIndex(p => p.id === pid);
  if (index === -1) return { error: 'Producto no encontrado' };
  const [deleted] = products.splice(index, 1);
  saveFile(productsPath, products);
  return deleted;
};
