const Product = require('../models/Product');
const { uploadBuffer, isConfigured } = require('../config/cloudinary');

// GET all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('getProducts error:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// GET single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error('getProductById error:', error);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};

// CREATE product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const price = Number(req.body.price);
    const countInStock = Number(req.body.countInStock || 0);

    let image; // final URL to persist

    // Prefer uploaded file when provided
    if (req.file && req.file.buffer && isConfigured()) {
      const result = await uploadBuffer(req.file.buffer, {
        folder: process.env.CLOUDINARY_FOLDER || 'botanica/products',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      });
      image = result.secure_url;
    } else {
      // URL fallback (accept imageUrl or image as a URL string)
      const raw = (req.body.imageUrl || req.body.image || '').toString().trim();
      if (raw && /^https?:\/\//i.test(raw)) image = raw;
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
    const updateData = {};
    if (typeof req.body.name !== 'undefined') updateData.name = req.body.name;
    if (typeof req.body.description !== 'undefined') updateData.description = req.body.description;
    if (typeof req.body.price !== 'undefined') updateData.price = Number(req.body.price);
    if (typeof req.body.category !== 'undefined') updateData.category = req.body.category;
    if (typeof req.body.countInStock !== 'undefined') updateData.countInStock = Number(req.body.countInStock);

    // Image handling
    if (req.file && req.file.buffer && isConfigured()) {
      const result = await uploadBuffer(req.file.buffer, {
        folder: process.env.CLOUDINARY_FOLDER || 'botanica/products',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      });
      updateData.image = result.secure_url;
    } else if (typeof req.body.imageUrl !== 'undefined' || typeof req.body.image === 'string') {
      const raw = (req.body.imageUrl || req.body.image || '').toString().trim();
      if (raw && /^https?:\/\//i.test(raw)) {
        updateData.image = raw;
      }
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
