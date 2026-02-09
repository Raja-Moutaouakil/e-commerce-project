const router = require('express').Router();

const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const { ensureAdmin } = require('../middleware/auth');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', auth, ensureAdmin, upload.single('image'), createProduct);
router.put('/:id', auth, ensureAdmin, upload.single('image'), updateProduct);
router.delete('/:id', auth, ensureAdmin, deleteProduct);

module.exports = router;
