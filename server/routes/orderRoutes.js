const router = require('express').Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const { ensureAdmin } = require('../middleware/auth');

router.post('/', auth, orderController.createOrder);
router.get('/', auth, ensureAdmin, orderController.getOrders);
router.get('/my-orders', auth, orderController.getMyOrders);
router.put('/:id/deliver', auth, ensureAdmin, orderController.updateOrderDelivery);
router.delete('/:id', auth, ensureAdmin, orderController.deleteOrder);

module.exports = router;
