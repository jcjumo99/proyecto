const multer = require('multer');
const path = require('path');
const { randomNumber } = require('./random');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, randomNumber() + '-' + Date.now() + path.extname(file.originalname));
    }
});
const uploadImage = multer({
    storage,
    limits: {
        files: 1,
        fieldSize: 20 * 1024 * 1024 // 20 MB (max file size)
    },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image are allowed.'), false);
        }
        cb(null, true);
    }
}).single('image');

module.exports = uploadImage;