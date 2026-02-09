const Product = require('../models/Product');

// GET all products
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// GET single product
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

// CREATE product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, countInStock } = req.body;
    let image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else if (typeof req.body.image === 'string' && req.body.image.trim()) {
      const raw = req.body.image.trim();
      image = raw.startsWith('http') || raw.startsWith('/') ? raw : `/uploads/${raw}`;
    } else if (typeof req.body.imageUrl === 'string' && req.body.imageUrl.trim()) {
      const raw = req.body.imageUrl.trim();
      image = raw.startsWith('http') || raw.startsWith('/') ? raw : `/uploads/${raw}`;
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      countInStock,
      image,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
};

// UPDATE product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, countInStock } = req.body;
    const updateData = {};
    if (typeof name !== 'undefined') updateData.name = name;
    if (typeof description !== 'undefined') updateData.description = description;
    if (typeof price !== 'undefined') updateData.price = price;
    if (typeof category !== 'undefined') updateData.category = category;
    if (typeof countInStock !== 'undefined') updateData.countInStock = countInStock;

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    } else if (typeof req.body.image === 'string' && req.body.image.trim()) {
      const raw = req.body.image.trim();
      updateData.image = raw.startsWith('http') || raw.startsWith('/') ? raw : `/uploads/${raw}`;
    } else if (typeof req.body.imageUrl === 'string' && req.body.imageUrl.trim()) {
      const raw = req.body.imageUrl.trim();
      updateData.image = raw.startsWith('http') || raw.startsWith('/') ? raw : `/uploads/${raw}`;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
