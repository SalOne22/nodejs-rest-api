const path = require('path');
const multer = require('multer');
const { nanoid } = require('nanoid');

const destination = path.resolve('tmp');

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${nanoid()}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

module.exports = upload;
