const multer = require('multer');
const config = require('../config');
const path = require('path');
const imagePath = path.resolve(__dirname, '../public/images');
// Set storage engine
const storage = multer.diskStorage({
    destination: `${imagePath}`,
    filename: function (req, file, cb) {        
        // null as first argument means no error
        cb(null, Date.now() + '-' + file.originalname )
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 70 * 1024 * 1024,
        fieldNameSize: 100,
        files: config.fileuploadLimit,
        fields: 100
    },
    fileFilter: function (req, file, cb) {
        sanitizeFile(file, cb);
    }
});

function sanitizeFile(file, cb) {
    // Define the allowed extension
    let fileExts = ['png', 'jpg', 'jpeg', 'gif']

    // Check allowed extensions
    let isAllowedExt = fileExts.includes(file.originalname.split('.')[1].toLowerCase());
    // Mime type must be an image
    let isAllowedMimeType = file.mimetype.startsWith("image/")

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true) // no errors
    }
    else {
        // pass error msg to callback, which can be displaye in frontend
        cb('Error: Only image File type is not allowed!')
    }
}

module.exports = upload;