
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.pid);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const result = await productService.addProduct(req.body);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    res.status(201).json(result);
  } catch (error) {
    console.error('Error al agregar producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const updated = await productService.updateProduct(pid, req.body);
    if (updated.error) {
      return res.status(404).json({ error: updated.error });
    }
    res.json(updated);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const result = await productService.deleteProduct(req.params.pid);
    if (result.error) {
      return res.status(404).json({ error: result.error });
    }
    res.json({ mensaje: 'Producto eliminado correctamente', result });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
