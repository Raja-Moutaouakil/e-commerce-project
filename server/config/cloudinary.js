const { v2: cloudinary } = require('cloudinary');
const streamifier = require('streamifier');

// Configure Cloudinary from either CLOUDINARY_URL or discrete vars
let configured = false;
const looksValid = (val) =>
  !!val && !/CLOUD_NAME|API_KEY|API_SECRET|REPLACE_ME|<api_key>|<api_secret>|<cloud_name>/i.test(val);

if (looksValid(process.env.CLOUDINARY_URL)) {
  cloudinary.config({ secure: true });
  configured = true;
} else if (
  looksValid(process.env.CLOUDINARY_CLOUD_NAME) &&
  looksValid(process.env.CLOUDINARY_API_KEY) &&
  looksValid(process.env.CLOUDINARY_API_SECRET)
) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  configured = true;
}

const isConfigured = () => configured;

// Upload a Buffer to Cloudinary using upload_stream
function uploadBuffer(buffer, options = {}) {
  if (!configured) {
    return Promise.reject(new Error('Cloudinary is not configured'));
  }
  const folder = process.env.CLOUDINARY_FOLDER || 'botanica';
  const uploadOptions = {
    folder,
    resource_type: 'image',
    use_filename: true,
    unique_filename: true,
    overwrite: false,
    ...options,
  };

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(uploadOptions, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

module.exports = { cloudinary, uploadBuffer, isConfigured };

