const router = require('express').Router();
const isAdmin = require('../middleware/isAdmin');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const User = require('../models/User');

// Products
router.get('/products', isAdmin, productController.getProducts);
router.post('/products', isAdmin, productController.createProduct);
router.put('/products/:id', isAdmin, productController.updateProduct);
router.delete('/products/:id', isAdmin, productController.deleteProduct);

// Orders
router.get('/orders', isAdmin, orderController.getOrders);
router.put('/orders/:id/deliver', isAdmin, orderController.updateOrderDelivery);
router.delete('/orders/:id', isAdmin, orderController.deleteOrder);

// Users
router.get('/users', isAdmin, async (req, res) => {
  const users = await User.find();
  res.json(users);
});
router.put('/users/:id/role', isAdmin, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true });
  res.json(user);
});
router.delete('/users/:id', isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

module.exports = router;