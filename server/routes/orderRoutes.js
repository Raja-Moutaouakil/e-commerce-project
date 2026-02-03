const router = require('express').Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/my-orders', orderController.getMyOrders); // <-- NEW ROUTE
router.put('/:id/deliver', orderController.updateOrderDelivery);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;