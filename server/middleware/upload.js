const multer = require('multer');

// Use memory storage for Vercel/serverless compatibility (no filesystem writes)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.mimetype || !file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const limits = {
  fileSize: 10 * 1024 * 1024, // 10MB max
};

const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
